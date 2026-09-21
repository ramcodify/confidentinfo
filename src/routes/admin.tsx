import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  PencilLine,
  Plus,
  Save,
  Send,
  Trash2,
  UserRound,
} from "lucide-react";
import { categoryList, products, type Product } from "../data/products";

type InquiryStatus = "new" | "reviewed" | "responded";

type AdminInquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  product: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  lastReply?: string;
};

type ProductDraft = {
  name: string;
  category: string;
  origin: string;
  grade: string;
  description: string;
  packaging: string;
  moq: string;
  destination: string;
};

type AdminProfile = {
  fullName: string;
  role: string;
  email: string;
  region: string;
  permissions: string;
  avatar: string;
};

const PRODUCT_STORAGE_KEY = "confident-textiles-admin-products";
const INQUIRY_STORAGE_KEY = "confident-textiles-admin-inquiries";
const PROFILE_STORAGE_KEY = "confident-textiles-admin-profile";
const defaultReplyText =
  "Thank you for your enquiry. Our team is reviewing the product details and will respond with pricing, availability, and commercial terms shortly.";

const defaultAdminProfile: AdminProfile = {
  fullName: "Ariana Salim",
  role: "Super Administrator · Trade Desk Lead",
  email: "admin@confidenttextiles.com",
  region: "Global",
  permissions: "Full access",
  avatar: "",
};

const inquirySeed: AdminInquiry[] = [
  {
    id: "inq-1001",
    name: "Ayesha Khan",
    company: "Atlas Textile Imports",
    email: "ayesha@atlasimports.com",
    product: "Aged Traditional Basmati Rice",
    message:
      "We require 2x40ft containers for regular monthly supply. Please share FOB and CIF pricing for Dubai and Jebel Ali delivery.",
    status: "new",
    createdAt: "2026-09-18T09:12:00.000Z",
  },
  {
    id: "inq-1002",
    name: "Noah Smith",
    company: "Harbor Machinery Ltd.",
    email: "noah@harbormachinery.co",
    product: "Industrial centrifugal process pumps",
    message:
      "Looking for a bulk supply of pumps with documentation, packing list and certificate approvals for our manufacturing plant.",
    status: "reviewed",
    createdAt: "2026-09-17T14:40:00.000Z",
  },
  {
    id: "inq-1003",
    name: "Maria Gomez",
    company: "Prime Apparel Exports",
    email: "maria@primeapparelexports.com",
    product: "Single-Estate Ceylon Black Tea (BOPF)",
    message:
      "Need a quote for multiple container orders for our retail distribution network in Europe. Include packaging and compliance details.",
    status: "responded",
    createdAt: "2026-09-16T16:20:00.000Z",
    lastReply:
      "We have shared a quotation ready for review and can proceed with formal export documentation.",
  },
];

function syncProducts(nextProducts: Product[]) {
  products.splice(
    0,
    products.length,
    ...nextProducts.map((product) => ({
      ...product,
      specs: [...product.specs],
      compliance: [...product.compliance],
      tradeTerms: [...product.tradeTerms],
      regions: [...product.regions],
    })),
  );
}

function getInitialProducts(): Product[] {
  if (typeof window === "undefined") {
    return products.map((product) => ({
      ...product,
      specs: [...product.specs],
      compliance: [...product.compliance],
      tradeTerms: [...product.tradeTerms],
      regions: [...product.regions],
    }));
  }

  try {
    const saved = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) {
      const normalized = products.map((product) => ({
        ...product,
        specs: [...product.specs],
        compliance: [...product.compliance],
        tradeTerms: [...product.tradeTerms],
        regions: [...product.regions],
      }));
      syncProducts(normalized);
      return normalized;
    }

    const parsed = JSON.parse(saved) as Product[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      syncProducts(parsed);
      return parsed.map((product) => ({
        ...product,
        specs: [...product.specs],
        compliance: [...product.compliance],
        tradeTerms: [...product.tradeTerms],
        regions: [...product.regions],
      }));
    }
  } catch {
    // Fall through to default catalog data.
  }

  const normalized = products.map((product) => ({
    ...product,
    specs: [...product.specs],
    compliance: [...product.compliance],
    tradeTerms: [...product.tradeTerms],
    regions: [...product.regions],
  }));
  syncProducts(normalized);
  return normalized;
}

function getInitialInquiries(): AdminInquiry[] {
  if (typeof window === "undefined") {
    return inquirySeed;
  }

  try {
    const saved = window.localStorage.getItem(INQUIRY_STORAGE_KEY);
    if (!saved) return inquirySeed;
    const parsed = JSON.parse(saved) as AdminInquiry[];
    return Array.isArray(parsed) && parsed.length ? parsed : inquirySeed;
  } catch {
    return inquirySeed;
  }
}

function getInitialProfile(): AdminProfile {
  if (typeof window === "undefined") {
    return defaultAdminProfile;
  }

  try {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return defaultAdminProfile;
    const parsed = JSON.parse(saved) as Partial<AdminProfile>;
    return {
      ...defaultAdminProfile,
      ...parsed,
    };
  } catch {
    return defaultAdminProfile;
  }
}

function buildDraft(product?: Product): ProductDraft {
  return {
    name: product?.name ?? "New Product",
    category: product?.category ?? "Machinery & Equipment",
    origin: product?.origin ?? "Add origin",
    grade: product?.grade ?? "Custom Grade",
    description: product?.description ?? "Add product description.",
    packaging: product?.packaging ?? "TBD",
    moq: product?.moq ?? "TBD",
    destination: product?.destination ?? "Global markets",
  };
}

function createEmptyProduct(): Product {
  const category = categoryList[3];
  return {
    slug: `new-product-${Date.now()}`,
    name: "New Product",
    category: category.name,
    categoryId: category.id,
    origin: "Add origin",
    grade: "Custom Grade",
    description: "Add a product summary for this line item.",
    packaging: "Custom packaging",
    moq: "TBD",
    destination: "Global markets",
    regions: ["Global"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85",
    specs: ["Add first technical specification"],
    compliance: ["To be verified"],
    tradeTerms: ["FOB"],
  };
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | CONFIDENT TEXTILES MACHINERY" },
      {
        name: "description",
        content:
          "Manage product listings and respond to incoming trade enquiries from one dashboard.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const initialProducts = useMemo(() => getInitialProducts(), []);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [selectedSlug, setSelectedSlug] = useState(initialProducts[0]?.slug ?? "");
  const [draft, setDraft] = useState<ProductDraft>(() => buildDraft(initialProducts[0]));
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => getInitialInquiries());
  const [profile, setProfile] = useState<AdminProfile>(() => getInitialProfile());
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productList));
      syncProducts(productList);
    }
  }, [productList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
    }
  }, [inquiries]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfile((current) => ({ ...current, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  const activeProduct = useMemo(
    () => productList.find((item) => item.slug === selectedSlug) ?? productList[0],
    [productList, selectedSlug],
  );

  useEffect(() => {
    if (activeProduct) {
      setDraft(buildDraft(activeProduct));
      setSelectedSlug(activeProduct.slug);
    }
  }, [activeProduct]);

  const updateProduct = () => {
    if (!activeProduct) return;

    const category =
      categoryList.find((option) => option.name === draft.category) ?? categoryList[3];

    const nextProducts = productList.map((product) =>
      product.slug === activeProduct.slug
        ? {
            ...product,
            name: draft.name,
            category: draft.category,
            categoryId: category.id,
            origin: draft.origin,
            grade: draft.grade,
            description: draft.description,
            packaging: draft.packaging,
            moq: draft.moq,
            destination: draft.destination,
          }
        : product,
    );

    setProductList(nextProducts);
  };

  const addProduct = () => {
    const created = createEmptyProduct();
    const nextProducts = [created, ...productList];
    setProductList(nextProducts);
    setSelectedSlug(created.slug);
    setDraft(buildDraft(created));
  };

  const deleteProduct = () => {
    if (!activeProduct || productList.length <= 1) return;

    const nextProducts = productList.filter((product) => product.slug !== activeProduct.slug);
    setProductList(nextProducts);
    setSelectedSlug(nextProducts[0].slug);
    setDraft(buildDraft(nextProducts[0]));
  };

  const updateInquiryStatus = (id: string, nextStatus: InquiryStatus) => {
    setInquiries((current) =>
      current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)),
    );
  };

  const sendReply = (inquiry: AdminInquiry) => {
    const message = (replyDrafts[inquiry.id] ?? defaultReplyText).trim();
    const finalMessage = message || defaultReplyText;

    setInquiries((current) =>
      current.map((item) =>
        item.id === inquiry.id ? { ...item, status: "responded", lastReply: finalMessage } : item,
      ),
    );

    setReplyDrafts((current) => ({ ...current, [inquiry.id]: "" }));
  };

  const inquiryCounts = useMemo(
    () => ({
      total: inquiries.length,
      new: inquiries.filter((item) => item.status === "new").length,
      reviewed: inquiries.filter((item) => item.status === "reviewed").length,
      responded: inquiries.filter((item) => item.status === "responded").length,
    }),
    [inquiries],
  );

  return (
    <div className="bg-[#F4EFE6] text-[#161210] pt-28">
      <div className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#9E4E39]">
              [ ADMIN CONTROL PANEL ]
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#161210] sm:text-5xl">
              Product & Inquiry Operations
            </h1>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border border-[#161210] bg-[#161210] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] transition hover:bg-[#9E4E39]"
          >
            View live catalogue
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mb-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="flex items-center gap-5 border border-[#D8CEBD] bg-[#FAF7F2] p-6 shadow-sm">
            <label className="relative flex size-20 cursor-pointer items-center justify-center overflow-hidden border border-[#C5A059] bg-[#161210] text-[#FAF7F2] transition hover:opacity-90">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-serif text-2xl font-bold">
                  {profile.fullName.slice(0, 2).toUpperCase()}
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-[#161210]/80 px-1 py-0.5 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-[#FAF7F2]">
                Upload
              </span>
            </label>

            <div className="flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9E4E39]">
                ADMIN PROFILE
              </div>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#161210]">
                {profile.fullName}
              </h2>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                {profile.role}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#161210]">
                <span
                  className={`border px-2.5 py-1 font-mono uppercase tracking-[0.18em] ${isLoggedIn ? "border-[#C5A059] bg-[#F4EFE6] text-[#161210]" : "border-[#D8CEBD] bg-[#F4EFE6] text-[#6B625B]"}`}
                >
                  {isLoggedIn ? "Online · Active" : "Offline · Logged out"}
                </span>
                <span className="font-mono uppercase tracking-[0.18em] text-[#6B625B]">
                  Last login: Today, 08:45 AM
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#D8CEBD] bg-[#FAF7F2] p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B625B]">
                Access overview
              </div>
              <button
                type="button"
                onClick={() => setIsLoggedIn((current) => !current)}
                className={`border px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] transition ${
                  isLoggedIn
                    ? "border-[#9E4E39] text-[#9E4E39] hover:bg-[#9E4E39] hover:text-[#FAF7F2]"
                    : "border-[#3E4C34] text-[#3E4C34] hover:bg-[#3E4C34] hover:text-[#FAF7F2]"
                }`}
              >
                {isLoggedIn ? "Log out" : "Log in"}
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#161210]">
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                  Full name
                </label>
                <input
                  value={profile.fullName}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                  Role
                </label>
                <input
                  value={profile.role}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, role: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                  Email
                </label>
                <input
                  value={profile.email}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                  Region
                </label>
                <input
                  value={profile.region}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, region: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                  Permissions
                </label>
                <input
                  value={profile.permissions}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, permissions: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <StatCard
            label="Total inquiries"
            value={String(inquiryCounts.total)}
            accent="text-[#161210]"
          />
          <StatCard label="New" value={String(inquiryCounts.new)} accent="text-[#9E4E39]" />
          <StatCard
            label="Reviewed"
            value={String(inquiryCounts.reviewed)}
            accent="text-[#3E4C34]"
          />
          <StatCard
            label="Responded"
            value={String(inquiryCounts.responded)}
            accent="text-[#C5A059]"
          />
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.35fr]">
          <section className="border border-[#D8CEBD] bg-[#FAF7F2] p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B625B]">
                  [ PRODUCTS ]
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold">Catalog Manager</h2>
              </div>
              <button
                type="button"
                onClick={addProduct}
                className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#161210] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#9E4E39]"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {productList.map((product) => {
                const active = product.slug === activeProduct?.slug;
                return (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => {
                      setSelectedSlug(product.slug);
                      setDraft(buildDraft(product));
                    }}
                    className={`w-full border p-4 text-left transition ${
                      active
                        ? "border-[#C5A059] bg-[#F4EFE6]"
                        : "border-[#D8CEBD] bg-[#FAF7F2] hover:border-[#C5A059]/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B625B]">
                          {product.category}
                        </div>
                        <div className="mt-1 font-serif text-lg font-bold text-[#161210]">
                          {product.name}
                        </div>
                      </div>
                      <PencilLine size={16} className="text-[#C5A059]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="border border-[#D8CEBD] bg-[#FAF7F2] p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B625B]">
                  [ PRODUCT UPDATE ]
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold">Edit selected item</h2>
              </div>
              <button
                type="button"
                onClick={deleteProduct}
                className="inline-flex items-center gap-2 border border-[#9E4E39] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E4E39] hover:bg-[#9E4E39] hover:text-[#FAF7F2]"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Product name">
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </Field>
              <Field label="Category">
                <select
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, category: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                >
                  {categoryList.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Origin">
                <input
                  value={draft.origin}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, origin: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </Field>
              <Field label="Grade">
                <input
                  value={draft.grade}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, grade: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </Field>
              <Field label="MOQ">
                <input
                  value={draft.moq}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, moq: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </Field>
              <Field label="Packaging">
                <input
                  value={draft.packaging}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, packaging: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                />
              </Field>
              <Field label="Destination">
                <input
                  value={draft.destination}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, destination: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059] md:col-span-2"
                />
              </Field>
              <Field label="Description">
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, description: event.target.value }))
                  }
                  className="w-full border-b border-[#D8CEBD] bg-transparent py-2 text-sm text-[#161210] outline-none focus:border-[#C5A059] md:col-span-2"
                />
              </Field>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={updateProduct}
                className="inline-flex items-center gap-2 border border-[#161210] bg-[#161210] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] transition hover:bg-[#9E4E39]"
              >
                <Save size={15} />
                Save changes
              </button>
            </div>
          </section>
        </div>

        <section className="mt-12 border border-[#D8CEBD] bg-[#FAF7F2] p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B625B]">
                [ ENQUIRIES ]
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold">Customer communication desk</h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
              {inquiries.length} active enquiries
            </div>
          </div>

          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="border border-[#D8CEBD] bg-[#F4EFE6] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-[#C5A059] bg-[#FAF7F2] text-[#161210]">
                      <UserRound size={18} className="text-[#C5A059]" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-bold text-[#161210]">
                        {inquiry.name}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
                        {inquiry.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B625B]">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                    <StatusBadge status={inquiry.status} />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm text-[#161210]">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-[#C5A059]" />
                      <span>{inquiry.email}</span>
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B625B]">
                      Product: {inquiry.product}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateInquiryStatus(inquiry.id, "reviewed")}
                      className="border border-[#D8CEBD] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#161210] hover:border-[#C5A059]"
                    >
                      Mark reviewed
                    </button>
                    <button
                      type="button"
                      onClick={() => updateInquiryStatus(inquiry.id, "responded")}
                      className="border border-[#C5A059] bg-[#161210] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#9E4E39]"
                    >
                      Mark responded
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-none border border-[#D8CEBD] bg-[#FAF7F2] p-4 text-sm leading-relaxed text-[#161210]">
                  {inquiry.message}
                </div>

                <div className="mt-5">
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B625B]">
                    Response message
                  </label>
                  <textarea
                    rows={3}
                    value={replyDrafts[inquiry.id] ?? inquiry.lastReply ?? defaultReplyText}
                    onChange={(event) =>
                      setReplyDrafts((current) => ({
                        ...current,
                        [inquiry.id]: event.target.value,
                      }))
                    }
                    className="w-full border border-[#D8CEBD] bg-[#FAF7F2] p-3 text-sm text-[#161210] outline-none focus:border-[#C5A059]"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => sendReply(inquiry)}
                      className="inline-flex items-center gap-2 border border-[#161210] bg-[#161210] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] transition hover:bg-[#9E4E39]"
                    >
                      <Send size={14} />
                      Send response
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-left md:col-span-1">
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B625B]">
        {label}
      </span>
      {children}
    </label>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border border-[#D8CEBD] bg-[#FAF7F2] p-5 shadow-sm">
      <div className={`font-serif text-3xl font-bold ${accent}`}>{value}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B625B]">
        {label}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const styles = {
    new: "bg-[#9E4E39] text-[#FAF7F2]",
    reviewed: "bg-[#3E4C34] text-[#FAF7F2]",
    responded: "bg-[#C5A059] text-[#161210]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${styles[status]}`}
    >
      {status === "responded" ? <CheckCircle2 size={12} /> : null}
      {status}
    </span>
  );
}
