import { PostDetails } from "@/components/pages/post/PostDetails";

type PageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailsPage({ params }: PageProps) {
  const { postId } = await params;

  return <PostDetails slug={postId} />;
}
