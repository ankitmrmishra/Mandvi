"use client";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Sparkle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import React from "react";

import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <main className="bg-[#0c1015]">
      <section className="hero ">
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
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-green-400 rounded-full filter blur-sm"></div>

            <div className="bg-[#475672] text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
              Available for opportunities
            </div>

            <h1 className="md:text-7xl text-5xl  font-bold mb-4">
              Welcome to
              <br />
              my digital humble abode
            </h1>

            <p className="text-gray-400 mb-8">
              I am a dedicated law student and an avid book enthusiast. <br />{" "}
              My passions lie at the intersection of legal research, literature,
              and a deep love for knowledge.
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

          {/* <footer className="flex justify-center space-x-8 mt-12 relative z-10">
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Disney"
              className="h-8 opacity-50"
            />
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Airbnb"
              className="h-8 opacity-50"
            />
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Microsoft"
              className="h-8 opacity-50"
            />
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Duolingo"
              className="h-8 opacity-50"
            />
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Netflix"
              className="h-8 opacity-50"
            />
            <img
              src="/placeholder.svg?height=30&width=80"
              alt="Disney+"
              className="h-8 opacity-50"
            />
          </footer> */}
        </div>
      </section>
      <section className="blogs">
        <BlogSection />
      </section>
      <section className="caseStudy">
        <FeaturedCaseStudies />
      </section>
      <section className="transform -rotate-2 py-5 mb-9">
        <Marquee className=" bg-gradient-to-r from-green-200 via-green-400 to-blue-100 p-3">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex justify-center align-middle items-center"
            >
              <span className="px-4">{word}</span>
              <Sparkle className="inline w-4 h-4 mx-1 fill-black" />
            </div>
          ))}
        </Marquee>
      </section>

      <section className="me md:px-44">
        <WhoIAm />
      </section>
    </main>
  );
}

function WhoIAm() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What areas of law do you specialize in?",
      answer:
        "As a law scholar and High Court intern, I have experience in various areas of Indian law, including constitutional law, civil law, and criminal law. However, my blog covers a wide range of legal topics to help people understand their rights and navigate the Indian legal system.",
    },
    {
      question: "How can your blog help me understand my legal rights?",
      answer:
        "My blog aims to break down complex legal concepts into easily understandable content. I share insights from my studies and internship experiences, provide explanations of common legal procedures, and offer guidance on how to approach various legal situations. Remember, while my blog provides general information, it is always best to consult with a qualified lawyer for specific legal advice.",
    },
    {
      question: "Do you offer legal consultations or services?",
      answer:
        "As a law scholar and intern, I am not yet qualified to offer legal services or consultations. My blog is for informational purposes only. If you need legal assistance, I recommend contacting a licensed attorney or seeking help from legal aid organizations.",
    },
    {
      question: "How does your artistic side influence your legal work?",
      answer:
        "My passion for mandala art and creativity helps me approach legal problems from unique perspectives. It enhances my ability to see patterns and connections in complex legal issues, which is invaluable in legal research and analysis. Additionally, it helps me present legal information in more visually appealing and understandable ways on my blog.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c1015] text-white p-8">
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Know who am I</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <p className="text-gray-400 mb-4">
              Greetings! I am Mandvi Tripathi, a dedicated law scholar with a
              passion for demystifying the Indian legal system. Committed to
              justice and empowering individuals with legal knowledge, I aim to
              make the law accessible to everyone through my experiences and
              insights. Beyond the legal world, I am an avid reader, writer, and
              mandala artist, bringing creativity and unique perspectives to
              everything I do.
            </p>
            <p className="text-gray-400">
              Join me on this journey as we explore the intersection of law,
              art, and everyday life!
            </p>
            <Button variant="outline" className="mt-4 bg-black">
              View More
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative">
              <img
                src="/photoShoot.jpg"
                alt="Designer"
                className="w-60 h-auto transform rotate-3 border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-xs font-bold py-1 px-2">
                HIRE ME
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-8">Your answers could right here.</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img
              src="/V0176_generated.jpg"
              alt="FAQ"
              className="w-full h-auto rounded-lg"
            />
            <Button variant="outline" className="mt-4 bg-black">
              Lets talk
            </Button>
          </div>
          <div className="flex-1">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left p-4 bg-[#1c2028] rounded-lg"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openQuestion === index && (
                  <div className="p-4 bg-[#1c2028] mt-2 rounded-lg">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogSection() {
  return (
    <div className="min-h-screen  text-white py-16 px-4 sm:px-6 lg:px-8">
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
          <BlogCard
            title="Demystifying Fundamental Rights: A Guide of Citizens"
            icon={<ArrowRight className="w-8 h-8" />}
          />
          <BlogCard
            title="Why Chetan Bhagat is the my favourite Writer"
            icon={<ArrowRight className="w-8 h-8" />}
          />
          <BlogCard
            title="Books that Shaped My Legal Perspective"
            icon={<ArrowUpRight className="w-8 h-8 text-[#4d9e71]" />}
          />
        </div>
      </div>
    </div>
  );
}

function BlogCard({ title, icon }: { title: string; icon: JSX.Element }) {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-br from-[#151921] to-[#1e2430] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden group">
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <h3 className="relative text-white text-3xl font-bold leading-tight z-10">
        {title}
      </h3>
      <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 ">
        {icon}
      </div>
    </div>
  );
}
function FeaturedCaseStudies() {
  return (
    <div className="min-h-screen bg-[#0c1015] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#4d9e71] text-sm font-medium tracking-widest mb-4 uppercase">
          Curated Work
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Featured Case Studies
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          A collection of case studies highlighting landmark cases and
          insightful legal analyses
        </p>
        <div className="space-y-8">
          <CaseStudyCard
            caseTitle="The Aadhaar Verdict"
            year="2018"
            title="Privacy vs. Security in the Indian Context"
            metrics={[
              "Ensured privacy as a fundamental right",
              "Government-backed data collection debated",
              "Citizenship and rights in the digital age",
            ]}
            imageSrc="/aadhaar-case.svg?height=400&width=200"
          />
          <CaseStudyCard
            caseTitle="Section 377: Decriminalization of Homosexuality"
            year="2018"
            title="A Step Forward for LGBTQ+ Rights in India"
            description="A landmark decision by the Supreme Court of India that decriminalized consensual homosexual acts. The judgment was a turning point for LGBTQ+ rights, ensuring equality and freedom from discrimination."
            imageSrc="/section-377.svg?height=400&width=200"
          />
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  caseTitle,
  year,
  title,
  description,
  metrics,
  imageSrc,
}: {
  caseTitle: string;
  year: string;
  title: string;
  description?: string;
  metrics?: string[];
  imageSrc: string;
}) {
  return (
    <div className="bg-[#1c2631] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row">
      <div className="flex-1 pr-0 sm:pr-8">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-gray-400 font-medium">{caseTitle}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400">{year}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-6">{title}</h3>
        {metrics ? (
          <ul className="space-y-2 mb-8">
            {metrics.map((metric, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-[#4d9e71] rounded-full mr-2"></div>
                <span className="text-gray-300">{metric}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 mb-8">{description}</p>
        )}
        <button className="inline-flex items-center text-white font-medium hover:underline">
          View Case Study
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
      <div className="flex-shrink-0 mt-8 sm:mt-0">
        <img
          src={imageSrc}
          alt="Case Study Preview"
          className="w-full sm:w-48 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

const words = [
  "LEGAL STUDIES",
  "JURISPRUDENCE",
  "CASE LAW",
  "BOOK LOVER",
  "CONSTITUTIONAL LAW",
  "CIVIL RIGHTS",
  "LEGAL HISTORY",
  "AVID READER",
  "LEGAL STUDIES",
  "JURISPRUDENCE",
  "CASE LAW",
  "BOOK LOVER",
  "CONSTITUTIONAL LAW",
  "CIVIL RIGHTS",
  "LEGAL HISTORY",
  "AVID READER",
];
