import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="py-5 font-semibold text-2xl">{post.title}</h1>
      <div className="pb-20 prose">
        <MDXRemote {...post.content} />
      </div>
    </div>
  );
};

interface StaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const { params } = context;
  const { postSlug } = params as StaticProps;
  const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + ".md");
  const fileContent = fs.readFileSync(filePathToRead, "utf-8");
  // const { content, data } = matter(fileContent);
  const source: any = await serialize(fileContent, {
    parseFrontmatter: true,
  });
  return {
    props: {
      post: {
        content: source,
        title: source.frontmatter.title,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");
    return { params: { postSlug: matter(fileContent).data.slug } };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export default SinglePage;
