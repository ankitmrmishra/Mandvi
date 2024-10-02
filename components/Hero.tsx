import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#0c1015] text-white flex flex-col justify-between md:p-6 p-2  relative overflow-hidden ">
      <main className="flex-grow flex flex-col items-center justify-center text-center relative z-10 -mt-28 ">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-green-400 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gray-500 rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-green-400 rounded-full filter blur-sm"></div>

        <div className="bg-[#475672] text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Available for opportunities
        </div>

        <h1 className="md:text-7xl text-5xl font-bold mb-4">
          Welcome to
          <br />
          my digital humble abode
        </h1>

        <p className="text-gray-400 mb-8">
          I am a dedicated law student and an avid book enthusiast. <br />
          My passions lie at the intersection of legal research, literature, and
          a deep love for knowledge.
        </p>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="bg-white text-black hover:bg-gray-200"
          >
            <MessageSquare className="w-4 h-4 mr-2" />

            <a href="mailto:lawgicalinsights@gmail.com">Connect with me</a>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-green-400 hover:bg-transparent"
          >
            <a href="#Blogs">Explore my bookshelf </a>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
