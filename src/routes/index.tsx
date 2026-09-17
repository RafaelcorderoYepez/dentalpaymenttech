import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ChartNoAxesCombined,
  CircleDollarSign,
  ContactRound,
  CreditCard,
  FileChartColumn,
  Gauge,
  Headset,
  HeartPulse,
  Landmark,
  Link2,
  Mail,
  MapPin,
  Clock,
  Phone,
  Presentation,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dentalOffice from "@/assets/dental-office.jpg";
import paymentTerminal from "@/assets/clover-flex-device.png";
import capitalLogo from "@/assets/capital-paymenttech-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Payment Solutions | DentalPaymentTech" },
      { name: "description", content: "Lower processing costs and offer modern patient payment options with DentalPaymentTech's dental payment solutions." },
      { property: "og:title", content: "A Healthier Way to Get Paid | DentalPaymentTech" },
      { property: "og:description", content: "Payment solutions built specifically for dental practices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: CircleDollarSign, title: "Surcharge Program", description: "Pass credit card fees legally and easily" },
  { icon: CreditCard, title: "Low Debit Rates", description: "Keep costs low on debit transactions" },
  { icon: Zap, title: "Next-Day Funding", description: "Improve your cash flow" },
  { icon: HeartPulse, title: "HSA/FSA Ready", description: "Accept HSA/FSA payments with ease" },
  { icon: Smartphone, title: "Payment Links", description: "Collect balances anytime, anywhere" },
];

const benefits = [
  { icon: CalendarClock, title: "Recurring Payments", description: "Ideal for treatment plans and orthodontics" },
  { icon: Headset, title: "Chargeback Assistance", description: "We help you when disputes happen" },
  { icon: WalletCards, title: "Card-on-File", description: "Secure, easy, and convenient" },
  { icon: Presentation, title: "Staff Training Included", description: "For a smooth implementation" },
  { icon: Mail, title: "Patient Balance Recovery Tools", description: "Help collect outstanding balances" },
  { icon: FileChartColumn, title: "Quarterly Statement Review", description: "Ensure you're always getting the best rates" },
  { icon: UsersRound, title: "Dedicated Account Manager", description: "Personal support, not a call center" },
  { icon: BarChart3, title: "Annual Savings Report", description: "See exactly how much you've saved" },
];

const values = [
  { icon: ChartNoAxesCombined, title: "More Savings", description: "Keep more of what you earn" },
  { icon: UsersRound, title: "Happier Patients", description: "Flexible, modern payment options" },
  { icon: Gauge, title: "A More Efficient Office", description: "Simple, integrated solutions" },
  { icon: BarChart3, title: "A Stronger Practice", description: "Built for growth" },
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  practice: z.string().trim().min(2, "Please enter your practice name.").max(120),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24),
});

function BrandLockup() {
  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-5" aria-label="Capital PaymentTech and Clover PracticePay">
      <img
        src={capitalLogo.url}
        alt="Capital PaymentTech logo"
        className="h-9 w-auto max-w-[180px] object-contain sm:h-11 lg:h-16 lg:max-w-[270px]"
      />
      <span className="h-11 w-px shrink-0 bg-border" />
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-9 shrink-0 grid-cols-2 gap-0.5 sm:size-11">{[0,1,2,3].map((n) => <i key={n} className="rounded-[45%] bg-accent" />)}</span>
        <span className="min-w-0 leading-none"><strong className="block truncate text-lg font-extrabold text-foreground sm:text-2xl">clover</strong><span className="text-xs font-semibold text-accent sm:text-sm">PracticePay</span></span>
      </div>
    </div>
  );
}

function SavingsDialog({ trigger }: { trigger: React.ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setErrors({}); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] overflow-y-auto border-border bg-card p-0 shadow-float sm:max-w-xl">
        {submitted ? (
          <div className="px-6 py-14 text-center sm:px-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><ShieldCheck size={34} /></span>
            <DialogTitle className="mt-6 text-3xl font-extrabold text-primary">Request received</DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-base leading-relaxed">Thank you. Patrick will contact you soon to arrange your complimentary savings analysis.</DialogDescription>
          </div>
        ) : (
          <>
            <div className="bg-primary px-6 py-7 text-primary-foreground sm:px-8">
              <DialogHeader>
                <DialogTitle className="pr-8 text-2xl font-extrabold">Request your free savings analysis</DialogTitle>
                <DialogDescription className="mt-2 text-primary-foreground/75">Tell us about your practice. There is no cost or obligation.</DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={submit} className="grid gap-5 px-6 py-7 sm:grid-cols-2 sm:px-8" noValidate>
              {([
                ["name", "Your name", "Jordan Smith", "text"],
                ["practice", "Practice name", "Bright Smiles Dental", "text"],
                ["email", "Work email", "jordan@practice.com", "email"],
                ["phone", "Phone number", "(555) 555-0123", "tel"],
              ] as const).map(([id, label, placeholder, type]) => (
                <div className="grid gap-2" key={id}>
                  <Label htmlFor={id}>{label}</Label>
                  <Input id={id} name={id} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-error` : undefined} className="h-11" />
                  {errors[id] && <p id={`${id}-error`} className="text-xs font-medium text-destructive">{errors[id]}</p>}
                </div>
              ))}
              <Button type="submit" size="lg" variant="hero" className="mt-1 w-full sm:col-span-2">Request my analysis <ArrowRight /></Button>
              <p className="text-center text-xs text-muted-foreground sm:col-span-2">Your information will only be used to respond to this request.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="relative z-10 border-b border-border/60 bg-card/95">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <BrandLockup />
          <SavingsDialog trigger={<Button variant="hero" className="hidden sm:inline-flex">Free savings analysis <ArrowRight /></Button>} />
          <SavingsDialog trigger={<Button variant="hero" size="icon" className="sm:hidden" aria-label="Request free savings analysis"><ArrowRight /></Button>} />
        </div>
      </header>

      <section className="relative isolate min-h-[660px] overflow-hidden lg:min-h-[690px]">
        <img src={dentalOffice} alt="Bright modern dental treatment room" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_96%,transparent)_38%,color-mix(in_oklab,var(--background)_30%,transparent)_68%,transparent_100%)]" />
        <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center px-4 py-14 sm:px-6 lg:min-h-[690px] lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="rise-in max-w-3xl self-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-mint px-3 py-1.5 text-xs font-bold uppercase text-accent sm:text-sm"><Sparkles size={16} /> Purpose-built for dental practices</div>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.96] text-primary sm:text-6xl lg:text-7xl">A healthier way to <span className="text-accent">get paid</span></h1>
            <p className="mt-6 max-w-xl text-xl font-medium leading-snug text-foreground sm:text-2xl">Complete payment solutions for modern dental practices</p>
            <div className="my-6 h-1 w-20 rounded-full bg-accent" />
            <p className="max-w-xl text-lg leading-relaxed text-navy-soft sm:text-xl">Lower processing costs. Better patient payment options. A stronger practice.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SavingsDialog trigger={<Button variant="hero" size="lg">See how much you could save <ArrowRight /></Button>} />
              <Button asChild variant="outline" size="lg"><a href="tel:+15614549475"><Phone /> Call Sales</a></Button>
            </div>
          </div>
          <div className="rise-in rise-in-delay mt-auto flex flex-col items-end gap-5 pb-3 lg:mt-0 lg:self-end lg:pb-10">
            <p className="hidden max-w-[240px] rotate-[-3deg] text-center font-script text-4xl leading-none text-accent lg:block">Healthy Smiles<br />Stronger Practices</p>
            <div className="w-full max-w-xl rounded-lg border border-accent/15 bg-mint/95 p-5 shadow-float backdrop-blur-sm sm:p-6">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground sm:size-20"><ShieldCheck size={38} /></span>
                <div className="min-w-0"><p className="text-2xl font-black uppercase leading-none text-accent sm:text-3xl">Dental Savings Guarantee</p><p className="mt-2 text-sm font-medium text-navy-soft sm:text-base">See how much your practice could save.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="bg-card py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="sr-only">Payment features</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-5">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="group text-center last:col-span-2 last:mx-auto last:max-w-[220px] md:last:col-span-1 md:last:max-w-none">
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-mint text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:size-24"><Icon size={40} strokeWidth={2.2} /></span>
                <h3 className="mt-5 text-lg font-extrabold leading-tight text-primary sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <div>
            <div className="mb-9 flex items-center gap-4"><h2 className="text-2xl font-black uppercase text-accent sm:text-3xl">Additional benefits for your practice</h2><span className="hidden h-0.5 flex-1 bg-accent/60 sm:block" /></div>
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article key={title} className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-md border border-border bg-card text-primary shadow-card transition-colors group-hover:border-accent group-hover:text-accent"><Icon size={26} /></span>
                  <div><h3 className="font-extrabold text-primary">{title}</h3><p className="mt-1 leading-snug text-muted-foreground">{description}</p></div>
                </article>
              ))}
            </div>
          </div>
          <aside className="relative min-h-[520px] overflow-hidden rounded-lg bg-card shadow-card">
            <img src={paymentTerminal} alt="Clover Flex payment terminal in a modern dental office" width={928} height={1152} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--card)_0%,color-mix(in_oklab,var(--card)_88%,transparent)_24%,transparent_58%)]" />
            <div className="relative p-7 sm:p-8"><h2 className="max-w-xs text-4xl font-black leading-none text-primary">Complimentary Equipment</h2><p className="mt-4 max-w-[240px] text-xl text-navy-soft">Clover devices at no upfront cost</p></div>
            <p className="absolute bottom-6 right-6 max-w-[220px] rotate-[-4deg] text-right font-script text-3xl leading-none text-accent">Payments Made Simple for a Healthier Tomorrow</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-mint py-10">
        <h2 id="values-heading" className="sr-only">The value for your practice</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {values.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 ${index ? "lg:border-l lg:border-accent/20 lg:pl-8" : ""}`}>
              <Icon className="shrink-0 text-accent" size={42} strokeWidth={2.3} />
              <div><h3 className="text-sm font-black uppercase text-primary sm:text-base">{title}</h3><p className="mt-1 text-sm leading-snug text-navy-soft">{description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-accent">We'd love to hear from you</p>
            <h2 id="contact-heading" className="mt-2 text-3xl font-black uppercase text-primary sm:text-4xl">Contact Us</h2>
            <p className="mt-3 text-navy-soft">Questions about payments for your dental practice? Reach out — we're here to help.</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: MapPin, title: "Address", lines: ["8185 Via Ancho Rd #880396", "Boca Raton, FL 33488"], href: "https://www.google.com/maps/search/?api=1&query=8185+Via+Ancho+Rd+%23880396+Boca+Raton+FL+33488" },
                { icon: Clock, title: "Hours", lines: ["Monday – Friday", "9:00 AM – 6:00 PM EST"] },
                { icon: Phone, title: "Phone", lines: ["Sales", "561-454-9475"], href: "tel:+15614549475" },
                { icon: Mail, title: "Email", lines: ["contact@dentalpaymenttech.com"], href: "mailto:contact@dentalpaymenttech.com" },
              ].map(({ icon: Icon, title, lines, href }) => (
                <article key={title} className="rounded-lg bg-card p-6 shadow-card transition-shadow hover:shadow-float">
                  <span className="grid size-12 place-items-center rounded-full bg-accent/10 text-accent"><Icon size={22} /></span>
                  <h3 className="mt-4 text-sm font-black uppercase text-primary">{title}</h3>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="mt-2 block text-sm leading-relaxed text-navy-soft transition-colors hover:text-accent">
                      {lines.map((line) => <span key={line} className="block">{line}</span>)}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-navy-soft">{lines.map((line) => <span key={line} className="block">{line}</span>)}</p>
                  )}
                </article>
              ))}
            </div>
            <div className="overflow-hidden rounded-lg shadow-card">
              <iframe
                title="Map: DentalPaymentTech, 8185 Via Ancho Rd, Boca Raton, FL"
                src="https://www.google.com/maps?q=8185%20Via%20Ancho%20Rd%20Boca%20Raton%20FL%2033433&output=embed"
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-11 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_auto]">
            <SavingsDialog trigger={<Button variant="footer" size="lg" className="h-auto w-full justify-start py-4 text-left sm:w-auto sm:text-lg"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15"><Phone /></span><span>Request your free savings analysis</span><ArrowRight className="ml-auto" /></Button>} />
            <div className="lg:border-l lg:border-primary-foreground/20 lg:pl-10"><p className="text-lg font-bold text-accent">Sales</p><a href="tel:+15614549475" className="text-3xl font-extrabold transition-colors hover:text-accent">(954) 451-6808</a></div>
            <p className="max-w-[220px] font-script text-3xl leading-none text-accent">Partners in a Healthier Tomorrow</p>
          </div>
          <div className="mt-9 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs font-semibold uppercase text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between"><span>DentalPaymentTech.com</span><span>Payments &nbsp; | &nbsp; People &nbsp; | &nbsp; Practices &nbsp; | &nbsp; Brighter Tomorrows</span></div>
        </div>
      </footer>
    </main>
  );
}
