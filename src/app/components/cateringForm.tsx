import { useState } from "react";
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
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Loader2, Phone, MapPin, Clock } from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────
// Replace with your Formspree form ID (the part after /f/ in your endpoint URL)
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? "myknldad";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// ── Data ──────────────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "super-deluxe",
    label: "Super Deluxe Party Pack — $10.99/guest",
    includes: "Pizzas, Wings, Subs, Garden Salad, Garlic Knots, Coleslaw",
    badge: "Most Popular",
  },
  {
    id: "deluxe-plus",
    label: "Deluxe Plus Party Pack — $9.99/guest",
    includes: "Pizzas, Subs, Garden Salad, Garlic Knots",
  },
  {
    id: "deluxe",
    label: "Deluxe Party Pack — $7.99/guest",
    includes: "Pizzas, Garden Salad, Garlic Knots",
  },
  {
    id: "basic",
    label: "Basic Party Pack — $6.99/guest",
    includes: "Marinara Spaghetti, Garden Salad, Garlic Knots",
  },
];

const EXTRAS = [
  { id: "paper-pack", label: "Paper Pack (plates, forks, napkins) — $0.50" },
  { id: "chicken-50", label: "50 Pieces Chicken — $62.95" },
  { id: "chicken-tenders", label: "Chicken Tenders — $2.25/each" },
  { id: "greek-salad", label: "Half Tray Greek Salad — $29.95" },
  { id: "potato-coleslaw", label: "Half Tray Potato Salad or Cole Slaw — $19.95" },
  { id: "drinks", label: "2 Liter Drinks (Coke, Diet, or Starry) — $3.95" },
  { id: "spaghetti", label: "Half Pan Italian Spaghetti (serves 25) — $24.95" },
  { id: "lasagna", label: "Half Tray Lasagna (serves 25) — $44.95" },
];

const EVENT_TYPES = [
  "Birthday Party",
  "Wedding Reception",
  "Corporate Lunch",
  "Office Party",
  "Graduation",
  "Other",
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  // Contact
  fullName: string;
  email: string;
  phone: string;
  // Event
  eventType: string;
  eventDate: string;
  eventTime: string;
  guestCount: string;
  // Package
  selectedPackage: string;
  // Extras
  extras: string[];
  // Notes
  notes: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Component ─────────────────────────────────────────────────────────────────
export default function CateringOrderForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    selectedPackage: "",
    extras: [],
    notes: "",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ── Helpers ──────────────────────────────────────────────────────────────
  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleExtra = (id: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter((e) => e !== id)
        : [...prev.extras, id],
    }));
  };

  const selectedPackageData = PACKAGES.find((p) => p.id === form.selectedPackage);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const selectedExtrasLabels = EXTRAS.filter((ex) =>
      form.extras.includes(ex.id)
    ).map((ex) => ex.label);

    const payload = {
      "Full Name": form.fullName,
      "Email": form.email,
      "Phone": form.phone,
      "Event Type": form.eventType,
      "Event Date": form.eventDate,
      "Event Time": form.eventTime,
      "Guest Count": form.guestCount,
      "Selected Package": selectedPackageData?.label ?? "Not selected",
      "Add-ons": selectedExtrasLabels.length > 0 ? selectedExtrasLabels.join(", ") : "None",
      "Additional Notes": form.notes || "None",
      // Formspree uses _subject for the email subject line
      _subject: `New Catering Order — ${form.fullName} (${form.eventDate})`,
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  // ── Success Screen ───────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-800 mb-3">
            Order Received!
          </h2>
          <p className="text-stone-500 leading-relaxed mb-2">
            Thank you, <strong className="font-semibold text-stone-700">{form.fullName}</strong>! Your catering request has been submitted successfully.
          </p>
          <p className="text-stone-500 leading-relaxed mb-8">
            We'll reach out to <span className="text-stone-700 font-medium">{form.email}</span> or{" "}
            <span className="text-stone-700 font-medium">{form.phone}</span> to confirm your order shortly.
          </p>
          <Button
            onClick={() => {
              setStatus("idle");
              setForm({
                fullName: "", email: "", phone: "", eventType: "",
                eventDate: "", eventTime: "", guestCount: "",
                selectedPackage: "", extras: [], notes: "",
              });
            }}
            className="rounded-none bg-red-600 hover:bg-red-700 text-white text-xs tracking-widest uppercase px-8"
          >
            Submit Another Order
          </Button>
        </div>
      </div>
    );
  }

  // ── Main Form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF6EE] font-sans">

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-stone-900/97 backdrop-blur-sm border-b border-amber-600/20 flex items-center justify-between px-[5%] h-16">
        <a href="/" className="font-serif italic font-bold text-lg text-white no-underline">
          "<span className="text-amber-500">Your</span>" Pizza Shop
          <span className="text-white/40 text-sm font-normal not-italic ml-2">· Largo</span>
        </a>
        <a
          href="tel:7275811101"
          className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase no-underline hover:text-amber-300 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          (727) 581-1101
        </a>
      </nav>

      <div className="pt-16 grid lg:grid-cols-[1fr_380px] min-h-screen">

        {/* ── Form Panel ── */}
        <div className="px-[6%] py-16">

          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Catering &amp; Events
              <span className="w-7 h-px bg-red-600 inline-block" />
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-black text-stone-800 leading-tight mb-3">
              Request a <em className="text-red-600 not-italic">Catering</em> Order
            </h1>
            <p className="text-stone-500 text-sm leading-relaxed max-w-lg">
              Fill out the form below and we'll get back to you within 24 hours to confirm your order and discuss any details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">

            {/* ── Section 1: Contact Info ── */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg font-bold text-stone-800 mb-1">
                1. Your Contact Info
              </legend>
              <Separator className="bg-stone-200" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={set("fullName")}
                    placeholder="Jane Smith"
                    required
                    className="rounded-none border-stone-200 focus-visible:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="(727) 000-0000"
                    required
                    className="rounded-none border-stone-200 focus-visible:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@example.com"
                  required
                  className="rounded-none border-stone-200 focus-visible:ring-red-500"
                />
              </div>
            </fieldset>

            {/* ── Section 2: Event Details ── */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg font-bold text-stone-800 mb-1">
                2. Event Details
              </legend>
              <Separator className="bg-stone-200" />

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                  Type of Event <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={form.eventType}
                  onValueChange={(v) => setForm((p) => ({ ...p, eventType: v }))}
                >
                  <SelectTrigger className="rounded-none border-stone-200 focus:ring-red-500">
                    <SelectValue placeholder="Select event type…" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {EVENT_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="rounded-none">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="space-y-1.5 sm:col-span-1">
                  <Label htmlFor="eventDate" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                    Event Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={set("eventDate")}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="rounded-none border-stone-200 focus-visible:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="eventTime" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                    Start Time
                  </Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={form.eventTime}
                    onChange={set("eventTime")}
                    className="rounded-none border-stone-200 focus-visible:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="guestCount" className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                    Guest Count <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    value={form.guestCount}
                    onChange={set("guestCount")}
                    placeholder="e.g. 30"
                    required
                    className="rounded-none border-stone-200 focus-visible:ring-red-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Section 3: Package Selection ── */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg font-bold text-stone-800 mb-1">
                3. Choose Your Package <span className="text-red-500">*</span>
              </legend>
              <Separator className="bg-stone-200" />

              <div className="space-y-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = form.selectedPackage === pkg.id;
                  return (
                    <label
                      key={pkg.id}
                      htmlFor={pkg.id}
                      className={`flex items-start gap-4 p-4 border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        id={pkg.id}
                        name="selectedPackage"
                        value={pkg.id}
                        required
                        checked={isSelected}
                        onChange={() =>
                          setForm((p) => ({ ...p, selectedPackage: pkg.id }))
                        }
                        className="mt-1 accent-red-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${isSelected ? "text-red-700" : "text-stone-800"}`}>
                            {pkg.label}
                          </span>
                          {pkg.badge && (
                            <Badge className="bg-red-600 hover:bg-red-600 text-white text-[10px] tracking-widest uppercase rounded-none px-2 py-0.5">
                              {pkg.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 mt-1">{pkg.includes}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* ── Section 4: Add-ons ── */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg font-bold text-stone-800 mb-1">
                4. Add-ons <span className="text-stone-400 font-normal text-base">(optional)</span>
              </legend>
              <Separator className="bg-stone-200" />

              <div className="grid sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const checked = form.extras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      htmlFor={extra.id}
                      className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all duration-150 ${
                        checked
                          ? "border-amber-400 bg-amber-50"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <Checkbox
                        id={extra.id}
                        checked={checked}
                        onCheckedChange={() => toggleExtra(extra.id)}
                        className="mt-0.5 rounded-none data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <span className={`text-xs leading-relaxed ${checked ? "text-amber-800 font-medium" : "text-stone-600"}`}>
                        {extra.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* ── Section 5: Notes ── */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg font-bold text-stone-800 mb-1">
                5. Additional Notes <span className="text-stone-400 font-normal text-base">(optional)</span>
              </legend>
              <Separator className="bg-stone-200" />

              <Textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Dietary restrictions, allergies, special requests, delivery instructions…"
                rows={4}
                className="rounded-none border-stone-200 focus-visible:ring-red-500 resize-none"
              />
            </fieldset>

            {/* ── Error ── */}
            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                {errorMsg}
              </p>
            )}

            {/* ── Submit ── */}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-none bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-[0.15em] uppercase py-6 transition-all duration-200 disabled:opacity-60"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </span>
              ) : (
                "Submit Catering Request →"
              )}
            </Button>

            <p className="text-center text-xs text-stone-400">
              Prefer to call? Reach us at{" "}
              <a href="tel:7275811101" className="text-red-600 font-semibold hover:underline">
                (727) 581-1101
              </a>
            </p>
          </form>
        </div>

        {/* ── Sticky Sidebar ── */}
        <aside className="hidden lg:flex flex-col gap-6 bg-stone-900 px-8 py-16 sticky top-16 self-start h-[calc(100vh-64px)] overflow-y-auto">

          {/* Order Summary */}
          <div>
            <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Order Summary
            </p>
            <Card className="bg-stone-800 border-stone-700 rounded-none">
              <CardContent className="p-5 space-y-4">
                {form.selectedPackage ? (
                  <>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Package</p>
                      <p className="text-white text-sm font-semibold leading-snug">
                        {selectedPackageData?.label}
                      </p>
                      <p className="text-white/40 text-xs mt-1">{selectedPackageData?.includes}</p>
                    </div>
                    {form.guestCount && (
                      <div>
                        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Guests</p>
                        <p className="text-white text-sm font-semibold">{form.guestCount} guests</p>
                      </div>
                    )}
                    {form.extras.length > 0 && (
                      <div>
                        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-2">Add-ons</p>
                        <div className="space-y-1">
                          {form.extras.map((id) => {
                            const extra = EXTRAS.find((e) => e.id === id);
                            return (
                              <p key={id} className="text-white/70 text-xs leading-relaxed">
                                + {extra?.label}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-white/30 text-sm italic">
                    Your selections will appear here…
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-stone-700" />

          {/* Event Info */}
          {(form.eventDate || form.eventType) && (
            <div className="space-y-3">
              <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                Event Info
              </p>
              {form.eventType && (
                <p className="text-white/60 text-sm">{form.eventType}</p>
              )}
              {form.eventDate && (
                <p className="text-white/60 text-sm">
                  {new Date(form.eventDate + "T00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {form.eventTime && ` · ${form.eventTime}`}
                </p>
              )}
            </div>
          )}

          <Separator className="bg-stone-700" />

          {/* Contact Info */}
          <div className="space-y-3">
            <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              Contact Us
            </p>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
              <a href="tel:7275811101" className="text-white/60 text-sm hover:text-white transition-colors no-underline">
                (727) 581-1101
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
              <p className="text-white/60 text-sm">1200 8th Ave SW, Largo FL 33770</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
              <div className="text-white/60 text-xs space-y-0.5 leading-relaxed">
                <p>Tue – Thu: 11am – 10pm</p>
                <p>Fri: 11am – 11pm</p>
                <p>Sat: 11am – 10pm</p>
                <p>Sun: 12pm – 9pm</p>
                <p className="text-white/30">Monday: Closed</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
