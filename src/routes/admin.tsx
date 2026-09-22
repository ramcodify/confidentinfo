import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Database,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Globe2,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserRound,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import {
  isAdminAuthenticated,
  isLoginLockedOut,
  loginAdmin,
  logoutAdmin,
  subscribeToAuth,
} from "../lib/auth";
import {
  normalizeIndustry,
  normalizeProduct,
  useMachineryStore,
  type CustomerEnquiry,
  type NetworkLocation,
  type TextileIndustry,
  type TextileMachine,
} from "../lib/machinery-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Executive Admin Dashboard | Confident Textiles Machinery" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type AdminTab =
  | "dashboard"
  | "products"
  | "industries"
  | "network"
  | "company"
  | "owner"
  | "enquiries";

function AdminPage() {
  const [isAuth, setIsAuth] = useState(isAdminAuthenticated());
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const store = useMachineryStore();

  useEffect(() => {
    return subscribeToAuth((auth) => setIsAuth(auth));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const lockout = isLoginLockedOut();
    if (lockout.locked) {
      setLoginError(`Security Lockout: Too many failed attempts. Please retry in ${lockout.remainingSeconds} seconds.`);
      return;
    }

    const success = loginAdmin(adminId, password);
    if (!success) {
      const updatedLockout = isLoginLockedOut();
      if (updatedLockout.locked) {
        setLoginError(`Security Lockout Activated: 5 consecutive failed attempts. Access locked for 5 minutes.`);
      } else {
        setLoginError("Invalid credentials. Please verify your Admin ID and Password.");
      }
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#161210] pt-24 sm:pt-36 pb-16 px-4 flex items-center justify-center text-[#FAF7F2]">
        <div className="w-full max-w-md rounded-2xl border border-[#C5A059]/40 bg-[#1E1916]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2 border-b border-[#C5A059]/20 pb-5">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059]">
              <Lock size={22} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
              RESTRICTED EXECUTIVE ACCESS
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#FAF7F2]">Admin Control Center</h1>
            <p className="text-xs text-[#FAF7F2]/60">
              Confident Textiles Machinery Management Console
            </p>
          </div>

          {loginError && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300 font-mono">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase text-[#C5A059] font-bold font-mono block">Admin ID</label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter ID (admin)"
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059] transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase text-[#C5A059] font-bold font-mono block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (admin123)"
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#C5A059] py-3.5 text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition shadow-lg cursor-pointer font-mono"
            >
              Sign In to Dashboard
            </button>

            <div className="rounded-xl bg-[#161210]/60 p-3 text-center border border-white/5 text-xs text-[#FAF7F2]/50 font-mono">
              Demo Credentials: ID: <strong className="text-[#C5A059]">admin</strong> | Pass:{" "}
              <strong className="text-[#C5A059]">admin123</strong>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: typeof Layers; count: number | null }[] = [
    { id: "dashboard", label: "Dashboard", icon: Layers, count: null },
    { id: "products", label: "Machinery", icon: Wrench, count: store.products.length },
    { id: "industries", label: "Industries", icon: Building2, count: store.industries.length },
    { id: "network", label: "Network Hubs", icon: Globe2, count: store.networkLocations.length },
    { id: "company", label: "Company Info", icon: FileText, count: null },
    { id: "owner", label: "Owner Profile", icon: UserRound, count: null },
    {
      id: "enquiries",
      label: "Enquiries",
      icon: Mail,
      count: store.enquiries.filter((e) => e.status.toLowerCase() === "new").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#161210] text-[#FAF7F2] pt-24 sm:pt-28 pb-20">
      {/* Top Admin Header Bar */}
      <header className="border-b border-[#C5A059]/30 bg-[#1E1916]/90 px-4 sm:px-8 py-3.5 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-[1720px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#C5A059] text-[#161210] font-bold text-xs shadow-md">
              CTM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-sm sm:text-base font-bold text-[#FAF7F2]">
                  Confident Textiles Machinery
                </h1>
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" title="System Operational" />
              </div>
              <p className="text-[11px] text-[#C5A059] font-mono tracking-wider uppercase">
                EXECUTIVE MANAGEMENT CONSOLE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#C5A059]/30 bg-[#161210]/60 px-3 py-1.5 font-mono text-xs text-[#FAF7F2]/80 hover:bg-[#C5A059]/20 hover:text-[#FAF7F2] transition"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>
            <button
              onClick={() => logoutAdmin()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 px-3 py-1.5 font-mono text-xs text-rose-300 hover:bg-rose-500 hover:text-white transition cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="mx-auto max-w-[1720px] px-4 sm:px-8 pt-6 sm:pt-8">
        {/* Responsive Tabs Navigation */}
        <div className="space-y-3">
          {/* Mobile Select Dropdown (< sm) */}
          <div className="sm:hidden relative">
            <label className="text-[11px] text-[#C5A059] uppercase font-mono font-bold block mb-1">
              Select Admin Section
            </label>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as AdminTab)}
                className="w-full appearance-none rounded-xl border border-[#C5A059]/40 bg-[#1E1916] px-4 py-3 text-sm text-[#FAF7F2] outline-none font-mono focus:border-[#C5A059]"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label} {tab.count !== null ? `(${tab.count})` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059]" />
            </div>
          </div>

          {/* Desktop & Tablet Pill Navigation (>= sm) */}
          <nav className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#C5A059]/20 font-mono text-xs scrollbar-none" aria-label="Admin Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C5A059] border-[#C5A059] text-[#161210] font-bold shadow-md shadow-[#C5A059]/20"
                      : "bg-[#1E1916] border-[#C5A059]/20 text-[#FAF7F2]/80 hover:bg-[#C5A059]/10 hover:border-[#C5A059]/40"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-[#161210] text-[#C5A059]"
                          : "bg-[#C5A059]/20 text-[#DFBA6F]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Panes */}
        <div className="mt-6 sm:mt-8">
          {activeTab === "dashboard" && <DashboardOverviewTab store={store} setActiveTab={setActiveTab} />}
          {activeTab === "products" && <ManageProductsTab store={store} />}
          {activeTab === "industries" && <ManageIndustriesTab store={store} />}
          {activeTab === "network" && <ManageNetworkTab store={store} />}
          {activeTab === "company" && <ManageCompanyTab store={store} />}
          {activeTab === "owner" && <ManageOwnerTab store={store} />}
          {activeTab === "enquiries" && <ManageEnquiriesTab store={store} />}
        </div>
      </main>
    </div>
  );
}

// =============================================================================
// TAB 1: DASHBOARD OVERVIEW
// =============================================================================
function DashboardOverviewTab({
  store,
  setActiveTab,
}: {
  store: ReturnType<typeof useMachineryStore>;
  setActiveTab: (t: AdminTab) => void;
}) {
  const newEnquiries = store.enquiries.filter((e) => e.status.toLowerCase() === "new");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-[#C5A059]/30 bg-gradient-to-r from-[#1E1916] via-[#241D18] to-[#1E1916] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-widest font-bold block mb-1">
            [ SOURCING PIPELINE STATUS: ACTIVE ]
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
            Welcome to Confident Textiles Control Center
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/70 mt-1 max-w-2xl leading-relaxed">
            Manage your live Chinese machinery catalog, mapped Indian textile sectors, international maritime hubs, and incoming mill enquiries in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2.5 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer shadow-md"
          >
            <Plus size={14} />
            <span>Add Machinery</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          onClick={() => setActiveTab("products")}
          className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-2 hover:border-[#C5A059] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#C5A059]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Total Machinery</span>
            <Wrench size={18} className="transition-transform group-hover:scale-110" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2]">{store.products.length}</div>
          <p className="text-xs text-[#FAF7F2]/60 font-mono">Verified Chinese Models Active</p>
        </div>

        <div
          onClick={() => setActiveTab("industries")}
          className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-2 hover:border-[#C5A059] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#C5A059]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Textile Sectors</span>
            <Building2 size={18} className="transition-transform group-hover:scale-110" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2]">{store.industries.length}</div>
          <p className="text-xs text-[#FAF7F2]/60 font-mono">Indian Manufacturing Clusters</p>
        </div>

        <div
          onClick={() => setActiveTab("network")}
          className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-2 hover:border-[#C5A059] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#C5A059]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Maritime Hubs</span>
            <Globe2 size={18} className="transition-transform group-hover:scale-110" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2]">
            {store.networkLocations.length}
          </div>
          <p className="text-xs text-[#FAF7F2]/60 font-mono">China & India Port Terminals</p>
        </div>

        <div
          onClick={() => setActiveTab("enquiries")}
          className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-2 hover:border-[#C5A059] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#DFBA6F]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Mill Enquiries</span>
            <Mail size={18} className="transition-transform group-hover:scale-110" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2]">{store.enquiries.length}</div>
          <p className="text-xs text-rose-400 font-mono flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-rose-400 animate-pulse" />
            {newEnquiries.length} Pending Action
          </p>
        </div>
      </div>

      {/* Quick Launch & Recent Enquiries */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Enquiries Preview */}
        <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#C5A059]" />
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">Recent Mill Enquiries</h3>
            </div>
            <button
              onClick={() => setActiveTab("enquiries")}
              className="font-mono text-xs text-[#C5A059] hover:underline cursor-pointer"
            >
              View All ({store.enquiries.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {store.enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="rounded-xl bg-[#161210] p-3.5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FAF7F2]">{enq.name}</span>
                    <span className="text-[#C5A059]">({enq.company})</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold font-mono ${
                        enq.status.toLowerCase() === "new"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-[#FAF7F2]/65 text-[11px] line-clamp-1">
                    {enq.requirement}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#C5A059]/20 text-[#DFBA6F] hover:bg-[#C5A059] hover:text-[#161210] transition font-mono text-xs cursor-pointer self-start sm:self-auto"
                >
                  Manage →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Actions Grid */}
        <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-4">
          <div className="border-b border-[#C5A059]/20 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">Website Content Controls</h3>
            <p className="text-xs text-[#FAF7F2]/60 font-mono mt-1">
              Changes update immediately on the public website without redeploying.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => setActiveTab("products")}
              className="p-4 rounded-xl bg-[#161210] border border-[#C5A059]/20 hover:border-[#C5A059] text-left space-y-1.5 group transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#C5A059]">
                <Wrench size={16} />
                <span className="text-[10px] text-[#FAF7F2]/40 font-mono">CATALOG</span>
              </div>
              <strong className="block text-[#FAF7F2] group-hover:text-[#C5A059]">Manage Machinery</strong>
              <p className="text-[11px] text-[#FAF7F2]/60 leading-normal">
                Add/edit machines, photos (16:9), speed, power, and specs.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("industries")}
              className="p-4 rounded-xl bg-[#161210] border border-[#C5A059]/20 hover:border-[#C5A059] text-left space-y-1.5 group transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#C5A059]">
                <Building2 size={16} />
                <span className="text-[10px] text-[#FAF7F2]/40 font-mono">SECTORS</span>
              </div>
              <strong className="block text-[#FAF7F2] group-hover:text-[#C5A059]">Manage Industries</strong>
              <p className="text-[11px] text-[#FAF7F2]/60 leading-normal">
                Map machinery models to Indian manufacturing sectors.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("company")}
              className="p-4 rounded-xl bg-[#161210] border border-[#C5A059]/20 hover:border-[#C5A059] text-left space-y-1.5 group transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#C5A059]">
                <FileText size={16} />
                <span className="text-[10px] text-[#FAF7F2]/40 font-mono">HOME COPY</span>
              </div>
              <strong className="block text-[#FAF7F2] group-hover:text-[#C5A059]">Edit Company Info</strong>
              <p className="text-[11px] text-[#FAF7F2]/60 leading-normal">
                Hero headline, trade narrative, address, and phone.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("owner")}
              className="p-4 rounded-xl bg-[#161210] border border-[#C5A059]/20 hover:border-[#C5A059] text-left space-y-1.5 group transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#C5A059]">
                <UserRound size={16} />
                <span className="text-[10px] text-[#FAF7F2]/40 font-mono">PROFILE</span>
              </div>
              <strong className="block text-[#FAF7F2] group-hover:text-[#C5A059]">Edit Owner Profile</strong>
              <p className="text-[11px] text-[#FAF7F2]/60 leading-normal">
                Photo (1:1), bio, trade credentials, and direct desk.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// TAB 2: MANAGE PRODUCTS (MACHINERY)
// =============================================================================
function ManageProductsTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingMachine, setEditingMachine] = useState<TextileMachine | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Sample high quality presets
  const imagePresets = [
    { label: "Air Jet Loom", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85" },
    { label: "Rapier Loom", url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85" },
    { label: "Spinning Frame", url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=85" },
    { label: "Finishing Stenter", url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85" },
  ];

  const filtered = store.products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.manufacturer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const startNew = () => {
    setIsNew(true);
    setEditingMachine(
      normalizeProduct({
        id: `mach-${Date.now()}`,
        name: "",
        slug: `machine-${Date.now()}`,
        category: "Weaving",
        origin: "China (Verified Partner)",
        manufacturer: "Chinese Precision Machinery Corp",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
        description: "",
        specs: {
          speed: "1,200 RPM",
          power: "4.5 kW",
          voltage: "380V / 50Hz (3 Phase)",
          dimensions: "4,200 × 1,850 × 1,600 mm",
          weight: "3,800 kg",
          capacity: "High Speed Continuous",
          automation: "PLC Fully Automated Touchscreen",
        },
        features: ["PLC Microprocessor Control", "Energy Efficient Servo Drive", "Low Vibration Cast Iron Frame"],
        applications: ["Indian Textile Mills", "Export Production", "Cotton & Synthetic Processing"],
      })
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMachine) return;
    if (isNew) {
      store.addProduct(editingMachine);
    } else {
      store.updateProduct(editingMachine.id, editingMachine);
    }
    setEditingMachine(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C5A059]/20 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Textile Machinery Catalog</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Active inventory of verified Chinese textile machinery available for import into India.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF7F2]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search machinery…"
              className="w-full sm:w-56 rounded-xl border border-[#C5A059]/30 bg-[#1E1916] pl-8 pr-3 py-2 text-xs text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-[#C5A059]/30 bg-[#1E1916] px-3 py-2 text-xs text-[#FAF7F2] outline-none font-mono focus:border-[#C5A059]"
          >
            <option value="All">All Categories</option>
            <option value="Weaving">Weaving</option>
            <option value="Spinning">Spinning</option>
            <option value="Knitting">Knitting</option>
            <option value="Dyeing & Finishing">Dyeing & Finishing</option>
            <option value="Textile Processing">Textile Processing</option>
          </select>

          <button
            onClick={startNew}
            className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer shadow-md"
          >
            <Plus size={14} />
            <span>Add Machine</span>
          </button>
        </div>
      </div>

      {/* Machine Cards List */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] overflow-hidden flex flex-col justify-between hover:border-[#C5A059]/60 transition group shadow-lg"
          >
            <div className="relative aspect-[16/9] w-full bg-[#161210] overflow-hidden">
              <img
                src={m.image}
                alt={m.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 rounded-lg bg-[#161210]/90 backdrop-blur-md px-2.5 py-1 font-mono text-[9px] text-[#DFBA6F] border border-[#C5A059]/40 uppercase font-bold">
                {m.category}
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#9E4E39] font-bold block uppercase tracking-wider">
                  🇨🇳 {m.manufacturer}
                </span>
                <h4 className="font-serif text-base font-bold text-[#FAF7F2] line-clamp-1 mt-0.5">{m.name}</h4>
                <p className="text-xs text-[#FAF7F2]/65 line-clamp-2 mt-1 leading-relaxed">{m.description}</p>
              </div>

              {/* Specs Highlights */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#FAF7F2]/75">
                <div>
                  <span className="text-[#C5A059] block text-[9px]">SPEED:</span>
                  <span className="truncate block">{m.specs?.speed || m.specifications?.productionSpeed || "850 – 1,100 RPM"}</span>
                </div>
                <div>
                  <span className="text-[#C5A059] block text-[9px]">POWER:</span>
                  <span className="truncate block">{m.specs?.power || m.specifications?.powerConsumption || "3.7 kW – 5.5 kW"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Link
                  to="/products/$slug"
                  params={{ slug: m.slug }}
                  className="text-xs text-[#C5A059] hover:underline font-mono inline-flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink size={11} />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingMachine(m);
                    }}
                    className="p-2 rounded-lg bg-[#C5A059]/20 text-[#DFBA6F] hover:bg-[#C5A059] hover:text-[#161210] transition cursor-pointer"
                    title="Edit Machine"
                  >
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete machine: ${m.name}?`)) store.deleteProduct(m.id);
                    }}
                    className="p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                    title="Delete Machine"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingMachine && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-[#C5A059] bg-[#1E1916] p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#C5A059]/25 pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-widest font-bold block">
                  [ INVENTORY RECORD ]
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] mt-0.5">
                  {isNew ? "Add New Textile Machine" : `Edit: ${editingMachine.name}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingMachine(null)}
                className="p-1 rounded-lg text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/10 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Machine Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMachine.name}
                    onChange={(e) => setEditingMachine({ ...editingMachine, name: e.target.value })}
                    placeholder="e.g. High-Speed Air Jet Loom CF-9000"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Category</label>
                  <select
                    value={editingMachine.category}
                    onChange={(e) => setEditingMachine({ ...editingMachine, category: e.target.value })}
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none font-mono focus:border-[#C5A059]"
                  >
                    <option value="Weaving">Weaving</option>
                    <option value="Spinning">Spinning</option>
                    <option value="Knitting">Knitting</option>
                    <option value="Dyeing & Finishing">Dyeing & Finishing</option>
                    <option value="Textile Processing">Textile Processing</option>
                    <option value="Auxiliary Machinery">Auxiliary Machinery</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Manufacturer (China)</label>
                  <input
                    type="text"
                    required
                    value={editingMachine.manufacturer}
                    onChange={(e) => setEditingMachine({ ...editingMachine, manufacturer: e.target.value })}
                    placeholder="e.g. Qingdao Textile Machinery Works"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Origin / Port</label>
                  <input
                    type="text"
                    required
                    value={editingMachine.origin}
                    onChange={(e) => setEditingMachine({ ...editingMachine, origin: e.target.value })}
                    placeholder="e.g. Qingdao, Shandong, China"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Image URL with Aspect Ratio Guide & Live Preview */}
              <div className="space-y-2 rounded-xl bg-[#161210] p-4 border border-[#C5A059]/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono flex items-center gap-1.5">
                    <ImageIcon size={14} />
                    <span>Machine Image URL</span>
                  </label>
                  <span className="text-[10px] font-mono text-[#DFBA6F] bg-[#C5A059]/20 px-2 py-0.5 rounded">
                    Aspect Ratio: 16:9 Landscape (Recommended: 1200 × 675 px)
                  </span>
                </div>

                <input
                  type="url"
                  required
                  value={editingMachine.image}
                  onChange={(e) => setEditingMachine({ ...editingMachine, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#1E1916] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-[#FAF7F2]/50">Quick Sample Presets:</span>
                  {imagePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setEditingMachine({ ...editingMachine, image: preset.url })}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#FAF7F2]/80 hover:bg-[#C5A059] hover:text-[#161210] transition cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Live Preview Box */}
                {editingMachine.image && (
                  <div className="mt-2 relative aspect-[16/9] w-full max-w-sm rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={editingMachine.image}
                      alt="Live preview"
                      className="size-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85";
                      }}
                    />
                    <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
                      ✓ Live 16:9 Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Machine Description</label>
                <textarea
                  rows={3}
                  value={editingMachine.description}
                  onChange={(e) => setEditingMachine({ ...editingMachine, description: e.target.value })}
                  placeholder="Comprehensive description of engineering capabilities, fabric compatibility, and production output…"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Technical Specifications Grid */}
              <div className="border-t border-[#C5A059]/20 pt-4 space-y-3">
                <span className="text-xs text-[#DFBA6F] font-bold uppercase font-mono tracking-wider block">
                  TECHNICAL SPECIFICATIONS:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Speed / RPM</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.speed || editingMachine.specifications?.productionSpeed || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), speed: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), productionSpeed: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Power</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.power || editingMachine.specifications?.powerConsumption || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), power: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), powerConsumption: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Voltage</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.voltage || editingMachine.specifications?.voltage || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), voltage: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), voltage: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Dimensions</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.dimensions || editingMachine.specifications?.dimensions || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), dimensions: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), dimensions: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Weight</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.weight || editingMachine.specifications?.weight || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), weight: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), weight: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#FAF7F2]/60 uppercase font-mono">Automation</label>
                    <input
                      type="text"
                      value={editingMachine.specs?.automation || editingMachine.specifications?.automation || ""}
                      onChange={(e) =>
                        setEditingMachine({
                          ...editingMachine,
                          specs: { ...(editingMachine.specs || {}), automation: e.target.value } as any,
                          specifications: { ...(editingMachine.specifications || {}), automation: e.target.value } as any,
                        })
                      }
                      className="w-full rounded-lg border border-[#C5A059]/30 bg-[#161210] p-2 text-xs text-[#FAF7F2]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C5A059]/20">
                <button
                  type="button"
                  onClick={() => setEditingMachine(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-[#FAF7F2]/80 hover:bg-white/10 transition cursor-pointer font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C5A059] font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer font-mono text-xs shadow-md"
                >
                  Save Machine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TAB 3: MANAGE INDUSTRIES
// =============================================================================
function ManageIndustriesTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [editingInd, setEditingInd] = useState<TextileIndustry | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setIsNew(true);
    setEditingInd(
      normalizeIndustry({
        id: `ind-${Date.now()}`,
        name: "",
        tagline: "Industrial Textile Sector",
        description: "",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85",
        suitableMachinery: ["Air Jet Looms", "Finishing Frames"],
        clusters: ["Coimbatore", "Surat", "Tirupur"],
        compliance: ["ISO 9001:2015", "CE Conformity", "Ministry of Textiles Mandates"],
      })
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInd) return;
    if (isNew) {
      store.addIndustry(editingInd);
    } else {
      store.updateIndustry(editingInd.id, editingInd);
    }
    setEditingInd(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C5A059]/20 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Manage Textile Industries</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Indian textile sectors and their mapped Chinese machinery solutions.
          </p>
        </div>

        <button
          onClick={startNew}
          className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2.5 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add Industry Sector</span>
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {store.industries.map((ind) => (
          <div
            key={ind.id}
            className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] overflow-hidden flex flex-col justify-between hover:border-[#C5A059]/50 transition group shadow-lg"
          >
            <div className="aspect-[4/3] relative bg-[#161210] overflow-hidden">
              <img
                src={ind.image}
                alt={ind.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-2 left-3 text-[11px] text-[#C5A059] font-mono font-bold">
                {ind.tagline}
              </span>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#FAF7F2]">{ind.name}</h4>
                <p className="text-xs text-[#FAF7F2]/65 line-clamp-2 mt-1 leading-relaxed">{ind.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#FAF7F2]/50">
                  {(ind.suitableMachinery || []).length} Models Mapped
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingInd(ind);
                    }}
                    className="p-2 rounded-lg bg-[#C5A059]/20 text-[#DFBA6F] hover:bg-[#C5A059] hover:text-[#161210] transition cursor-pointer"
                    title="Edit Industry"
                  >
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete industry sector: ${ind.name}?`)) store.deleteIndustry(ind.id);
                    }}
                    className="p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                    title="Delete Industry"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingInd && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-[#C5A059] bg-[#1E1916] p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#C5A059]/25 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                {isNew ? "Add Textile Industry Sector" : `Edit Sector: ${editingInd.name}`}
              </h3>
              <button
                onClick={() => setEditingInd(null)}
                className="p-1 rounded-lg text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/10 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Sector Name *</label>
                <input
                  type="text"
                  required
                  value={editingInd.name}
                  onChange={(e) => setEditingInd({ ...editingInd, name: e.target.value })}
                  placeholder="e.g. Denim & Heavy Twill Weaving"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Tagline</label>
                <input
                  type="text"
                  value={editingInd.tagline}
                  onChange={(e) => setEditingInd({ ...editingInd, tagline: e.target.value })}
                  placeholder="e.g. High-Volume Export Fabrics"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Image URL & Aspect Ratio 4:3 Guide */}
              <div className="space-y-2 rounded-xl bg-[#161210] p-4 border border-[#C5A059]/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono flex items-center gap-1.5">
                    <ImageIcon size={14} />
                    <span>Industry Image URL</span>
                  </label>
                  <span className="text-[10px] font-mono text-[#DFBA6F] bg-[#C5A059]/20 px-2 py-0.5 rounded">
                    Aspect Ratio: 4:3 (Recommended: 1200 × 900 px)
                  </span>
                </div>
                <input
                  type="url"
                  required
                  value={editingInd.image}
                  onChange={(e) => setEditingInd({ ...editingInd, image: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#1E1916] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
                {editingInd.image && (
                  <div className="mt-2 relative aspect-[4/3] w-full max-w-xs rounded-xl overflow-hidden border border-white/10">
                    <img src={editingInd.image} alt="Sector preview" className="size-full object-cover" />
                    <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
                      ✓ Live 4:3 Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Description</label>
                <textarea
                  rows={3}
                  value={editingInd.description}
                  onChange={(e) => setEditingInd({ ...editingInd, description: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">
                  Suitable Machinery (comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editingInd.suitableMachinery) ? editingInd.suitableMachinery.join(", ") : (editingInd.suitableMachinery || "")}
                  onChange={(e) =>
                    setEditingInd({
                      ...editingInd,
                      suitableMachinery: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Air Jet Looms, Heavy Rapier Weaving, Denim Stenter"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">
                  Indian Manufacturing Clusters (comma separated)
                </label>
                <input
                  type="text"
                  value={(editingInd.clusters || []).join(", ")}
                  onChange={(e) =>
                    setEditingInd({
                      ...editingInd,
                      clusters: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="Ahmedabad, Surat, Coimbatore, Tirupur, Bhilwara"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#C5A059]/20">
                <button
                  type="button"
                  onClick={() => setEditingInd(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-[#FAF7F2]/80 hover:bg-white/10 transition cursor-pointer font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C5A059] font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer font-mono text-xs shadow-md"
                >
                  Save Industry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TAB 4: MANAGE NETWORK LOCATIONS
// =============================================================================
function ManageNetworkTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [editingLoc, setEditingLoc] = useState<NetworkLocation | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setIsNew(true);
    setEditingLoc({
      id: `loc-${Date.now()}`,
      name: "",
      country: "China",
      role: "Sourcing & Quality Hub",
      city: "",
      coordinates: "31.2304° N, 121.4737° E",
      description: "Direct machinery inspection and container stuffing station.",
      services: ["Factory Audits", "Trial Run Inspection", "Port Consolidation"],
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc) return;
    if (isNew) {
      store.addNetworkLocation(editingLoc);
    } else {
      store.updateNetworkLocation(editingLoc.id, editingLoc);
    }
    setEditingLoc(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C5A059]/20 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">International Maritime Hubs</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Bilateral logistics stations across China manufacturing origin ports and Indian discharge terminals.
          </p>
        </div>

        <button
          onClick={startNew}
          className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2.5 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add Maritime Hub</span>
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {store.networkLocations.map((loc) => (
          <div key={loc.id} className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
                <span>{loc.country === "China" ? "🇨🇳" : "🇮🇳"}</span>
                <span>{loc.country === "China" ? "CHINA SOURCING HUB" : "INDIA DISCHARGE PORT"}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingLoc(loc);
                  }}
                  className="p-1.5 rounded-lg bg-[#C5A059]/20 text-[#DFBA6F] hover:bg-[#C5A059] hover:text-[#161210] transition cursor-pointer"
                  title="Edit Hub"
                >
                  <Edit size={13} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete hub: ${loc.name}?`)) store.deleteNetworkLocation(loc.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                  title="Delete Hub"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#FAF7F2]">{loc.name}</h4>
              <p className="text-xs text-[#FAF7F2]/75 font-mono">{loc.city} · {loc.role}</p>
              <p className="text-[11px] text-[#FAF7F2]/50 font-mono mt-1">{loc.coordinates}</p>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">{loc.description}</p>
          </div>
        ))}
      </div>

      {editingLoc && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#C5A059] bg-[#1E1916] p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#C5A059]/25 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">
                {isNew ? "Add Maritime Hub" : `Edit Hub: ${editingLoc.name}`}
              </h3>
              <button
                onClick={() => setEditingLoc(null)}
                className="p-1 rounded-lg text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/10 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Hub Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLoc.name}
                    onChange={(e) => setEditingLoc({ ...editingLoc, name: e.target.value })}
                    placeholder="e.g. Shanghai Maritime Hub"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Country</label>
                  <select
                    value={editingLoc.country}
                    onChange={(e) =>
                      setEditingLoc({ ...editingLoc, country: e.target.value as "China" | "India" })
                    }
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none font-mono focus:border-[#C5A059]"
                  >
                    <option value="China">China</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">City</label>
                  <input
                    type="text"
                    required
                    value={editingLoc.city}
                    onChange={(e) => setEditingLoc({ ...editingLoc, city: e.target.value })}
                    placeholder="e.g. Shanghai / Chennai"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Role / Operations</label>
                  <input
                    type="text"
                    required
                    value={editingLoc.role}
                    onChange={(e) => setEditingLoc({ ...editingLoc, role: e.target.value })}
                    placeholder="e.g. Primary Deepwater Sourcing Port"
                    className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Coordinates</label>
                <input
                  type="text"
                  value={editingLoc.coordinates}
                  onChange={(e) => setEditingLoc({ ...editingLoc, coordinates: e.target.value })}
                  placeholder="31.2304° N, 121.4737° E"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Description</label>
                <textarea
                  rows={3}
                  value={editingLoc.description}
                  onChange={(e) => setEditingLoc({ ...editingLoc, description: e.target.value })}
                  placeholder="Operational scope, container consolidation, direct ocean liner connectivity…"
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#C5A059]/20">
                <button
                  type="button"
                  onClick={() => setEditingLoc(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-[#FAF7F2]/80 hover:bg-white/10 transition cursor-pointer font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C5A059] font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer font-mono text-xs shadow-md"
                >
                  Save Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TAB 5: MANAGE COMPANY INFORMATION
// =============================================================================
function ManageCompanyTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [formData, setFormData] = useState({
    ...store.companyInfo,
    companyName: store.companyInfo.companyName || "Confident Textiles Machinery",
    tagline: store.companyInfo.tagline || "",
    address: store.companyInfo.address || store.companyInfo.officeAddress || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateCompanyInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-[#C5A059]/20 pb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Company Profile & Narrative</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Hero headlines, trade narrative copy, and official registered communication coordinates.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs text-emerald-400 font-mono animate-in fade-in">
            <CheckCircle2 size={14} />
            Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-sm">
        {/* Section 1: Hero Copy */}
        <div className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs text-[#C5A059] font-bold uppercase font-mono tracking-wider">
              1. HOMEPAGE HERO SECTION COPY
            </span>
            <span className="text-[10px] font-mono text-[#FAF7F2]/50">Displays on "/"</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#FAF7F2]/75 font-semibold">Company Brand Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#FAF7F2]/75 font-semibold">Hero Eyebrow / Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#FAF7F2]/75 font-semibold">Hero Supporting Narrative</label>
            <textarea
              rows={3}
              value={formData.heroSupportingText}
              onChange={(e) => setFormData({ ...formData, heroSupportingText: e.target.value })}
              className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs text-[#C5A059] font-bold uppercase font-mono tracking-wider">
              2. OFFICIAL CONTACT & LIAISON COORDINATES
            </span>
            <span className="text-[10px] font-mono text-[#FAF7F2]/50">Displays in Footer & Contact page</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-[#FAF7F2]/75 font-semibold">Official Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#FAF7F2]/75 font-semibold">Direct Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#FAF7F2]/75 font-semibold">Indian Office Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-[#C5A059] px-8 py-3.5 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition shadow-lg cursor-pointer flex items-center gap-2"
        >
          <Save size={16} />
          <span>Save Company Information</span>
        </button>
      </form>
    </div>
  );
}

// =============================================================================
// TAB 6: MANAGE OWNER PROFILE
// =============================================================================
function ManageOwnerTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [profile, setProfile] = useState({ ...store.ownerProfile });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateOwnerProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="border-b border-[#C5A059]/20 pb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Manage Owner Profile</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Leadership credentials, biography, and direct communication channels.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs text-emerald-400 font-mono animate-in fade-in">
            <CheckCircle2 size={14} />
            Saved Successfully!
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
        {/* Left: Form */}
        <form onSubmit={handleSave} className="space-y-6 text-sm">
          <div className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Full Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Designation</label>
                <input
                  type="text"
                  required
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Experience (Years / History)</label>
                <input
                  type="text"
                  value={Array.isArray(profile.experience) ? profile.experience.join(", ") : (profile.experience || "")}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Photo URL</label>
                  <span className="text-[10px] font-mono text-[#DFBA6F]">1:1 Square (800×800)</span>
                </div>
                <input
                  type="url"
                  value={profile.photo || ""}
                  onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">Executive Biography</label>
              <textarea
                rows={4}
                value={profile.biography}
                onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase text-[#C5A059] font-bold font-mono">
                Expertise Areas (comma separated)
              </label>
              <input
                type="text"
                value={Array.isArray(profile.expertise) ? profile.expertise.join(", ") : (profile.expertise || "")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    expertise: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-4 py-3 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#C5A059]/20 bg-[#1E1916] p-6 space-y-4">
            <span className="text-xs text-[#C5A059] font-bold uppercase font-mono tracking-wider block">
              DIRECT DESK COMMUNICATION CHANNELS:
            </span>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-[#FAF7F2]/75 font-semibold">Direct Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#FAF7F2]/75 font-semibold">Direct Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#FAF7F2]/75 font-semibold">Location / Hub</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3.5 py-2.5 text-sm text-[#FAF7F2] outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#C5A059] px-8 py-3.5 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <Save size={16} />
            <span>Save Owner Profile</span>
          </button>
        </form>

        {/* Right: Live Public Card Preview */}
        <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 space-y-4 shadow-xl">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-[#C5A059] font-bold uppercase tracking-wider">
              LIVE PREVIEW ON WEBSITE
            </span>
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#C5A059]/40 bg-[#161210]">
              <img
                src={profile.photo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"}
                alt={profile.name}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-serif text-xl font-bold text-[#FAF7F2]">{profile.name}</h4>
                <p className="text-xs text-[#C5A059] font-mono">{profile.designation}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#FAF7F2]/80 leading-relaxed">
              <p className="line-clamp-3">{profile.biography}</p>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
              {profile.expertise.slice(0, 3).map((exp, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#DFBA6F]">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// TAB 7: CONTACT / ENQUIRY MANAGEMENT
// =============================================================================
function ManageEnquiriesTab({ store }: { store: ReturnType<typeof useMachineryStore> }) {
  const [filter, setFilter] = useState<"all" | "new" | "reviewed" | "completed">("all");
  const [search, setSearch] = useState("");

  const filtered = store.enquiries.filter((e) => {
    const matchesFilter = filter === "all" || e.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.requirement.toLowerCase().includes(search.toLowerCase()) ||
      (e.machineName && e.machineName.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C5A059]/20 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Customer Machinery Enquiries</h2>
          <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
            Commercial requests transmitted by Indian textile mills via public inquiry forms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF7F2]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search enquiries…"
              className="w-full sm:w-48 rounded-xl border border-[#C5A059]/30 bg-[#1E1916] pl-8 pr-3 py-2 text-xs text-[#FAF7F2] outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            {(["all", "new", "reviewed", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl uppercase font-bold transition cursor-pointer text-xs ${
                  filter === f
                    ? "bg-[#C5A059] text-[#161210] shadow-sm"
                    : "bg-[#1E1916] text-[#FAF7F2]/60 hover:text-[#FAF7F2] border border-[#C5A059]/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#1E1916] p-12 text-center text-xs font-mono text-[#FAF7F2]/50">
            No inquiries match your current search or filter criteria.
          </div>
        ) : (
          filtered.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
            const whatsappMsg = encodeURIComponent(
              `Hello ${enq.name}, this is Confident Textiles Machinery regarding your inquiry for ${enq.machineName || "Textile Machinery"}. We are ready to provide technical specifications and factory delivered pricing.`
            );

            return (
              <div
                key={enq.id}
                className="rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] p-5 sm:p-6 space-y-4 shadow-lg transition hover:border-[#C5A059]/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-lg font-bold text-[#FAF7F2]">{enq.name}</span>
                    <span className="text-[#DFBA6F] font-semibold text-sm">({enq.company})</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold font-mono ${
                        enq.status.toLowerCase() === "new"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : enq.status.toLowerCase() === "reviewed"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#FAF7F2]/50">
                    {new Date(enq.createdAt).toLocaleDateString()} at{" "}
                    {new Date(enq.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs text-[#FAF7F2]/80 bg-[#161210] p-3.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[#C5A059] block text-[10px] font-mono">EMAIL:</span>
                    <a href={`mailto:${enq.email}`} className="hover:underline text-sm truncate block">{enq.email}</a>
                  </div>
                  <div>
                    <span className="text-[#C5A059] block text-[10px] font-mono">PHONE / WHATSAPP:</span>
                    <a href={`tel:${enq.phone}`} className="hover:underline text-sm block">{enq.phone}</a>
                  </div>
                  <div>
                    <span className="text-[#C5A059] block text-[10px] font-mono">MACHINE REQUIRED:</span>
                    <strong className="text-[#FAF7F2] text-sm block">{enq.machineName || "General Requirement"}</strong>
                  </div>
                </div>

                {/* Requirement Specification */}
                <div className="bg-[#161210] p-4 rounded-xl border border-white/5">
                  <span className="text-[#C5A059] block text-[10px] font-mono mb-1.5 uppercase font-bold">
                    PRODUCTION REQUIREMENT SPECIFICATION:
                  </span>
                  <p className="text-sm text-[#FAF7F2]/90 leading-relaxed font-sans">{enq.requirement}</p>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#FAF7F2]/60">Update Status:</span>
                    <select
                      value={enq.status.toLowerCase()}
                      onChange={(e) =>
                        store.updateEnquiryStatus(enq.id, e.target.value as any)
                      }
                      className="rounded-xl border border-[#C5A059]/30 bg-[#161210] px-3 py-1.5 text-xs font-mono text-[#FAF7F2] outline-none"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Direct WhatsApp Transmit Button */}
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs text-emerald-300 hover:bg-emerald-600 hover:text-white transition font-mono"
                      >
                        <MessageSquare size={13} />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}

                    {/* Email Client */}
                    <a
                      href={`mailto:${enq.email}?subject=Regarding your machinery requirement with Confident Textiles`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 px-3.5 py-1.5 text-xs text-[#DFBA6F] hover:bg-[#C5A059] hover:text-[#161210] transition font-mono"
                    >
                      <Mail size={13} />
                      <span>Email Client</span>
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm(`Delete enquiry from ${enq.name}?`)) store.deleteEnquiry(enq.id);
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                      title="Delete Enquiry"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
