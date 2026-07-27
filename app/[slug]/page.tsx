import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import { urlFor } from "@/lib/sanity";
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
  
  let ogImage = "";
  if (data?.featuredImage) {
    try {
      ogImage = urlFor(data.featuredImage).width(1200).height(630).url();
    } catch {
      const img = data.featuredImage as { url?: string };
      if (img && img.url) ogImage = img.url;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mandvi.vercel.app";
  const articleUrl = `${baseUrl}/${params.slug}`;

  return {
    title: data?.title || "Blog Post",
    description: data?.excerpt || data?.subtitle || "Read this article on Mandvi's blog",
    openGraph: {
      title: data?.title,
      description: data?.excerpt || data?.subtitle,
      url: articleUrl,
      type: "article",
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: data?.title,
        },
      ] : [],
      publishedTime: data?.publishedDate,
      authors: data?.author?.name ? [data.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.excerpt || data?.subtitle,
      images: ogImage ? [ogImage] : [],
    },
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post slug={params.slug} />
    </HydrationBoundary>
  );
}
