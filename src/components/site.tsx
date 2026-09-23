import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leads.functions";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
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
import capitalLogo from "@/assets/capital-paymenttech-logo.png.asset.json";

export function BrandLockup() {
  return (
    <div className="flex min-w-0 items-center" aria-label="Capital PaymentTech">
      <img
        src={capitalLogo.url}
        alt="Capital PaymentTech logo"
        className="h-9 w-auto max-w-[180px] object-contain sm:h-11 lg:h-20 lg:max-w-[320px]"
      />
    </div>
  );
}

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  practice: z.string().trim().min(2, "Please enter your practice name.").max(120),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24),
});

const dialogFields = [
  ["name", "Your name", "Jordan Smith", "text"],
  ["practice", "Practice name", "Bright Smiles Dental", "text"],
  ["email", "Work email", "jordan@practice.com", "email"],
  ["phone", "Phone number", "(555) 555-0123", "tel"],
] as const;

export function SavingsDialog({ trigger }: { trigger: React.ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const values = parsed.data as Record<string, string>;
      const res = await submitLead({
        data: {
          formName: "Free Savings Analysis",
          fields: dialogFields.map(([id, label]) => ({ label, value: String(values[id] ?? "") })),
          replyTo: values['email'],
        },
      });
      if (!res.ok) throw new Error(res.reason);
      setSubmitted(true);
    } catch {
      setErrors({ form: "We couldn't send your request. Please call us or try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setErrors({}); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] overflow-y-auto border-border bg-card p-0 shadow-float sm:max-w-xl">
        {submitted ? (
          <div className="px-4 py-14 text-center sm:px-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><ShieldCheck size={34} /></span>
            <DialogTitle className="mt-6 text-3xl font-extrabold text-primary">Request received</DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-base leading-relaxed">Thank you. Our team will contact you soon to arrange your complimentary savings analysis.</DialogDescription>
          </div>
        ) : (
          <>
            <div className="bg-primary px-4 py-7 text-primary-foreground sm:px-8">
              <DialogHeader>
                <DialogTitle className="pr-8 text-2xl font-extrabold">Request your free savings analysis</DialogTitle>
                <DialogDescription className="mt-2 text-primary-foreground/75">Tell us about your practice. There is no cost or obligation.</DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={submit} className="grid gap-5 px-4 py-7 sm:grid-cols-2 sm:px-8" noValidate>
              {dialogFields.map(([id, label, placeholder, type]) => (
                <div className="grid min-w-0 gap-2" key={id}>
                  <Label htmlFor={id}>{label}</Label>
                  <Input id={id} name={id} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-error` : undefined} className="h-11 max-w-full" />
                  {errors[id] && <p id={`${id}-error`} className="text-xs font-medium text-destructive">{errors[id]}</p>}
                </div>
              ))}
              {errors['form'] && <p className="text-sm font-medium text-destructive sm:col-span-2">{errors['form']}</p>}
              <Button type="submit" size="lg" variant="hero" disabled={sending} className="mt-1 w-full px-5 sm:col-span-2 sm:px-8">{sending ? "Sending..." : "Request my analysis"} <ArrowRight /></Button>
              <p className="text-center text-xs text-muted-foreground sm:col-span-2">Your information will only be used to respond to this request.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => setSpacerHeight(header.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);

    let lastScrollY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setVisible(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 64) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" style={{ height: spacerHeight }} />
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-card/95 backdrop-blur-md transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="DentalPaymentTech home" className="min-w-0"><BrandLockup /></Link>
          <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main navigation">
            <Link
              to="/practicepay"
              className="hidden text-sm font-bold text-primary transition-colors hover:text-accent md:inline-flex [&.active]:text-accent"
              activeOptions={{ exact: true }}
            >
              Clover PracticePay
            </Link>
            <SavingsDialog trigger={<Button variant="hero" className="hidden sm:inline-flex">Free savings analysis <ArrowRight /></Button>} />
            <SavingsDialog trigger={<Button variant="hero" size="icon" className="sm:hidden" aria-label="Request free savings analysis"><ArrowRight /></Button>} />
          </nav>
        </div>
        <div className="border-t border-border/50 bg-card md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            <Link
              to="/practicepay"
              className="text-sm font-bold text-primary transition-colors hover:text-accent [&.active]:text-accent"
              activeOptions={{ exact: true }}
            >
              Clover PracticePay
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-11 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_auto]">
          <SavingsDialog trigger={<Button variant="footer" size="lg" className="h-auto w-full justify-start gap-3 whitespace-normal px-4 py-4 text-left sm:w-auto sm:px-8 sm:text-lg"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15"><Phone /></span><span className="min-w-0 flex-1">Request your free savings analysis</span><ArrowRight className="ml-auto shrink-0" /></Button>} />
          <div className="min-w-0 lg:border-l lg:border-primary-foreground/20 lg:pl-10"><p className="text-lg font-bold text-accent">Sales</p><a href="tel:+19544516808" className="break-words text-2xl font-extrabold transition-colors hover:text-accent sm:text-3xl">(954) 451-6808</a></div>
          <p className="max-w-[220px] break-words font-script text-3xl leading-none text-accent">Partners in a Healthier Tomorrow</p>
        </div>
        <div className="mt-9 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs font-semibold uppercase text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Capital PaymentTech</span><span className="leading-relaxed">Payments &nbsp; | &nbsp; People &nbsp; | &nbsp; Practices &nbsp; | &nbsp; Brighter Tomorrows</span></div>
      </div>
    </footer>
  );
}
