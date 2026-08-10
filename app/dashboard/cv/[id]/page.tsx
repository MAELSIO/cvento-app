import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess } from "@/lib/plan";
import { CvEditor } from "./cv-editor";
import { EMPTY_CV_CONTENT, type CvContent } from "@/lib/types/cv";
import { DEFAULT_TEMPLATE_ID } from "@/lib/templates/registry";

export default async function CvEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: cv } = await supabase
    .from("cvs")
    .select("id, title, template, content, target_job_title, target_job_description")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!cv) notFound();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();

  const content: CvContent = {
    ...EMPTY_CV_CONTENT,
    ...(cv.content as Partial<CvContent>),
  };

  return (
    <CvEditor
      cvId={cv.id}
      initialTitle={cv.title}
      initialTargetJobTitle={cv.target_job_title ?? ""}
      initialTargetJobDescription={cv.target_job_description ?? ""}
      initialContent={content}
      initialTemplateId={cv.template || DEFAULT_TEMPLATE_ID}
      isPro={hasProAccess(subscription)}
    />
  );
}
