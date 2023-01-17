import BlogCard from "@/components/blogCard";
import { readPostsInfo } from "@/lib/helper";
import { PostApiResponse } from "@/utils/types";
import { InferGetStaticPropsType, NextPage } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <section className="p-5 max-w-3xl mx-auto space-y-5">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </section>
  );
};

export const getStaticProps = async () => {
  // const { postInfo }: PostApiResponse = await fetch(
  //   `http://localhost:3000/api/posts`,
  // ).then((res) => res.json());
  const postInfo: PostApiResponse = readPostsInfo();
  return {
    props: {
      posts: postInfo,
    },
  };
};

export default Blogs;
