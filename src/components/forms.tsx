import { useState, type FormEvent } from "react";
import { ArrowRight, Check, FileText, Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name required (min 2 characters)").max(100),
  company: z.string().trim().min(2, "Company name required").max(120),
  email: z.string().trim().email("Valid corporate email required").max(255),
  phone: z.string().trim().min(7, "Valid phone/mobile required").max(30),
  country: z.string().trim().min(2, "Country of origin/operation required").max(80),
  product: z.string().trim().min(2, "Product or commodity required").max(120),
  direction: z.enum(["Import", "Export", "Both"]),
  quantity: z.string().trim().min(1, "Estimated quantity/volume required").max(60),
  destination: z.string().trim().min(2, "Destination port or city required").max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please provide trade specification details (min 10 characters)")
    .max(2000),
});

type InquiryFields = z.infer<typeof inquirySchema>;

const defaultValues: InquiryFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  direction: "Import",
  quantity: "",
  destination: "",
  message: "",
};

export function InquiryForm({
  quote = false,
  productName = "",
  directionDefault = "Import",
}: {
  quote?: boolean;
  productName?: string;
  directionDefault?: "Import" | "Export" | "Both";
}) {
  const [values, setValues] = useState<InquiryFields>({
    ...defaultValues,
    product: productName,
    direction: directionDefault,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFields, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "confirmed">("idle");
  const [manifestCode, setManifestCode] = useState("");

  const handleChange = (field: keyof InquiryFields, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryFields, string>> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof InquiryFields;
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulate trade desk processing
    await new Promise((resolve) => setTimeout(resolve, 900));

    const generatedCode = `CTM-${values.direction.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setManifestCode(generatedCode);
    setStatus("confirmed");
  };

  if (status === "confirmed") {
    return (
      <div className="relative overflow-hidden border border-[#D8CEBD] bg-[#FAF7F2] p-6 sm:p-12 text-[#161210] shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center border border-[#C5A059] bg-[#F4EFE6] text-[#C5A059] shadow-sm">
            <Check size={28} />
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 border border-[#C5A059] bg-[#F4EFE6] px-3 py-1 font-mono text-xs font-bold text-[#161210]">
            TRADE MANIFEST LOGGED
          </span>

          <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#161210]">
            Inquiry Received Successfully
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6B625B]">
            Your trade inquiry has been logged with our global trade desk. A specialist assigned to
            this corridor will contact you within 24 operational hours.
          </p>

          <div className="mt-8 w-full max-w-md border border-[#D8CEBD] bg-[#F4EFE6] p-5 text-left text-xs font-mono">
            <div className="flex justify-between border-b border-[#D8CEBD] pb-2.5 text-[#6B625B]">
              <span className="font-medium">MANIFEST ID</span>
              <strong className="text-[#161210] font-bold">{manifestCode}</strong>
            </div>
            <div className="flex justify-between py-2.5 text-[#6B625B] border-b border-[#D8CEBD]">
              <span className="font-medium">COMMODITY</span>
              <span className="text-[#161210] font-bold">
                {values.product || "Unspecified"}
              </span>
            </div>
            <div className="flex justify-between py-2.5 text-[#6B625B] border-b border-[#D8CEBD]">
              <span className="font-medium">CORRIDOR</span>
              <span className="text-[#161210]">
                {values.direction} → {values.destination}
              </span>
            </div>
            <div className="flex justify-between pt-2.5 text-[#6B625B]">
              <span className="font-medium">TIMESTAMP</span>
              <span>
                {new Date().toISOString().slice(0, 16).replace("T", " ")} UTC
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setStatus("idle");
              setValues({ ...defaultValues, product: productName, direction: directionDefault });
            }}
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:text-[#9E4E39] transition"
          >
            <span>Submit Another Inquiry</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative border border-[#D8CEBD] bg-[#FAF7F2] p-5 sm:p-10 shadow-xl"
    >
      {/* Manifest Header */}
      <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-5 mb-8 text-xs text-[#6B625B]">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center border border-[#C5A059] bg-[#161210] text-[#C5A059]">
            <FileText size={16} />
          </div>
          <span className="font-serif text-sm font-bold text-[#161210]">
            Commercial Trade Inquiry & Quotation
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center border border-[#D8CEBD] bg-[#F4EFE6] px-2.5 py-0.5 font-mono text-[11px] text-[#6B625B]">
          DOC #CTM-2026
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Full Name <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Alistair Vance"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.name ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.name && <p className="font-mono text-xs text-[#9E4E39]">{errors.name}</p>}
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Company / Trading Entity <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="e.g. Pacific Orient Logistics Ltd."
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.company ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.company && <p className="font-mono text-xs text-[#9E4E39]">{errors.company}</p>}
        </div>

        {/* Corporate Email */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Corporate Email <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g. trade@pacificorient.com"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.email ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.email && <p className="font-mono text-xs text-[#9E4E39]">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Phone / WhatsApp <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g. +971 50 123 4567"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.phone ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.phone && <p className="font-mono text-xs text-[#9E4E39]">{errors.phone}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Country of Operation <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="e.g. United Arab Emirates"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.country ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.country && <p className="font-mono text-xs text-[#9E4E39]">{errors.country}</p>}
        </div>

        {/* Direction (Import / Export) */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Trade Direction <span className="text-[#9E4E39]">*</span>
          </label>
          <div className="flex gap-2">
            {(["Import", "Export", "Both"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => handleChange("direction", dir)}
                className={`flex-1 py-2.5 font-mono text-xs font-bold tracking-wide uppercase transition-all ${
                  values.direction === dir
                    ? "bg-[#161210] text-[#FAF7F2] border border-[#161210]"
                    : "border border-[#D8CEBD] bg-[#F4EFE6] text-[#161210] hover:bg-[#EBE3D3]"
                }`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Product / Commodity */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Commodity / Machine <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.product}
            onChange={(e) => handleChange("product", e.target.value)}
            placeholder="e.g. High-Speed Air Jet Loom, Aged Basmati Rice"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.product ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.product && <p className="font-mono text-xs text-[#9E4E39]">{errors.product}</p>}
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Estimated Volume / Units <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="e.g. 5 Units or 2x 40ft FCL"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.quantity ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.quantity && <p className="font-mono text-xs text-[#9E4E39]">{errors.quantity}</p>}
        </div>

        {/* Destination Port / City */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Destination Port / Delivery Hub <span className="text-[#9E4E39]">*</span>
          </label>
          <input
            type="text"
            value={values.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            placeholder="e.g. Jebel Ali Port, Rotterdam, Dammam, Singapore"
            className={`w-full border bg-[#F4EFE6] px-3.5 py-2.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition ${
              errors.destination ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.destination && <p className="font-mono text-xs text-[#9E4E39]">{errors.destination}</p>}
        </div>

        {/* Message / Trade Specifications */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block font-mono text-xs font-bold uppercase text-[#161210]">
            Technical Specifications & Custom Requirements <span className="text-[#9E4E39]">*</span>
          </label>
          <textarea
            rows={4}
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Please detail machine specifications, production capacity, voltage, required incoterms (FOB/CIF), delivery timelines…"
            className={`w-full border bg-[#F4EFE6] p-3.5 text-base sm:text-sm text-[#161210] placeholder:text-[#6B625B]/40 focus:bg-[#FAF7F2] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none resize-none transition ${
              errors.message ? "border-[#9E4E39] bg-rose-50/20" : "border-[#D8CEBD]"
            }`}
          />
          {errors.message && <p className="font-mono text-xs text-[#9E4E39]">{errors.message}</p>}
        </div>
      </div>

      {/* Footer and Submit CTA */}
      <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-[#D8CEBD] pt-6 sm:flex-row">
        <div className="flex items-center gap-2 text-xs text-[#6B625B] font-mono">
          <ShieldCheck size={16} className="text-[#3E4C34] shrink-0" />
          <span>Strict Non-Disclosure & Commercial Confidentiality Guaranteed</span>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2.5 border border-[#C5A059] bg-[#C5A059] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] transition-all duration-200 hover:bg-[#161210] hover:text-[#FAF7F2] hover:border-[#161210] active:scale-98 disabled:opacity-60 sm:w-auto cursor-pointer shadow-md"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Transmitting Manifest…</span>
            </>
          ) : (
            <>
              <span>Submit Trade Inquiry</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
