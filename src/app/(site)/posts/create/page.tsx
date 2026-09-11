import { CreatePostForm } from "@/components/pages/post/create/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="mt-6 flex w-full flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
      <div>
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Create a post
        </h1>
        <p className="text-slate-zero mt-2 text-sm sm:text-base">
          Write your post, add a cover image, and publish when you're ready.
        </p>
      </div>

      <CreatePostForm />
    </div>
  );
}
