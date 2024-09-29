"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/request";
import { PostMetadata } from "@/lib/types";
// import { Card, CardContent, CardHeader } from "./ui/card";
export default function BlogSection() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) =>
      lastPage.length < 4 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: "",
  });

  return (
    <div className="min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#4d9e71] text-sm font-medium tracking-widest mb-4">
          THOUGHTS AND BLOGS
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Read My Narrative
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Pages filled with legal insights, literary musings, and much more
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.pages.map((group) =>
            group?.map((post) => (
              <BlogCard
                key={post.cursor}
                post={post.node}
                icon={<ArrowRight />}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-center align-middle items-center w-full py-5">
        <Button
          className="bg-black text-white "
          variant="outline"
          disabled={!hasNextPage || isFetching}
          onClick={() => fetchNextPage()}
        >
          {isFetching
            ? "Loading..."
            : hasNextPage
            ? "Load more"
            : "No more Blogs"}
        </Button>
      </div>
    </div>
  );
}

type Props = {
  post: PostMetadata;
  icon: JSX.Element;
};

export function BlogCard({ post, icon }: Props) {
  const subtitle =
    post.subtitle || post.content?.text || "No description available";

  return (
    <div className="relative w-full aspect-square  rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden group bg-hero-pattern">
      <h3 className="relative text-white text-3xl font-bold leading-tight z-10">
        <Link href={`/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>

      <p className="text-gray-500 line-clamp-4 mt-3">{subtitle}</p>
      <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 ">
        {icon}{" "}
        <div className="mt-3 flex gap-3 items-center">
          {post?.author.profilePicture && (
            <img
              src={post.author.profilePicture}
              className="h-7 w-7 rounded-full"
            />
          )}{" "}
          {post.author.name}
        </div>
      </div>
    </div>
  );
}
