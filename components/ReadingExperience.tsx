import React from "react";
import { Moon, Sun, Type, Bookmark, Share2, Clock } from "lucide-react";
import Image from "next/image";

/**
 * Reading Experience Showcase
 *
 * This component demonstrates the key features of the reading experience:
 * - Dark mode support
 * - Typography optimization
 * - Reading time estimation
 * - Bookmark functionality
 * - Social sharing
 */

export default function ReadingExperience() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-px w-8 bg-foreground/20"></span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Reading Experience
            </span>
            <span className="h-px w-8 bg-foreground/20"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Built for readers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every detail is designed to enhance focus, comfort, and
            comprehension.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Screenshot/Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] bg-background border border-border rounded-sm p-8 overflow-hidden">
              {/* Mock Article Preview */}
              <div className="max-w-[65ch] mx-auto">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Moon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 font-heading">
                  The Evolution of Legal Frameworks
                </h1>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <p className="text-muted-foreground leading-relaxed opacity-70">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat...
                </p>
              </div>

              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>

          {/* Right: Feature List */}
          <div className="order-1 lg:order-2 space-y-8">
            <ReadingFeature
              icon={Moon}
              title="Dark Mode"
              description="Comfortable reading in any lighting condition with automatic or manual theme switching."
            />
            <ReadingFeature
              icon={Type}
              title="Optimized Typography"
              description="Premium fonts, ideal line length (65 characters), and perfect spacing for effortless reading."
            />
            <ReadingFeature
              icon={Clock}
              title="Reading Time"
              description="Know before you start. Each article displays an estimated reading time."
            />
          </div>
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
          <FeatureHighlight
            icon={Bookmark}
            title="Bookmarks"
            description="Save articles to read later and pick up where you left off."
          />
          <FeatureHighlight
            icon={Share2}
            title="Easy Sharing"
            description="Share insightful articles with colleagues and friends."
          />
          <FeatureHighlight
            icon={Type}
            title="Code Highlighting"
            description="Syntax highlighting for technical content and examples."
          />
        </div>
      </div>
    </section>
  );
}

interface ReadingFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function ReadingFeature({
  icon: Icon,
  title,
  description,
}: ReadingFeatureProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureHighlight({
  icon: Icon,
  title,
  description,
}: FeatureHighlightProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
