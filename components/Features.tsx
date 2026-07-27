import React from "react";
import { BookmarkCheck, Search, Moon, Clock } from "lucide-react";

const features = [
  {
    icon: BookmarkCheck,
    title: "Thoughtfully Organized",
    description:
      "Every article is carefully categorized and tagged, making it easy to discover related content and explore topics in depth.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find exactly what you're looking for with full-text search across all articles, essays, and reviews.",
  },
  {
    icon: Moon,
    title: "Comfortable Reading",
    description:
      "Optimized typography and dark mode support ensure a pleasant reading experience at any time of day.",
  },
  {
    icon: Clock,
    title: "Estimated Reading Time",
    description:
      "Know before you start. Each article includes an estimated reading time so you can plan accordingly.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-px w-8 bg-foreground/20"></span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Why Read Here
            </span>
            <span className="h-px w-8 bg-foreground/20"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            A better reading experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed for readers who appreciate clarity, organization, and
            thoughtful content.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
