import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { CheckCircle2, Loader2, Phone, MapPin, Clock, ChevronDown } from "lucide-react";

// ── Config ─────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_CAREERS_ID ?? "myknlbvv";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// ── Data ───────────────────────────────────────────────────────────────────────
const POSITIONS = [
  "Pizza Cook",
  "Prep Cook",
  "Cashier / Counter Staff",
  "Server",
  "Delivery Driver",
  "Dishwasher",
  "Catering Assistant",
  "Any Available Position",
];

const AVAILABILITY = [
  "Full-Time",
  "Part-Time",
  "Weekends Only",
  "Evenings Only",
  "Flexible",
];

const PERKS = [
  {
    icon: "🍕",
    title: "Free Meal Every Shift",
    desc: "Enjoy a complimentary meal from our menu every time you work.",
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    desc: "We work around your life — school, family, second jobs, all welcome.",
  },
  {
    icon: "🤝",
    title: "Team-First Culture",
    desc: "We treat every team member like family. No cliques, no drama.",
  },
  {
    icon: "📈",
    title: "Room to Grow",
    desc: "Start anywhere and move up. Many of our leads started at entry level.",
  },
  {
    icon: "💵",
    title: "Competitive Pay",
    desc: "Fair wages plus tips for front-of-house roles.",
  },
  {
    icon: "🎉",
    title: "Fun Environment",
    desc: "A place where the music's good and the people are better.",
  },
];

const OPEN_ROLES = [
  { title: "Pizza Cook", type: "Full-Time / Part-Time", urgent: true },
  { title: "Counter Staff / Cashier", type: "Part-Time", urgent: false },
  { title: "Delivery Driver", type: "Evenings & Weekends", urgent: true },
  { title: "Catering Assistant", type: "Event-Based", urgent: false },
];

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormState {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  availability: string;
  experience: string;
  whyUs: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Scroll Reveal Hook ─────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "", email: "", phone: "",
    position: "", availability: "",
    experience: "", whyUs: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const perksReveal   = useScrollReveal();
  const rolesReveal   = useScrollReveal();
  const formReveal    = useScrollReveal(0.05);

  const formSectionRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const payload = {
      "Full Name": form.fullName,
      "Email": form.email,
      "Phone": form.phone,
      "Position Applied For": form.position,
      "Availability": form.availability,
      "Relevant Experience": form.experience || "None provided",
      "Why Do You Want to Join": form.whyUs || "None provided",
      _subject: `New Job Application — ${form.fullName} for ${form.position}`,
    };
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setStatus("success"); }
      else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0D0C] font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      {/* <nav className="fixed top-0 w-full z-50 bg-[#0F0D0C]/95 backdrop-blur-sm border-b border-amber-600/15 flex items-center justify-between px-[5%] h-16">
        <a href="/" className="font-serif italic font-bold text-lg text-white no-underline">
          "<span className="text-amber-500">Your</span>" Pizza Shop
          <span className="text-white/30 text-sm font-normal not-italic ml-2">· Largo</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 list-none">
          {["About", "Menu", "Catering", "Contact", "Join Our Team", "FAQs"].map((link) => (
            <li key={link}>
              <a href="#" className={`text-[11px] font-bold tracking-[0.13em] uppercase transition-colors no-underline ${link === "Join Our Team" ? "text-amber-500" : "text-white/50 hover:text-amber-400"}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav> */}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">

        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(201,145,58,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,145,58,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Big decorative text */}
        <span className="absolute select-none pointer-events-none font-serif font-black text-white/[0.03]"
          style={{ fontSize: "clamp(120px, 22vw, 260px)", top: "50%", left: "50%", transform: "translate(-50%, -52%)", whiteSpace: "nowrap", letterSpacing: "-0.04em" }}>
          HIRING
        </span>

        {/* Red diagonal accent */}
        <div className="absolute top-0 right-0 w-[35vw] h-full bg-red-600/8 skew-x-[-8deg] translate-x-[10%] pointer-events-none" />

        <div className="relative text-center px-6 max-w-4xl mx-auto animate-[fadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="inline-flex items-center gap-3 text-amber-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-6">
            <span className="w-8 h-px bg-amber-400/60" />
            We're Growing
            <span className="w-8 h-px bg-amber-400/60" />
          </div>

          <h1 className="font-serif font-black text-white leading-[0.95] mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
            Come Join<br />
            <em className="text-red-500 not-italic">Our Team</em>
          </h1>

          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            We're not just a pizza shop — we're a neighbourhood staple. If you love good food, good people, and a fast-paced environment, you belong here.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:-translate-y-1 shadow-2xl shadow-red-900/50">
              Apply Now →
            </button>
            <a href="#roles"
              className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors no-underline">
              See Open Roles
              <ChevronDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-white/15" />
          <ChevronDown className="w-4 h-4 text-white/20" />
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="py-28 px-[5%] bg-[#FAF6EE]">
        <div className="max-w-6xl mx-auto">
          <div
            ref={perksReveal.ref}
            className="transition-all duration-700"
            style={{ opacity: perksReveal.visible ? 1 : 0, transform: perksReveal.visible ? "translateY(0)" : "translateY(40px)" }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="inline-flex items-center gap-2 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Why Work Here
                  <span className="w-7 h-px bg-red-600 inline-block" />
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight">
                  More than just<br />
                  <em className="text-red-600 not-italic">a job</em>
                </h2>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                We invest in our people. When you grow, we grow. Here's what you can expect when you join our crew.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200">
              {PERKS.map((perk, i) => (
                <div key={perk.title}
                  className="bg-[#FAF6EE] hover:bg-white p-8 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="text-3xl mb-5 block" style={{ fontSize: "28px" }}>{perk.icon}</span>
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-2 group-hover:text-red-600 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="roles" className="py-28 px-[5%] bg-stone-900">
        <div className="max-w-4xl mx-auto">
          <div
            ref={rolesReveal.ref}
            className="transition-all duration-700"
            style={{ opacity: rolesReveal.visible ? 1 : 0, transform: rolesReveal.visible ? "translateY(0)" : "translateY(40px)" }}
          >
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Open Positions
                <span className="w-7 h-px bg-amber-400/70 inline-block" />
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Where could <em className="text-amber-400 not-italic">you fit?</em>
              </h2>
            </div>

            <div className="space-y-px">
              {OPEN_ROLES.map((role, i) => (
                <div key={role.title}
                  className="flex items-center justify-between gap-6 bg-stone-800 hover:bg-stone-700 px-8 py-6 transition-all duration-200 group cursor-pointer"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={scrollToForm}
                >
                  <div className="flex items-center gap-5">
                    <span className="w-1.5 h-8 bg-red-600 group-hover:h-12 transition-all duration-300 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-serif text-lg font-bold text-white">{role.title}</h3>
                        {role.urgent && (
                          <span className="bg-red-600/20 text-red-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-red-600/30">
                            Hiring Now
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-sm mt-0.5">{role.type}</p>
                    </div>
                  </div>
                  <span className="text-white/30 group-hover:text-amber-400 text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap">
                    Apply →
                  </span>
                </div>
              ))}
            </div>

            <p className="text-center text-white/30 text-sm mt-8">
              Don't see your role? Apply anyway — we're always open to great people.
            </p>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section ref={formSectionRef} className="py-28 px-[5%] bg-[#FAF6EE]">
        <div className="max-w-6xl mx-auto">
          <div
            ref={formReveal.ref}
            className="transition-all duration-700"
            style={{ opacity: formReveal.visible ? 1 : 0, transform: formReveal.visible ? "translateY(0)" : "translateY(40px)" }}
          >

            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Apply Today
                <span className="w-7 h-px bg-red-600 inline-block" />
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight mb-4">
                Ready to <em className="text-red-600 not-italic">get started?</em>
              </h2>
              <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
                Fill out the form below and we'll be in touch within 48 hours to set up a time to meet.
              </p>
            </div>

            {status === "success" ? (
              /* ── Success ── */
              <div className="max-w-md mx-auto text-center py-16">
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-stone-800 mb-3">
                  Application Sent!
                </h3>
                <p className="text-stone-500 leading-relaxed mb-2">
                  Thanks, <strong className="font-semibold text-stone-700">{form.fullName}</strong>! We've received your application for{" "}
                  <span className="text-stone-700 font-medium">{form.position}</span>.
                </p>
                <p className="text-stone-500 leading-relaxed mb-8">
                  We'll reach out to you at{" "}
                  <span className="text-stone-700 font-medium">{form.email}</span> or{" "}
                  <span className="text-stone-700 font-medium">{form.phone}</span> within 48 hours.
                </p>
                <Button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ fullName: "", email: "", phone: "", position: "", availability: "", experience: "", whyUs: "" });
                  }}
                  className="rounded-none bg-red-600 hover:bg-red-700 text-white text-xs tracking-widest uppercase px-8"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              /* ── Two-column layout: form + sidebar ── */
              <div className="grid lg:grid-cols-[1fr_320px] gap-0.5">

                {/* Form */}
                <div className="bg-white p-10 md:p-14">
                  <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Contact Info */}
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800 mb-1">1. Contact Info</p>
                      <Separator className="bg-stone-100 mb-5" />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="fullName" className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input id="fullName" value={form.fullName} onChange={set("fullName")} placeholder="Jane Smith" required className="rounded-none border-stone-200 focus-visible:ring-red-500" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                            Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(727) 000-0000" required className="rounded-none border-stone-200 focus-visible:ring-red-500" />
                        </div>
                      </div>
                      <div className="space-y-1.5 mt-5">
                        <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" required className="rounded-none border-stone-200 focus-visible:ring-red-500" />
                      </div>
                    </div>

                    {/* Role & Availability */}
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800 mb-1">2. Role & Availability</p>
                      <Separator className="bg-stone-100 mb-5" />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                            Position <span className="text-red-500">*</span>
                          </Label>
                          <Select required value={form.position} onValueChange={(v) => setForm((p) => ({ ...p, position: v }))}>
                            <SelectTrigger className="rounded-none border-stone-200 focus:ring-red-500">
                              <SelectValue placeholder="Select a role…" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              {POSITIONS.map((pos) => (
                                <SelectItem key={pos} value={pos} className="rounded-none">{pos}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                            Availability <span className="text-red-500">*</span>
                          </Label>
                          <Select required value={form.availability} onValueChange={(v) => setForm((p) => ({ ...p, availability: v }))}>
                            <SelectTrigger className="rounded-none border-stone-200 focus:ring-red-500">
                              <SelectValue placeholder="Select availability…" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              {AVAILABILITY.map((a) => (
                                <SelectItem key={a} value={a} className="rounded-none">{a}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800 mb-1">
                        3. Experience{" "}
                        <span className="text-stone-400 font-normal text-base">(optional)</span>
                      </p>
                      <Separator className="bg-stone-100 mb-5" />
                      <div className="space-y-1.5">
                        <Label htmlFor="experience" className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                          Relevant Experience
                        </Label>
                        <Textarea id="experience" value={form.experience} onChange={set("experience")}
                          placeholder="Previous restaurant jobs, cooking experience, customer service roles — anything relevant. No experience? No problem, just say so!"
                          rows={4} className="rounded-none border-stone-200 focus-visible:ring-red-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* Why Us */}
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800 mb-1">
                        4. Why "Your" Pizza Shop?{" "}
                        <span className="text-stone-400 font-normal text-base">(optional)</span>
                      </p>
                      <Separator className="bg-stone-100 mb-5" />
                      <div className="space-y-1.5">
                        <Label htmlFor="whyUs" className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                          Tell us why you want to join
                        </Label>
                        <Textarea id="whyUs" value={form.whyUs} onChange={set("whyUs")}
                          placeholder="What draws you to working here? What do you bring to the team?"
                          rows={3} className="rounded-none border-stone-200 focus-visible:ring-red-500 resize-none"
                        />
                      </div>
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{errorMsg}</p>
                    )}

                    <Button type="submit" disabled={status === "loading"}
                      className="w-full rounded-none bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-[0.15em] uppercase py-6 transition-all duration-200 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Application…
                        </span>
                      ) : (
                        "Submit Application →"
                      )}
                    </Button>

                    <p className="text-center text-xs text-stone-400">
                      Prefer to walk in? We're at{" "}
                      <span className="text-stone-600 font-medium">1200 8th Ave SW, Largo FL</span>
                    </p>
                  </form>
                </div>

                {/* Sidebar */}
                <div className="bg-stone-900 p-8 flex flex-col gap-8">
                  <div>
                    <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                      Your Application
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: "Name", value: form.fullName },
                        { label: "Position", value: form.position },
                        { label: "Availability", value: form.availability },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-0.5">
                          <span className="text-white/30 text-[10px] uppercase tracking-widest">{label}</span>
                          <span className={`text-sm font-medium ${value ? "text-white" : "text-white/20 italic"}`}>
                            {value || "Not yet selected"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-stone-700" />

                  <div>
                    <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">What Happens Next</p>
                    <div className="space-y-4">
                      {[
                        { step: "01", text: "We review your application within 48 hours" },
                        { step: "02", text: "We'll call or email to schedule a quick chat" },
                        { step: "03", text: "Come in and meet the team" },
                        { step: "04", text: "Start your first shift!" },
                      ].map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-4">
                          <span className="font-serif text-xs font-bold text-red-500/60 mt-0.5 flex-shrink-0">{step}</span>
                          <p className="text-white/50 text-xs leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-stone-700" />

                  <div className="space-y-3">
                    <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase">Find Us</p>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-white/25 mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed">1200 8th Ave SW, Largo FL 33770</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-white/25 mt-0.5 flex-shrink-0" />
                      <a href="tel:7275811101" className="text-white/50 text-xs hover:text-amber-400 transition-colors no-underline">(727) 581-1101</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-white/25 mt-0.5 flex-shrink-0" />
                      <div className="text-white/50 text-xs space-y-0.5 leading-relaxed">
                        <p>Tue – Thu: 11am – 10pm</p>
                        <p>Fri: 11am – 11pm</p>
                        <p>Sat: 11am – 10pm</p>
                        <p>Sun: 12pm – 9pm</p>
                        <p className="text-white/25">Monday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <footer className="bg-[#0F0D0C] border-t border-white/5 px-[5%] py-8 flex flex-wrap items-center justify-between gap-4">
        <span className="font-serif italic font-bold text-white/40 text-sm">
          "<span className="text-amber-500/60">Your</span>" Pizza Shop Largo
        </span>
        <div className="flex gap-6">
          {["Facebook", "Instagram", "YouTube"].map((s) => (
            <a key={s} href="#" className="text-white/25 hover:text-amber-400 text-[11px] font-bold tracking-widest uppercase transition-colors no-underline">{s}</a>
          ))}
        </div>
        <p className="text-white/20 text-xs">© 2025 "Your" Pizza Shop Largo. All rights reserved.</p>
      </footer>
    </div>
  );
}
