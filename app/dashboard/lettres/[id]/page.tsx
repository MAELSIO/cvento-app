import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EMPTY_CV_CONTENT, cvContentToText, type CvContent } from "@/lib/types/cv";
import { LetterEditor } from "./letter-editor";

export default async function LetterEditPage({
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

  const { data: letter } = await supabase
    .from("cover_letters")
    .select("id, title, content, cv_id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (!letter) notFound();

  const { data: cv } = await supabase
    .from("cvs")
    .select("content, target_job_title, target_job_description")
    .eq("id", letter.cv_id)
    .eq("user_id", user.id)
    .single();

  const cvContent: CvContent = { ...EMPTY_CV_CONTENT, ...((cv?.content as Partial<CvContent>) ?? {}) };

  return (
    <LetterEditor
      letterId={letter.id}
      initialTitle={letter.title}
      initialContent={letter.content}
      cvSummaryText={cvContentToText(cvContent)}
      targetJobTitle={cv?.target_job_title ?? ""}
      targetJobDescription={cv?.target_job_description ?? ""}
    />
  );
}
