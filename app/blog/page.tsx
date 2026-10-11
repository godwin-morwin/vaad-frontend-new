"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";

/* ---------- mock posts (replace with CMS/API) ---------- */
const recentPosts = [
  {
    id: "1",
    slug: "how-brands-track-billboard-performance-using-geo-data",
    title: "How brands track billboard performance using Geo-data",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["BILLBOARDS BOOKING", "COMPANY NEWS"],
  },
  {
    id: "2",
    slug: "digital-vs-static-billboards-roi",
    title: "Digital Billboards vs. Static Billboards: Which Delivers Better ROI?",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["COMPANY NEWS"],
  },
];

const featuredPosts = [
  {
    id: "2",
    slug: "digital-vs-static-billboards-roi",
    title: "Digital Billboards vs. Static Billboards: Which Delivers Better ROI?",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["COMPANY NEWS"],
  },
  {
    id: "3",
    slug: "outdoor-advertising-spend-nigeria-2025",
    title: "Outdoor Advertising Spend in Nigeria: 2025 Market Report",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["COMPANY NEWS"],
  },
  {
    id: "4",
    slug: "how-lekki-billboards-redefining-brand-visibility",
    title: "How Lekki Billboards are redefining Brand visibility in Lagos",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["COMPANY NEWS"],
  },
  {
    id: "5",
    slug: "top-5-creative-outdoor-campaigns-2026",
    title: "Top 5 Creative Outdoor Campaigns of 2026 Check this out!",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["COMPANY NEWS"],
  },
  {
    id: "6",
    slug: "power-of-storytelling-through-billboards",
    title: "The power of storytelling through billboards on Lagos roads",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["BILLBOARDS BOOKING"],
  },
  {
    id: "7",
    slug: "how-brands-track-billboard-performance-geo-data-2",
    title: "How brands track billboard performance using Geo-data",
    excerpt: "How brands track billboard performance using Geo-data",
    image: "/images/board.jpg",
    author: "Tunde Onakoya",
    authorAvatar: "/images/avatar.jpg",
    date: "16 Sept 2026",
    readTime: "3 min read",
    tags: ["BILLBOARDS BOOKING"],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#F2F4F7] text-[10px] font-semibold tracking-wide text-[#667185] uppercase">
      {label}
    </span>
  );
}

function PostMeta({
  author,
  authorAvatar,
  date,
  readTime,
}: {
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-[#667185]">
      <span className="flex items-center gap-1.5">
        <span className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-200 shrink-0">
          {authorAvatar && (
            <Image src={authorAvatar} alt="" fill className="object-cover" unoptimized />
          )}
        </span>
        By {author}
      </span>
      <span className="text-[#D0D5DD]">|</span>
      <span className="flex items-center gap-1">
        <Calendar size={12} />
        {date}
      </span>
      <span className="text-[#D0D5DD]">|</span>
      <span className="flex items-center gap-1">
        <Clock size={12} />
        {readTime}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const [recentIndex, setRecentIndex] = useState(0);
  const current = recentPosts[recentIndex];

  const prev = () =>
    setRecentIndex((i) => (i === 0 ? recentPosts.length - 1 : i - 1));
  const next = () =>
    setRecentIndex((i) => (i === recentPosts.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Blog"
        subtitle="Stay ahead with our latest thinking. Stay informed on everything shaping outdoor advertising."
      />

      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* ========== RECENT BLOG POST ========== */}
          <div>
            <h2 className="text-sm font-medium text-[#667185] mb-4">
              Recent blog post
            </h2>

            <div className="bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px]">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <PostMeta
                    author={current.author}
                    authorAvatar={current.authorAvatar}
                    date={current.date}
                    readTime={current.readTime}
                  />
                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#101928] leading-snug">
                  {current.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#667185]">{current.excerpt}</p>

                <Link
                  href={`/blog/${current.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#0177AB] hover:underline"
                >
                  Read more →
                </Link>

                {/* Carousel controls */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-1.5">
                    {recentPosts.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRecentIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === recentIndex
                            ? "w-6 bg-[#0177AB]"
                            : "w-1.5 bg-[#D0D5DD]"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="w-8 h-8 rounded-full border border-[#E4E7EC] flex items-center justify-center text-[#667185] hover:bg-gray-50 transition"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="w-8 h-8 rounded-full border border-[#E4E7EC] flex items-center justify-center text-[#667185] hover:bg-gray-50 transition"
                      aria-label="Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== FEATURED BLOG POSTS ========== */}
          <div>
            <h2 className="text-sm font-medium text-[#667185] mb-4">
              Featured blog post
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden hover:shadow-sm transition"
                >
                  <div className="relative w-full h-[180px] sm:h-[200px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <PostMeta
                        author={post.author}
                        authorAvatar={post.authorAvatar}
                        date={post.date}
                        readTime={post.readTime}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <Tag key={t} label={t} />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-[15px] font-semibold text-[#101928] leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#667185] line-clamp-1">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#0177AB] hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}