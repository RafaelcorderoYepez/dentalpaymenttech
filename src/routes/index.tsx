import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileChartColumn,
  Gauge,
  Headset,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Presentation,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { SiteFooter, SiteHeader, SavingsDialog } from "@/components/site";
import { Button } from "@/components/ui/button";
import dentalOffice from "@/assets/dental-office.jpg";
import surchargeProgramImage from "@/assets/home-surcharge-program.jpg";
import lowDebitRatesImage from "@/assets/home-low-debit-rates.jpg";
import nextDayFundingImage from "@/assets/home-next-day-funding.jpg";
import hsaFsaReadyImage from "@/assets/home-hsa-fsa-ready.jpg";
import paymentLinksImage from "@/assets/home-payment-links.jpg";
import paymentTerminal from "@/assets/clover-flex-device.png";

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
  { icon: CircleDollarSign, image: surchargeProgramImage, imageAlt: "Patient making a contactless payment at a dental office", title: "Surcharge Program", description: "Pass credit card fees legally and easily" },
  { icon: CreditCard, image: lowDebitRatesImage, imageAlt: "Patient using a debit card at a dental office terminal", title: "Low Debit Rates", description: "Keep costs low on debit transactions" },
  { icon: Zap, image: nextDayFundingImage, imageAlt: "Dental practice manager reviewing improved cash flow", title: "Next-Day Funding", description: "Improve your cash flow" },
  { icon: HeartPulse, image: hsaFsaReadyImage, imageAlt: "Patient using a health benefits card for dental care", title: "HSA/FSA Ready", description: "Accept HSA/FSA payments with ease" },
  { icon: Smartphone, image: paymentLinksImage, imageAlt: "Patient completing a dental payment securely by phone", title: "Payment Links", description: "Collect balances anytime, anywhere" },
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

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

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
              <SavingsDialog trigger={<Button variant="hero" size="lg" className="px-5 sm:px-8">See how much you could save <ArrowRight /></Button>} />
              <Button asChild variant="outline" size="lg" className="px-5 sm:px-8"><a href="tel:+15614549475"><Phone /> Call Sales</a></Button>
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
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
            {features.map(({ icon: Icon, image, imageAlt, title, description }) => (
              <article key={title} className="group min-w-0 overflow-hidden rounded-lg border border-border bg-card text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float last:col-span-2 last:mx-auto last:w-full last:max-w-[280px] lg:last:col-span-1 lg:last:max-w-none">
                <div className="relative aspect-[4/3] overflow-hidden bg-mint">
                  <img src={image} alt={imageAlt} width={944} height={704} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full border-2 border-card bg-accent text-accent-foreground shadow-card sm:size-12"><Icon size={23} strokeWidth={2.2} /></span>
                </div>
                <div className="p-4 sm:p-5 lg:px-3">
                  <h3 className="text-base font-extrabold leading-tight text-primary sm:text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
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
                { icon: Phone, title: "Phone", lines: ["Sales", "(954) 451-6808"], href: "tel:+15614549475" },
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

      <SiteFooter />
    </main>
  );
}
