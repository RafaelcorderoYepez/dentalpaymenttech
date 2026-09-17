import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  Nfc,
  FileCheck2,
  HeartPulse,
  MonitorSmartphone,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  WalletCards,
  Wrench,
} from "lucide-react";
import { z } from "zod";
import { SiteFooter, SiteHeader } from "@/components/site";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import cloverFlex from "@/assets/clover-flex-device.png";
import cloverMini from "@/assets/clover-mini-device.png";
import contactlessPayments from "@/assets/practicepay-contactless.jpg";
import paymentOptions from "@/assets/practicepay-payment-options.jpg";
import pmsSync from "@/assets/practicepay-pms-sync.jpg";
import chairsideCheckout from "@/assets/practicepay-chairside-checkout.jpg";
import treatmentFinancing from "@/assets/practicepay-treatment-financing.jpg";
import textToPay from "@/assets/practicepay-text-to-pay.jpg";
import ledgerPosting from "@/assets/practicepay-ledger-posting.jpg";
import flexibleReception from "@/assets/practicepay-flexible-reception.jpg";
import rapidDeposit from "@/assets/practicepay-rapid-deposit.jpg";
import officeManagement from "@/assets/practicepay-office-management.jpg";

export const Route = createFileRoute("/practicepay")({
  head: () => ({
    meta: [
      { title: "Clover PracticePay for Dental Practices | DentalPaymentTech" },
      { name: "description", content: "Streamline patient payments and collections for your dental office with Clover PracticePay — chairside checkout, treatment plan financing, and PMS auto-sync." },
      { property: "og:title", content: "Clover PracticePay for Dental Practices | DentalPaymentTech" },
      { property: "og:description", content: "A unified payment solution built for general dentistry, orthodontics, and specialty dental clinics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticePayPage,
});

const highlights = [
  { image: contactlessPayments, icon: Nfc, title: "Dental HSA/FSA & Contactless Payments", description: "Tap-to-Pay, Apple Pay, and health savings cards accepted everywhere in your office.", alt: "Dental receptionist accepting a contactless patient payment" },
  { image: paymentOptions, icon: WalletCards, title: "Treatment Plan Payment Options & Card-on-File", description: "Flexible installments and securely vaulted cards for ongoing dental care.", alt: "Dental care coordinator reviewing flexible payment options with a patient" },
  { image: pmsSync, icon: RefreshCcw, title: "Seamless EHR & Dental PMS Auto-Syncing", description: "Payments post straight into your practice management software — no double entry.", alt: "Dental office manager using an integrated patient payment dashboard" },
];

const advantages = [
  { image: chairsideCheckout, icon: Stethoscope, title: "Chairside & Exam Room Checkout", description: "Collect deductibles, copays, or cosmetic balance payments right from the dental chair using mobile devices.", alt: "Dental assistant collecting a chairside payment from a patient" },
  { image: treatmentFinancing, icon: CalendarCheck2, title: "Dental Treatment Financing & Plans", description: "Offer recurring monthly payment arrangements for large procedures like implants, aligners, and crowns.", alt: "Dental coordinator reviewing a treatment financing plan with a patient" },
  { image: textToPay, icon: Smartphone, title: "Instant Text-to-Pay for Unpaid Statements", description: "Send automated SMS payment links for balance remainders directly to patient smartphones.", alt: "Patient completing a secure dental payment from a smartphone" },
  { image: ledgerPosting, icon: FileCheck2, title: "Direct Ledger Posting", description: "Automatically reconcile patient payments back into your Dental Practice Management System (PMS) without double entry.", alt: "Dental administrator reviewing an automatically posted patient payment" },
];

const transparencyPoints = [
  { icon: FileCheck2, text: "Present clear out-of-pocket estimates before major restorative or orthodontic work." },
  { icon: ShieldCheck, text: "Secure patient card-on-file with HIPAA-compliant encryption prior to appointments." },
  { icon: CalendarCheck2, text: "Reduce no-shows and late cancellations with automated deposit collection." },
];

const hardware = [
  { image: cloverFlex, alt: "Clover Flex portable wireless payment terminal in a dental office", name: "Clover Flex", description: "Portable wireless terminal ideal for chairside checkout, hygienist stations, or quick front-desk handoffs. Touchscreen display with built-in receipt printer." },
  { image: cloverMini, alt: "Clover Mini countertop payment terminal at a dental front desk", name: "Clover Mini", description: "Sleek front-desk patient-facing screen. Allows patients to review itemized dental treatments, sign consent forms or receipts, and pay with contactless tap or chip." },
];

const specialties = ["General Dentistry", "Pediatric Dentistry", "Orthodontics", "Periodontics & Endodontics", "Oral Surgery"];

const faqs = [
  {
    q: "Does Clover PracticePay sync with dental practice management software (PMS)?",
    a: "Yes! PracticePay interfaces directly with top dental software platforms. Payments auto-post straight into the patient ledger, cutting down on manual front-desk work.",
  },
  {
    q: "Can patients pay using HSA/FSA cards or set up payment plans for expensive dental work?",
    a: "Absolutely. The system accepts all major credit/debit cards, HSA and FSA cards, Apple Pay, Google Pay, as well as customizable recurring payment plans for crowns, implants, or braces.",
  },
  {
    q: "Is the checkout process HIPAA compliant?",
    a: "Yes. All patient financial data, card-on-file vaulting, and transaction records follow strict HIPAA data protection and PCI compliance standards.",
  },
];

const quoteSchema = z.object({
  practice: z.string().trim().min(2, "Please enter your practice or clinic name.").max(120),
  name: z.string().trim().min(2, "Please enter your contact name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24),
  chairs: z.string().trim().min(1, "Please enter the number of chairs/op rooms.").max(10),
  software: z.string().trim().min(2, "Please enter your current dental software.").max(120),
});

const trustBadges = [
  { icon: BadgeCheck, label: "Authorized Clover Local Partner" },
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Wrench, label: "On-Site Installation & Support" },
];

const quoteFields = [
  ["practice", "Practice / Clinic Name", "Bright Smiles Dental", "text"],
  ["name", "Contact Name", "Jordan Smith", "text"],
  ["email", "Email", "jordan@practice.com", "email"],
  ["phone", "Phone", "(555) 555-0123", "tel"],
  ["chairs", "Number of Dental Chairs / Op Rooms", "e.g. 6", "text"],
  ["software", "Current Dental Software (EHR/PMS)", "e.g. Dentrix, Eaglesoft, Open Dental", "text"],
] as const;

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-slate-100 bg-card px-6 py-14 text-center shadow-sm sm:px-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><ShieldCheck size={34} /></span>
        <h3 className="mt-6 text-3xl font-extrabold text-primary">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">Thank you. Our local Clover team will reach out to schedule your personalized demo and quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-xl border border-slate-100 bg-card p-4 shadow-sm sm:grid-cols-2 sm:p-8">
      {quoteFields.map(([id, label, placeholder, type]) => (
        <div className="grid min-w-0 gap-2" key={id}>
          <Label htmlFor={`quote-${id}`}>{label}</Label>
          <Input id={`quote-${id}`} name={id} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `quote-${id}-error` : undefined} className="h-11 max-w-full" />
          {errors[id] && <p id={`quote-${id}-error`} className="text-xs font-medium text-destructive">{errors[id]}</p>}
        </div>
      ))}
      <Button type="submit" size="lg" variant="hero" className="mt-1 w-full px-5 sm:col-span-2 sm:px-8">Get Custom Dental Quote & Demo <ArrowRight /></Button>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:col-span-2">
        {trustBadges.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-soft"><Icon size={16} className="text-accent" /> {label}</span>
        ))}
      </div>
    </form>
  );
}

function PracticePayPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

      {/* 1. Hero */}
      <section className="bg-surface-soft py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-mint px-4 py-2 text-xs font-bold uppercase text-accent sm:text-sm"><Sparkles size={16} /> Powered by Clover PracticePay™ | HIPAA & Dental PMS Compliant</div>
            <h1 className="text-4xl font-black uppercase leading-[1.02] text-primary sm:text-5xl lg:text-6xl">Streamline Patient Payments & Collections for Your <span className="text-accent">Dental Office</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-soft sm:text-xl">A unified payment solution built for general dentistry, orthodontics, and specialty dental clinics. Accept copays, manage treatment plan financing, and auto-sync with your dental software.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg"><a href="#quote-form">Request Dental POS Quote <ArrowRight /></a></Button>
              <Button asChild variant="outline" size="lg"><a href="#dental-hardware"><MonitorSmartphone /> See Compatible Dental Hardware</a></Button>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {highlights.map(({ image, icon: Icon, title, description, alt }) => (
              <article key={title} className="group overflow-hidden rounded-xl border border-slate-100 bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden bg-surface-soft">
                  <img src={image} alt={alt} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="grid size-14 place-items-center rounded-full bg-mint text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"><Icon size={28} /></span>
                  <h2 className="mt-5 text-lg font-extrabold leading-tight text-primary">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Dental Practice Advantages */}
      <section aria-labelledby="advantages-heading" className="bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-script text-3xl text-accent">Power Your Dental Practice With One Platform</p>
          <h2 id="advantages-heading" className="mt-2 max-w-3xl text-3xl font-black uppercase text-primary sm:text-4xl">Designed for the Front Desk & Chairside Dental Checkout</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {advantages.map(({ image, icon: Icon, title, description, alt }) => (
              <article key={title} className="group overflow-hidden rounded-xl border border-slate-100 bg-background shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[3/2] overflow-hidden bg-surface-soft">
                  <img src={image} alt={alt} width={1200} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 p-6 sm:p-7">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mint text-accent transition-transform duration-300 group-hover:-translate-y-1"><Icon size={28} /></span>
                  <div><h3 className="text-lg font-extrabold text-primary">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{description}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Patient Transparency */}
      <section aria-labelledby="transparency-heading" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-script text-3xl text-accent">Create Upfront Confidence for Dental Procedures</p>
            <h2 id="transparency-heading" className="mt-2 text-3xl font-black uppercase text-primary sm:text-4xl">Upfront Cost Clarity Before Treatment Starts</h2>
            <ul className="mt-8 grid gap-5">
              {transparencyPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-accent"><Icon size={22} /></span>
                  <p className="pt-2 text-lg leading-snug text-navy-soft">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-100 bg-card p-7 shadow-sm sm:p-9">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <div><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Treatment estimate</p><p className="mt-1 text-xl font-extrabold text-primary">Porcelain Crown — Tooth #14</p></div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mint text-accent"><HeartPulse size={24} /></span>
            </div>
            <dl className="mt-5 grid gap-3 text-sm sm:text-base">
              {[
                ["Procedure total", "$1,450.00"],
                ["Insurance estimate", "− $725.00"],
                ["Deposit collected", "− $200.00"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between"><dt className="text-navy-soft">{label}</dt><dd className="font-bold text-foreground">{value}</dd></div>
              ))}
              <div className="mt-2 flex items-center justify-between rounded-lg bg-mint px-4 py-3"><dt className="font-extrabold text-primary">Patient balance today</dt><dd className="text-xl font-black text-accent">$525.00</dd></div>
            </dl>
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/20 bg-mint/60 px-4 py-3">
              <ShieldCheck size={22} className="shrink-0 text-accent" />
              <p className="text-sm font-semibold text-navy-soft">Card-on-file secured with HIPAA-compliant encryption</p>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-border px-4 py-3">
              <Banknote size={22} className="shrink-0 text-accent" />
              <p className="text-sm font-semibold text-navy-soft">3 monthly payments of $175.00 available</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Hardware */}
      <section id="dental-hardware" aria-labelledby="hardware-heading" className="bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="hardware-heading" className="max-w-3xl text-3xl font-black uppercase text-primary sm:text-4xl">Healthcare-Ready Hardware for <span className="text-accent">Front Desk & Treatment Rooms</span></h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {hardware.map(({ image, alt, name, description }) => (
              <article key={name} className="group overflow-hidden rounded-xl border border-slate-100 bg-background shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={image} alt={alt} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-black text-primary">{name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                  <Button asChild variant="outline" className="mt-5"><a href="#quote-form">Request Device Specs <ArrowRight /></a></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Practice Flexibility */}
      <section aria-labelledby="flexibility-heading" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden px-4 sm:px-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <div className="flex flex-col justify-center bg-card px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            <p className="font-script text-3xl text-accent">Financial flexibility for healthier growth</p>
            <h2 id="flexibility-heading" className="mt-2 text-3xl font-black uppercase leading-tight text-primary sm:text-4xl">
              Keep Your Dental Practice Moving Forward
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-soft">
              Give your practice more room to grow with convenient access to Clover Capital, faster deposits, and integrated business tools that help your team stay focused on patient care.
            </p>
          </div>
          <div className="grid min-w-0 sm:grid-cols-3">
            {[
              { image: flexibleReception, alt: "Dental receptionist helping a patient complete a payment" },
              { image: rapidDeposit, alt: "Dental practice manager confirming a successful deposit on a phone" },
              { image: officeManagement, alt: "Dental office manager reviewing practice performance tools" },
            ].map(({ image, alt }) => (
              <div key={alt} className="group aspect-[4/3] min-w-0 overflow-hidden sm:aspect-auto sm:min-h-[360px]">
                <img src={image} alt={alt} width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PMS Integration Stat Banner */}
      <section aria-labelledby="pms-heading" className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Seamless EHR/PMS Sync</p>
          <h2 id="pms-heading" className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">Reduce Payment Processing & Billing Admin Time by up to <span className="text-accent">70%</span></h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/80">Direct integration with major dental practice software eliminates manual ledger entry, prevents front-desk posting errors, and accelerates practice cash flow.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {specialties.map((specialty) => (
              <span key={specialty} className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-bold">{specialty}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section aria-labelledby="faq-heading" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-center text-3xl font-black uppercase text-primary sm:text-4xl">Frequently Asked <span className="text-accent">Questions</span></h2>
          <Accordion type="single" collapsible className="mt-10 grid gap-4">
            {faqs.map(({ q, a }, index) => (
              <AccordionItem key={q} value={`faq-${index}`} className="rounded-xl border border-slate-100 bg-card px-6 shadow-sm transition-shadow hover:shadow-md">
                <AccordionTrigger className="py-5 text-left text-base font-extrabold text-primary hover:text-accent sm:text-lg">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-navy-soft">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 8. CTA / Consultation Form */}
      <section id="quote-form" aria-labelledby="quote-heading" className="bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 id="quote-heading" className="text-3xl font-black uppercase text-primary sm:text-4xl">Upgrade Payment Processing for Your <span className="text-accent">Dental Clinic</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-soft">Talk to our local Clover authorized support team for personalized setup, hardware installation, and staff training.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
