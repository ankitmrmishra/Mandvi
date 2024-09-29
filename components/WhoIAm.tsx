"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function WhoIAm() {
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
                className="w-60 h-auto transform rotate-3 border-4 border-white "
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-8">Your answers could be right here.</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img
              src="/V0176_generated.jpg"
              alt="FAQ"
              className="w-full h-auto rounded-lg"
            />
            <Button variant="outline" className="mt-4 bg-black">
              Connect with me
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
