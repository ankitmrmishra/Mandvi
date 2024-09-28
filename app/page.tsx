import React from "react";
import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import WhoIAm from "@/components/WhoIAm";
import Posts from "@/components/post";
import { getPosts } from "@/lib/request";
import { PostMetadata } from "@/lib/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (
      lastPage: {
        node: PostMetadata;
        cursor: string;
      }[]
    ) =>
      lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: "",
  });
  return (
    <main className="bg-[#0c1015]">
      <section className="hero">
        <Hero />
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogSection />
      </HydrationBoundary>
      <section className="caseStudy">
        <FeaturedCaseStudies />
      </section>
      <section className="me md:px-44">
        <WhoIAm />
      </section>
    </main>
  );
}
