"use client";
import React from "react";
import Link from "next/link";
import {
  FileText,
  Scale,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    title: "Legal Analysis",
    description:
      "Critical examinations of legal frameworks and judicial decisions",
    icon: Scale,
    slug: "legal",
  },
  {
    title: "Book Reviews",
    description: "Thoughtful critiques of contemporary and classic literature",
    icon: BookOpen,
    slug: "books",
  },
  {
    title: "Research Papers",
    description: "Academic research and scholarly contributions",
    icon: GraduationCap,
    slug: "research",
  },
  {
    title: "Essays",
    description: "Reflective writing on society, culture, and ideas",
    icon: FileText,
    slug: "essays",
  },
  {
    title: "Insights",
    description: "Analysis and commentary on current affairs",
    icon: Lightbulb,
    slug: "insights",
  },
  {
    title: "Professional",
    description: "Career development and professional guidance",
    icon: Briefcase,
    slug: "professional",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-px w-8 bg-foreground/20"></span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Explore Topics
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse articles organized by subject matter and expertise.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block p-8 border border-border hover:border-foreground/20 transition-colors rounded-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
