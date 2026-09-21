import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useState } from "react";
import {
  ArrowRight,
  Check,
  Compass,
  Filter,
  Package,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { PageHero, SectionLabel } from "../components/site";
import { categories, categoryList, products, type Category, type Product } from "../data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Trade Catalogue & Commodity Portfolio | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Explore export-grade commodities across Agriculture, Food & Beverage, Industrial Steel, Machinery, Automotive, Packaging, Chemicals, and Textiles.",
      },
      { property: "og:title", content: "Trade Commodities & Product Directory | Meridian" },
      {
        property: "og:description",
        content:
          "Verified product specifications, minimum order quantities (MOQ), packaging options, and export destination ports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery.toLowerCase().trim());

  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesQuery =
      !deferredQuery ||
      p.name.toLowerCase().includes(deferredQuery) ||
      p.description.toLowerCase().includes(deferredQuery) ||
      p.origin.toLowerCase().includes(deferredQuery) ||
      p.grade.toLowerCase().includes(deferredQuery) ||
      p.specs.some((s) => s.toLowerCase().includes(deferredQuery));
    return matchesCategory && matchesQuery;
  });

  const isSearchActive = deferredQuery.length > 0;

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="GLOBAL TRADE DIRECTORY"
        categoryNumber="PORTFOLIO"
        title="WHAT CROSSES OUR BORDERS."
        copy="Verified origin commodities, precision manufactured components, and industrial materials. Each vertical adheres to strict international testing standards, certified packing protocols, and clean shipping manifests."
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85"
      />

      {/* Control Bar: Search & Category Filter */}
      <section className="sticky top-[72px] z-30 border-y border-[#D8CEBD] bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 lg:px-12 shadow-sm">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 border px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
                    isSelected
                      ? "border-[#161210] bg-[#161210] text-[#FAF7F2]"
                      : "border-[#D8CEBD] bg-transparent text-[#6B625B] hover:border-[#C5A059] hover:text-[#161210]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B625B]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, origin, grade…"
              className="w-full border border-[#D8CEBD] bg-[#F4EFE6] py-2 pl-9 pr-8 font-sans text-xs text-[#161210] placeholder:text-[#6B625B]/50 focus:border-[#C5A059] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B625B] hover:text-[#161210]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">
        {/* If user is searching or selected a specific category */}
        {isSearchActive || selectedCategory !== "All" ? (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#6B625B]">
                SHOWING {filteredProducts.length} COMMODITIES IN [ {selectedCategory.toUpperCase()}{" "}
                ]
              </span>
              {(isSearchActive || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="font-mono text-xs font-bold text-[#9E4E39] uppercase hover:underline"
                >
                  RESET ALL FILTERS
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-[#D8CEBD] bg-[#FAF7F2] p-16 text-center shadow-sm">
                <Compass size={36} className="mx-auto text-[#C5A059]" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#161210]">
                  No matching commodities found
                </h3>
                <p className="mt-2 text-sm text-[#6B625B]">
                  Adjust your search terms or view our complete editorial catalogue.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-6 border border-[#161210] bg-[#161210] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#9E4E39]"
                >
                  Reset Catalogue
                </button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.slug} product={prod} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* =========================================================================
             EDITORIAL MAGAZINE-STYLE CATEGORY SHOWCASE
             Alternating layouts:
             Category 01: Image RIGHT
             Category 02: Image LEFT
             Category 03: Image RIGHT
             Category 04: Image LEFT
             ========================================================================= */
          <div className="space-y-32">
            {categoryList.map((cat, index) => {
              const isEven = index % 2 === 0;
              const catProducts = products.filter((p) => p.categoryId === cat.id);

              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-36">
                  {/* Editorial Category Feature Banner */}
                  <div
                    className="relative overflow-hidden border border-[#D8CEBD] bg-[#FAF7F2] p-8 sm:p-12 lg:p-16 shadow-xl"
                    style={{ borderLeftColor: cat.accentColor, borderLeftWidth: "6px" }}
                  >
                    <div
                      className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                        isEven ? "" : "lg:grid-flow-dense"
                      }`}
                    >
                      {/* Text Column */}
                      <div className={`space-y-6 ${isEven ? "lg:pr-8" : "lg:col-start-2 lg:pl-8"}`}>
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-xl font-bold"
                            style={{ color: cat.accentColor }}
                          >
                            {cat.number}
                          </span>
                          <span className="h-px w-8 bg-[#D8CEBD]" />
                          <span
                            className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase"
                            style={{ color: cat.accentColor }}
                          >
                            [ {cat.accentLabel} ]
                          </span>
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
                          {cat.name}
                        </h2>

                        <p className="font-serif text-lg italic text-[#6B625B]">"{cat.tagline}"</p>

                        <p className="text-sm md:text-base leading-relaxed text-[#6B625B]">
                          {cat.description}
                        </p>

                        <div className="pt-2 flex items-center gap-4">
                          <button
                            onClick={() => setSelectedCategory(cat.name)}
                            className="group inline-flex items-center gap-3 border border-[#161210] bg-[#161210] px-6 py-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FAF7F2] transition hover:bg-[#9E4E39] hover:border-[#9E4E39]"
                          >
                            <span>EXPLORE {cat.name.toUpperCase()}</span>
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Unique Category Hero Image */}
                      <div
                        className={`relative overflow-hidden border border-[#D8CEBD] shadow-lg group ${
                          isEven ? "" : "lg:col-start-1"
                        }`}
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden bg-[#161210]">
                          <img
                            src={cat.heroImage}
                            alt={`${cat.name} Category Operations`}
                            loading="lazy"
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between bg-[#161210]/80 px-5 py-4 font-mono text-[10px] text-[#FAF7F2] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <div>
                            <span
                              className="block text-lg font-bold"
                              style={{ color: cat.accentColor }}
                            >
                              {cat.number}
                            </span>
                            <span className="mt-1 block uppercase tracking-widest">
                              {cat.accentLabel}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedCategory(cat.name)}
                            className="inline-flex items-center gap-2 border-b border-[#FAF7F2] pb-1 font-bold uppercase tracking-wider hover:border-[#C5A059] hover:text-[#C5A059]"
                          >
                            Explore Category <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Products within this Category */}
                  <div className="mt-12">
                    <div className="mb-6 flex items-center justify-between border-b border-[#D8CEBD] pb-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#6B625B] uppercase">
                        CERTIFIED COMMODITIES IN {cat.name.toUpperCase()} ({catProducts.length})
                      </span>
                      <span className="font-mono text-xs text-[#C5A059]">
                        [ AUDITED SUPPLY CHAIN ]
                      </span>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {catProducts.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Trade Consultation Banner */}
      <section className="border-t border-[#D8CEBD] bg-[#161210] py-16 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block mb-2">
              [ BESPOKE INQUIRIES & SOURCING ]
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#FAF7F2]">
              Require unlisted models or custom configurations?
            </h3>
            <p className="mt-2 text-sm text-[#FAF7F2]/65 max-w-xl">
              Our specialist team assists with tailored specifications, custom engineering setups,
              and project-specific heavy machinery configurations.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors"
          >
            INQUIRE WITH SPECIALIST →
          </Link>
        </div>
      </section>
    </div>
  );
}

/* Luxury Product Card Component */
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col justify-between border border-[#D8CEBD] bg-[#FAF7F2] transition-all duration-300 hover:border-[#C5A059] hover:shadow-xl">
      <div>
        {/* Unique Product-Level Photograph */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161210]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/70 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#FAF7F2] drop-shadow-md">
            <span className="bg-[#161210]/80 px-2 py-0.5 border border-[#FAF7F2]/20">
              {product.category}
            </span>
            <span className="bg-[#161210]/80 px-2 py-0.5 border border-[#FAF7F2]/20">
              MOQ: {product.moq.split("(")[0]}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#6B625B]">
            <span>ORIGIN: {product.origin.split(",")[0]}</span>
            <span className="text-[#C5A059] font-bold">GRADE A</span>
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight text-[#161210] group-hover:text-[#9E4E39] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="font-mono text-xs text-[#9E4E39] line-clamp-1">{product.grade}</p>

          <p className="text-xs leading-relaxed text-[#6B625B] line-clamp-2">
            {product.description}
          </p>

          {/* Key Specifications Bullet points */}
          <div className="space-y-1.5 border-t border-[#D8CEBD] pt-4 font-mono text-[11px] text-[#161210]">
            {product.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check size={12} className="text-[#C5A059] shrink-0 mt-0.5" />
                <span className="line-clamp-1 text-[#6B625B]">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="border-t border-[#D8CEBD] p-4 bg-[#F4EFE6]/60 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase text-[#6B625B]">
          ROUTES: {product.regions.slice(0, 2).join(", ")}
        </span>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#161210] uppercase group-hover:text-[#9E4E39] transition-colors"
        >
          <span>VIEW SPECS</span>
          <ArrowRight
            size={13}
            className="text-[#C5A059] transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
