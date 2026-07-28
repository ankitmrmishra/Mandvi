"use client";
import React, { useState } from "react";
import { subscribeToNewsletter } from "@/lib/request";

interface NewsletterProps {
  settings?: {
    enabled?: boolean;
    headline?: string;
    description?: string;
    actionUrl?: string;
  };
}

export default function Newsletter({ settings }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const isEnabled = settings?.enabled ?? true;

  if (!isEnabled) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      if (settings?.actionUrl) {
        window.open(
          `${settings.actionUrl}?email=${encodeURIComponent(email)}`,
          "_blank",
        );
        setStatus("success");
        setMessage("Opening subscription form...");
        return;
      }

      await subscribeToNewsletter(email);
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Marquee/Ticker Band */}
      <div className="bg-black text-white overflow-hidden py-4">
        <div className="whitespace-nowrap animate-marquee">
          <span
            className="inline-block font-black capitalize text-2xl md:text-3xl mx-8"
            style={{ letterSpacing: "0.05em" }}
          >
            NEWSLETTER+++ESSAYS+++LEGAL ANALYSIS+++BOOK
            REVIEWS+++NEWSLETTER+++ESSAYS+++LEGAL ANALYSIS+++BOOK REVIEWS+++
          </span>
        </div>
      </div>

      {/* Newsletter Form Section */}
      <section className="bg-black text-white py-16 lg:py-24">
        <div className="container-fixed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Headline */}
            <div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black capitalize leading-[0.95]"
                style={{ letterSpacing: "-0.03em" }}
              >
                THOUGHTFUL WRITING TO YOUR INBOX
              </h2>
            </div>

            {/* Right - Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="flex-1 px-4 py-3 bg-white text-black border-2 border-white focus:outline-none focus:ring-0 text-sm font-bold capitalize"
                  style={{ letterSpacing: "0.05em" }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-3 bg-transparent text-white border-2 border-white font-black text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-50 capitalize"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {status === "loading" ? "..." : "SIGN UP"}
                </button>
              </form>

              {message && (
                <p
                  className={`text-sm mt-4 capitalize font-bold ${
                    status === "success" ? "text-white/70" : "text-red-300"
                  }`}
                  style={{ letterSpacing: "0.1em" }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
