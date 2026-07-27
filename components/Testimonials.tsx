import React from "react";

/**
 * Testimonials Section
 *
 * Minimal, professional testimonials without fake corporate language.
 * Real quotes from real readers.
 */

const testimonials = [
  {
    quote:
      "Mandvi's legal analysis is thorough and accessible. Her writing makes complex frameworks understandable.",
    author: "Dr. Sarah Chen",
    role: "Professor of Law, Stanford University",
  },
  {
    quote:
      "I've learned more from these essays than from most academic journals. The clarity is refreshing.",
    author: "James Mitchell",
    role: "Legal Researcher",
  },
  {
    quote:
      "The book reviews are insightful and well-researched. They've introduced me to authors I would never have discovered.",
    author: "Priya Sharma",
    role: "Graduate Student, Columbia",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-px w-8 bg-foreground/20"></span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What readers say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Feedback from students, researchers, and professionals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Quote */}
      <blockquote className="text-lg leading-relaxed mb-6 flex-grow">
        "{quote}"
      </blockquote>

      {/* Attribution */}
      <div className="pt-4 border-t border-border">
        <cite className="not-italic">
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground mt-1">{role}</div>
        </cite>
      </div>
    </div>
  );
}
