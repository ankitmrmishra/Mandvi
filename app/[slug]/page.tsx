import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug);
  return {
    title: data.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", params.slug],
    queryFn: () => getPostBySlug(params.slug),
  });

  return (
    <div className="min-w-7xl p-4 w-full xl:p-0 mx-auto bg-[#0c1015] md:flex justify-center align-middle items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Post slug={params.slug} />
      </HydrationBoundary>
    </div>
  );
}
