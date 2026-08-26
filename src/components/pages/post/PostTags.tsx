type PostTagsProps = {
  tags: string[];
};

export function PostTags({ tags }: PostTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 border-t pt-6">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-slate-one text-slate-zero rounded-full px-3 py-1 text-xs border"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
