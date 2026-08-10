import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess } from "@/lib/plan";
import { EMPTY_CV_CONTENT, type CvContent } from "@/lib/types/cv";
import { buildSobreDocx } from "@/lib/docx/sobre-template";

/** Export Word (DOCX) — réservé au plan Pro (voir cahier des charges, section Pro). */
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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();
  if (!hasProAccess(subscription)) {
    return NextResponse.json({ error: "Export Word réservé au plan Pro." }, { status: 403 });
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

  const content: CvContent = { ...EMPTY_CV_CONTENT, ...(cv.content as Partial<CvContent>) };
  const buffer = await buildSobreDocx(content);
  const filename = `${(cv.title || "CV").replace(/[^a-z0-9]+/gi, "-")}.docx`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
