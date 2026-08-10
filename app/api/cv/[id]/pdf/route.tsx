import { NextResponse, type NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess } from "@/lib/plan";
import { EMPTY_CV_CONTENT, type CvContent } from "@/lib/types/cv";
import { SobrePdfTemplate } from "@/lib/pdf/sobre-template";

/**
 * Export PDF. Plan gratuit : mention "Créé avec CVento" en pied de page
 * (voir cahier des charges — alternative retenue à la limitation du
 * nombre d'exports, plus simple à faire respecter sans état supplémentaire).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const { data: cv } = await supabase
    .from("cvs")
    .select("title, content")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (!cv) {
    return NextResponse.json({ error: "CV introuvable." }, { status: 404 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();
  const isPro = hasProAccess(subscription);

  const content: CvContent = { ...EMPTY_CV_CONTENT, ...(cv.content as Partial<CvContent>) };
  const buffer = await renderToBuffer(
    <SobrePdfTemplate content={content} watermark={!isPro} />
  );

  const filename = `${(cv.title || "CV").replace(/[^a-z0-9]+/gi, "-")}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
