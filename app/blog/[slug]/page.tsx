"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { Calendar, Clock, Search } from "lucide-react";

/* ---------- mock post data ---------- */
const post = {
  slug: "governing-cyberspace-during-a-crisis-in-trust",
  title: "Governing Cyberspace during a crisis in Trust",
  author: "Tunde Onakoya",
  authorAvatar: "/images/avatar.jpg",
  date: "16 Sept 2026",
  readTime: "3 min read",
  tags: ["BILLBOARDS BOOKING", "COMPANY NEWS"],
  heroImage: "/images/board.jpg",
  content: [
    {
      type: "paragraph",
      text: "It is almost impossible to read the news without coming across a lead story cataloguing the latest cyber breach or misuse of data. Intellectual property is being stolen from companies at an alarming rate. Foreign actors are meddling in elections. Criminals use the dark recesses of the internet to sell drugs, guns and even people. The volume of these events lays bare the paradox of the digital economy and cyber security. On one hand, technology has led to convenience, efficiency and wealth creation. On the other hand, this great push to digitize society has meant building inherent vulnerability into the core of the economic taking place atop a deeply fragmented and underdeveloped system of global rules.",
    },
    {
      type: "heading",
      text: "The essentials of cybersecurity solutions",
    },
    {
      type: "paragraph",
      text: "Enhancing cyber security readiness and network resilience in both government and private sector systems makes it more difficult for adversaries, both foreign and domestic, to exploit Canadian systems. This, in turn, enhances trust in the digital ecosystem in Canada, because it makes it less likely that personal, financial or corporate information will be compromised by security breaches or unscrupulous data practices. By establishing greater domestic cyber security readiness and resilience, it also makes it a much more credible effort for Canada to try and position itself as a global leader in the field.",
    },
    {
      type: "heading",
      text: "Major elements that we offer:",
    },
    {
      type: "list",
      items: [
        "The need to make tough decisions as a company grows",
        "Why people are more important than technology in any company.",
        "The importance of video calls in building team connectivity.",
        "The role of engagement in a company's culture and why it's key to success.",
      ],
    },
    {
      type: "heading",
      text: "The essentials of cybersecurity solutions",
    },
    {
      type: "paragraph",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.",
    },
    {
      type: "paragraph",
      text: "Quisque sagittis orci ut diam condimentum, vel eulismod erat placerat, in iaculis arcu eros, eget tempus orci facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
    },
  ],
};

const sidebarFeatured = [
  {
    id: "1",
    slug: "digital-vs-static-billboards-roi",
    title: "Digital Billboards vs. Static Billboards: Which Delivers Better ROI?",
    image: "/images/board.jpg",
    date: "28 June, 2025",
  },
  {
    id: "2",
    slug: "digital-vs-static-2",
    title: "Digital Billboards vs. Static Billboards: Which Delivers Better ROI?",
    image: "/images/board.jpg",
    date: "28 June, 2025",
  },
  {
    id: "3",
    slug: "digital-vs-static-3",
    title: "Digital Billboards vs. Static Billboards: Which Delivers Better ROI?",
    image: "/images/board.jpg",
    date: "28 June, 2025",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#F2F4F7] text-[10px] font-semibold tracking-wide text-[#667185] uppercase">
      {label}
    </span>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  // In production: fetch post by params.slug
  void params;

  return (
    <div className="min-h-screen bg-white">
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
        <div className="max-w-6xl mx-auto">
          {/* Article header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#101928] leading-tight max-w-3xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#667185]">
                <span className="flex items-center gap-2">
                  <span className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {post.authorAvatar && (
                      <Image
                        src={post.authorAvatar}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </span>
                  By {post.author}
                </span>
                <span className="text-[#D0D5DD]">|</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="text-[#D0D5DD]">|</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          {/* Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Article body */}
            <article className="lg:col-span-8 prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-[#101928] !mt-0">
                {post.title}
              </h2>

              {post.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h3
                      key={i}
                      className="text-base font-semibold text-[#101928] mt-8 mb-3"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-2 text-sm text-[#475467] my-4">
                      {block.items?.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-sm text-[#475467] leading-relaxed mb-4">
                    {block.text}
                  </p>
                );
              })}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="search"
                  placeholder="Type to search..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4E7EC] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                />
              </div>

              {/* Featured posts */}
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-5">
                <h3 className="text-sm font-semibold text-[#101928] mb-4">
                  Featured posts
                </h3>

                <div className="space-y-4">
                  {sidebarFeatured.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#98A2B3] mb-0.5">
                          {item.date}
                        </p>
                        <p className="text-sm font-medium text-[#344054] leading-snug line-clamp-2 group-hover:text-[#0177AB] transition">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}