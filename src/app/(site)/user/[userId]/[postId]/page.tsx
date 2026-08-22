import { PostDetails } from "@/components/pages/post/PostDetails";

type PageProps = {
  params: Promise<{ userId: string; postId: string }>;
};

export default async function AuthorScopedPostDetailsPage({
  params,
}: PageProps) {
  const { postId } = await params;

  return <PostDetails slug={postId} />;
}
