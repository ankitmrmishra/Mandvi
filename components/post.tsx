"use client";

import { getPostBySlug } from "../lib/request";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type Props = {
  slug: string;
};

export default function Post({ slug }: Props) {
  const { data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
  });

  if (!data) return notFound();

  return (
    <div className="md:max-w-4xl p-2 bg-[#0c1015] text-white">
      <img src={data?.coverImage?.url} alt="" className="w-full" />
      <h1 className="text-4xl lg:text-6xl text-center leading-relaxed font-bold mt-5">
        {data?.title}
      </h1>
      <div className=" flex justify-center align-middle items-center text-center gap-1 py-5">
        <TwitterShareButton
          className="flex justify-center align-middle items-center text-center gap-1"
          url={`https://mandvi.vercel.app/${slug}`}
          title={data.title}
        >
          <TwitterIcon className="size-8" />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://mandvi.vercel.app/${slug}`}
          title={data.title}
        >
          <FacebookIcon className="size-8" />
        </FacebookShareButton>
        <WhatsappShareButton
          title={data.title}
          url={`https://mandvi.vercel.app/${slug}`}
        >
          <WhatsappIcon className="size-8" />
        </WhatsappShareButton>
      </div>
      <p className="my-5 text-center text-xl text-gray-400">{data?.subtitle}</p>
      <div className="my-5 flex items-center justify-center text-lg">
        {data?.author.profilePicture && (
          <img
            src={data?.author?.profilePicture}
            alt={data?.author?.name}
            className="rounded-full h-10 w-10 mr-5"
          />
        )}
        {data?.author?.name}
      </div>
      <div
        className="blog-content text-xl leading-loose flex flex-col gap-5 mt-5"
        dangerouslySetInnerHTML={{ __html: data!.content.html }}
      ></div>
    </div>
  );
}
