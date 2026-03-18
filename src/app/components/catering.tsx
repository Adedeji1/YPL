import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";


// ── Types ───────────────────────────────────────────────
interface PackageItem {
  id: number;
  name: string;
  badge?: string;
  items: string[];
  price: string;
  image: string;
}

interface ExtraItem {
  name: string;
  price: string;
}

// ── Data ────────────────────────────────────────────────
const PACKAGES: PackageItem[] = [
  {
    id: 1,
    name: "Super Deluxe Party Pack",
    badge: "Most Popular",
    items: ["Pizzas (Two Toppings)", "Wings", "Subs", "Garden Salad", "Garlic Knots", "Coleslaw"],
    price: "$10.99",
    image:
      "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/8315c7b7-8ee1-456f-9a8a-edf031ef2b73/B0514B58-9C05-488D-B837-D5505D726B1E.jpeg",
  },
  {
    id: 2,
    name: "Deluxe Plus Party Pack",
    items: ["Pizzas (Two Toppings)", "Subs", "Garden Salad", "Garlic Knots"],
    price: "$9.99",
    image:
      "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/6003f662-7213-4f1d-a06a-3c2cc29b056a/FE2AD04E-B213-4DF6-A55D-A2EADB3CF1CB.jpeg",
  },
  {
    id: 3,
    name: "Deluxe Party Pack",
    items: ["Pizzas (Two Toppings)", "Garden Salad", "Garlic Knots"],
    price: "$7.99",
    image:
      "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/7b16d928-89c5-485e-b1ec-f5eacee2dcf2/D96CF308-E943-4207-8148-B677B710C769.jpeg",
  },
  {
    id: 4,
    name: "Basic Party Pack",
    items: ["Marinara Spaghetti", "Garden Salad", "Garlic Knots"],
    price: "$6.99",
    image:
      "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/cfcc2cbf-edd7-4fa1-985f-f1aa22de119e/C582F467-F8D1-4244-9942-71B4C7FEFA2F.jpeg",
  },
];

const EXTRAS: ExtraItem[] = [
  { name: "Paper Pack (plates, forks, napkins)", price: "$0.50" },
  { name: "50 Pieces Chicken", price: "$62.95" },
  { name: "Chicken Tenders", price: "$2.25 / each" },
  { name: "Half Tray Greek Salad", price: "$29.95" },
  { name: "Half Tray Potato Salad or Cole Slaw", price: "$19.95" },
  { name: "Drinks (2 Liter Coke, Diet, or Starry)", price: "$3.95" },
  { name: "Half Pan Italian Spaghetti (serves 25)", price: "$24.95" },
  { name: "Half Tray Lasagna (serves 25)", price: "$44.95" },
];

const EVENT_TYPES = ["Weddings", "Corporate Lunches", "Birthday Parties", "Receptions", "Office Parties", "Private Dinners"];

// ── Hook: Intersection Observer ─────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ── Sub-components ───────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
      {children}
      <span className="w-7 h-px bg-red-600 inline-block" />
    </span>
  );
}

function PackageCard({ pkg, delay }: { pkg: PackageItem; delay: number }) {
  const { ref, visible } = useScrollReveal();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 1800);
  };

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Card className="overflow-hidden border-0 rounded-none group hover:-translate-y-2 transition-transform duration-300 shadow-md h-full">
        <div className="relative h-52 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {pkg.badge && (
            <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700 text-white text-[10px] tracking-widest uppercase rounded-none">
              {pkg.badge}
            </Badge>
          )}
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 leading-tight">{pkg.name}</h3>

          <ul className="space-y-1 flex-1 mb-5">
            {pkg.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-stone-500 py-1.5 border-b border-stone-100">
                <span className="text-amber-500 text-[10px]">✦</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-serif text-2xl font-bold text-stone-800">{pkg.price}</span>
              <span className="text-stone-400 text-xs ml-1">/ guest</span>
            </div>
            <Button
              onClick={handleOrder}
              className={`rounded-none text-[11px] tracking-widest uppercase transition-all duration-200 ${
                ordered ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {ordered ? "✓ Added!" : "Order Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function Catering() {
  const introReveal = useScrollReveal();
  const packReveal = useScrollReveal();
  const extrasReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-stone-900/95 backdrop-blur-sm border-b border-amber-600/20 flex items-center justify-between px-[5%] h-16">
        <span className="font-serif italic font-bold text-lg text-white">
          "<span className="text-amber-500">Your</span>" Pizza Shop
          <span className="text-white/40 text-sm font-normal not-italic ml-2">· Largo</span>
        </span>
        <ul className="hidden md:flex items-center gap-7 list-none">
          {["About", "Menu", "Catering", "Contact", "FAQs"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  link === "Catering" ? "text-amber-500" : "text-white/60 hover:text-amber-500"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "64px" }}
      >
        <div
          className="absolute inset-0 animate-[zoomBg_18s_ease-in-out_infinite_alternate]"
          style={{
            background:
              "linear-gradient(155deg, rgba(26,23,20,0.9) 0%, rgba(192,25,14,0.45) 100%), url('https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/3b7edb62-3e61-408c-b008-5dac681fec0c/3A8F04BA-1A94-4EC3-8C11-069CEC4CF369.jpeg') center/cover no-repeat",
          }}
        />
        <div className="relative text-center px-6 animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="inline-flex items-center gap-3 text-amber-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-amber-400/70" />
            Catering &amp; Private Events
            <span className="w-8 h-px bg-amber-400/70" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-black text-white leading-tight mb-3">
            "<span className="text-amber-400 italic">Your</span>" Pizza Shop
            <br />
            <span className="text-4xl md:text-5xl font-bold">Largo</span>
          </h1>
          <p className="font-serif italic text-lg md:text-2xl text-white/65 mb-9">
            Every event deserves a slice of perfection
          </p>
          <a
            href="#packages"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-800 text-white text-[11px] font-bold tracking-[0.15em] uppercase px-9 py-4 transition-all duration-200 hover:-translate-y-1 shadow-xl shadow-red-900/40"
          >
            View Catering Packages ↓
          </a>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 px-[5%]">
        <div
          ref={introReveal.ref}
          className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto transition-all duration-700"
          style={{ opacity: introReveal.visible ? 1 : 0, transform: introReveal.visible ? "translateY(0)" : "translateY(40px)" }}
        >
          <div>
            <SectionLabel>Welcome</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight text-stone-800 mb-5">
              Elevate your{" "}
              <em className="text-red-600 not-italic">moments</em> with us
            </h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              Welcome to "Your" Pizza Shop Largo Catering — where delicious moments meet exceptional service. Elevate your events with handcrafted pizzas, mouthwatering appetizers, and savory delights.
            </p>
            <p className="text-stone-500 leading-relaxed">
              Whether it's a corporate gathering, a milestone celebration, or a casual get-together, our catering services are tailored to make your occasions unforgettable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-0.5 mt-8">
              {[
                { num: "4", label: "Party Packages" },
                { num: "$6.99", label: "Starting Price / Guest" },
                { num: "15+", label: "Add-on Items" },
                { num: "∞", label: "Occasions Covered" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`p-7 ${i % 2 === 0 ? "bg-stone-900" : "bg-red-600"}`}
                >
                  <div className="font-serif text-4xl font-black text-white">{s.num}</div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-white/55 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-[440px]">
            {[
              { src: "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/4b7829c0-c735-464c-8c63-6e7d4a3e1a04/birthday+party.jpeg", span: "col-span-2" },
              { src: "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/77f64d53-cc55-456c-abd1-45609c402cce/9866D503-9AC2-41AF-89C8-2216EE89F11E.jpeg", span: "" },
              { src: "https://images.squarespace-cdn.com/content/v1/642512cfe04e46095ee8a5d1/025eb941-d3a4-47cd-975b-5edac62824ac/boxesoffoodforparty.jpeg", span: "" },
            ].map((img) => (
              <div key={img.src} className={`overflow-hidden ${img.span}`}>
                <img src={img.src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="py-24 px-[5%] bg-stone-900">
        <div
          ref={packReveal.ref}
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: packReveal.visible ? 1 : 0, transform: packReveal.visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Packages
            <span className="w-7 h-px bg-amber-400/70 inline-block" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Choose your{" "}
            <em className="text-amber-400 not-italic">perfect pack</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 max-w-7xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ── EXTRAS ── */}
      <section className="py-24 px-[5%] bg-[#F4EBD9]">
        <div className="max-w-5xl mx-auto">
          <div
            ref={extrasReveal.ref}
            className="flex flex-wrap items-end justify-between gap-6 mb-12 transition-all duration-700"
            style={{ opacity: extrasReveal.visible ? 1 : 0, transform: extrasReveal.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div>
              <SectionLabel>Add-ons</SectionLabel>
              <h2 className="font-serif text-4xl font-extrabold text-stone-800 leading-tight">
                Extra, <em className="text-red-600">extra!</em>
              </h2>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Customize your order with these add-ons to take your event to the next level.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-stone-200">
            {EXTRAS.map((extra) => (
              <div
                key={extra.name}
                className="bg-[#FAF6EE] hover:bg-white flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-200"
              >
                <span className="text-sm text-stone-700 font-medium">{extra.name}</span>
                <span className="font-serif text-lg font-bold text-red-600 whitespace-nowrap">{extra.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-[5%] bg-red-600 text-center relative overflow-hidden">
        <span className="absolute font-serif text-[18vw] font-black text-white/[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap">
          PIZZA
        </span>
        <div
          ref={ctaReveal.ref}
          className="relative transition-all duration-700"
          style={{ opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-3">Ready to plan your event?</h2>
          <p className="text-white/75 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Call us to place your order. Our restaurant is available for private events: weddings, business lunches, birthday parties, and more!
          </p>
          <a href="tel:7275811101" className="font-serif text-3xl md:text-5xl font-bold text-white hover:opacity-80 transition-opacity">
            📞 (727) 581-1101
          </a>

          <div className="flex flex-wrap gap-2.5 justify-center mt-8">
            {EVENT_TYPES.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-white/10 border-white/25 text-white hover:bg-white/20 text-[10px] tracking-widest uppercase rounded-full px-4 py-1.5 cursor-default"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 px-[5%] bg-stone-900 text-center">
        <h3 className="font-serif text-2xl font-bold text-white mb-2">Stay in the loop</h3>
        <p className="text-white/45 text-sm mb-7">Sign up to receive news and updates.</p>
        {subscribed ? (
          <p className="text-green-400 font-semibold animate-pulse">🎉 Thanks for subscribing!</p>
        ) : (
          <div className="flex max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none rounded-l bg-white/8 border-white/12 text-white placeholder:text-white/35 focus-visible:ring-0 focus-visible:border-amber-500"
            />
            <Button
              onClick={handleSubscribe}
              className="rounded-none rounded-r bg-amber-500 hover:bg-amber-400 text-stone-900 text-[11px] font-bold tracking-widest uppercase px-6"
            >
              Subscribe
            </Button>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-950 px-[5%] pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-10">
          <div>
            <span className="font-serif italic font-bold text-lg text-white block mb-3">
              "<span className="text-amber-500">Your</span>" Pizza Shop Largo
            </span>
            <p className="text-white/40 text-sm leading-relaxed">
              1200 8th Ave SW, Largo FL 33770
              <br />yourpizzashop@gmail.com
              <br />(727) 581-1101
            </p>
          </div>
          <div>
            <h4 className="text-white/40 text-[10px] font-bold tracking-[0.18em] uppercase mb-4">Hours</h4>
            <ul className="text-white/55 text-sm space-y-1">
              <li>Monday — Closed</li>
              <li>Tue – Thu — 11am – 10pm</li>
              <li>Friday — 11am – 11pm</li>
              <li>Saturday — 11am – 10pm</li>
              <li>Sunday — 12pm – 9pm</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 text-[10px] font-bold tracking-[0.18em] uppercase mb-4">Navigate</h4>
            <ul className="text-white/55 text-sm space-y-2">
              {["About", "Menu", "Catering", "Contact Us", "Join Our Team", "FAQs"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-amber-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/8 mb-6" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© 2025 "Your" Pizza Shop Largo. All rights reserved.</p>
          <div className="flex gap-5">
            {["Facebook", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-white/35 hover:text-amber-400 text-xs font-bold tracking-widest uppercase transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
