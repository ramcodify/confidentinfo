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

    const generatedCode = `MTC-${values.direction.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setManifestCode(generatedCode);
    setStatus("confirmed");
  };

  if (status === "confirmed") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-slate-900 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
            <Check size={28} />
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            TRADE MANIFEST LOGGED
          </span>

          <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Inquiry Received Successfully
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Your trade inquiry has been logged with our global trade desk. A specialist assigned to
            this corridor will contact you within 24 operational hours.
          </p>

          <div className="mt-8 w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-5 text-left text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2.5 text-slate-500">
              <span className="font-medium">MANIFEST ID</span>
              <strong className="text-slate-900 font-mono">{manifestCode}</strong>
            </div>
            <div className="flex justify-between py-2.5 text-slate-500 border-b border-slate-200">
              <span className="font-medium">COMMODITY</span>
              <span className="text-slate-900 font-semibold">
                {values.product || "Unspecified"}
              </span>
            </div>
            <div className="flex justify-between py-2.5 text-slate-500 border-b border-slate-200">
              <span className="font-medium">CORRIDOR</span>
              <span className="text-slate-900">
                {values.direction} → {values.destination}
              </span>
            </div>
            <div className="flex justify-between pt-2.5 text-slate-500">
              <span className="font-medium">TIMESTAMP</span>
              <span className="font-mono">
                {new Date().toISOString().slice(0, 16).replace("T", " ")} UTC
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setStatus("idle");
              setValues({ ...defaultValues, product: productName, direction: directionDefault });
            }}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition"
          >
            <span>Submit Another Inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5"
    >
      {/* Manifest Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FileText size={16} />
          </div>
          <span className="text-sm font-bold text-slate-900">
            Commercial Trade Inquiry & Quotation
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] text-slate-600">
          DOC #MTC-2026
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Alistair Vance"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.name ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Company / Trading Entity <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="e.g. Pacific Orient Logistics Ltd."
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.company ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.company && <p className="text-xs text-rose-500">{errors.company}</p>}
        </div>

        {/* Corporate Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Corporate Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g. trade@pacificorient.com"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Phone / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g. +971 50 123 4567"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.phone ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Country of Incorporation <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="e.g. United Arab Emirates"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.country ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.country && <p className="text-xs text-rose-500">{errors.country}</p>}
        </div>

        {/* Direction (Import / Export) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Trade Direction <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            {(["Import", "Export", "Both"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => handleChange("direction", dir)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all ${
                  values.direction === dir
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Product / Commodity */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Commodity / Product <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.product}
            onChange={(e) => handleChange("product", e.target.value)}
            placeholder="e.g. High-Speed Air Jet Loom, Aged Basmati Rice"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.product ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.product && <p className="text-xs text-rose-500">{errors.product}</p>}
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Estimated Volume / Units <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="e.g. 5 Units or 2x 40ft FCL"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.quantity ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.quantity && <p className="text-xs text-rose-500">{errors.quantity}</p>}
        </div>

        {/* Destination Port / City */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Destination Port / Delivery Hub <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={values.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            placeholder="e.g. Jebel Ali Port, Rotterdam, Dammam, Singapore"
            className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition ${
              errors.destination ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.destination && <p className="text-xs text-rose-500">{errors.destination}</p>}
        </div>

        {/* Message / Trade Specifications */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Technical Specifications & Custom Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Please detail machine specifications, production capacity, voltage, required incoterms (FOB/CIF), delivery timelines…"
            className={`w-full rounded-xl border bg-slate-50/50 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none resize-none transition ${
              errors.message ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
        </div>
      </div>

      {/* Footer and Submit CTA */}
      <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-slate-100 pt-6 sm:flex-row">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>Strict Non-Disclosure & Commercial Confidentiality Guaranteed</span>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-98 disabled:opacity-60 sm:w-auto"
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
