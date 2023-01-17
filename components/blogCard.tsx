import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: React.FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <Link href={`/blogs/${slug}`} className="block">
      <div className="p-2 bg-green-100 rounded cursor-pointer">
        <h1 className="text-gray-900 text-3xl font-semibold">{title}</h1>
        <p className="text-gray-500">{desc}</p>
      </div>
    </Link>
  );
};

export default BlogCard;