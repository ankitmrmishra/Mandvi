import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeaturedCaseStudies() {
  return (
    <div
      id="CaseStudy"
      className="min-h-screen bg-[#0c1015] text-white py-16 px-4 sm:px-6 lg:px-8"
    >
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

type CaseStudyCardProps = {
  caseTitle: string;
  year: string;
  title: string;
  description?: string;
  metrics?: string[];
  imageSrc: string;
};

function CaseStudyCard({
  caseTitle,
  year,
  title,
  description,
  metrics,
  imageSrc,
}: CaseStudyCardProps) {
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
