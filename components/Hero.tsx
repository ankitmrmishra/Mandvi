import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#0c1015] text-white flex flex-col justify-between p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full bg-[radial-gradient(circle,#1a2030_0%,transparent_70%)]"></div>
      </div>

      <nav className="flex justify-center mb-12 relative z-10">
        <div className="bg-[#1c2028] rounded-full px-6 py-2">
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center relative z-10">
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
            Lets Connect
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-green-400 hover:bg-transparent"
          >
            Explore my bookshelf
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
