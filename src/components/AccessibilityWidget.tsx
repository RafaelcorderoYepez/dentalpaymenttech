import { useEffect, useState } from "react";
import { Accessibility, X, Type, Contrast, Droplet, Link2, RotateCcw, Minus, Plus, Sun, Moon, BookOpen } from "lucide-react";

const STYLE_ID = "a11y-widget-styles";

function ensureStyleTag() {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

type Opts = {
  grayscale: boolean;
  highContrast: boolean;
  negativeContrast: boolean;
  lightBackground: boolean;
  underline: boolean;
  readableFont: boolean;
};

function applyStyles(opts: Opts) {
  const rules: string[] = [];
  const filters: string[] = [];
  if (opts.grayscale) filters.push("grayscale(100%)");
  if (opts.negativeContrast) filters.push("invert(100%) hue-rotate(180deg)");
  if (filters.length) {
    rules.push(`html { filter: ${filters.join(" ")} !important; }`);
    rules.push(`html img, html video, html picture, html iframe { filter: invert(100%) hue-rotate(180deg) !important; }`);
    if (!opts.negativeContrast) {
      // no image inversion needed for pure grayscale
      rules.push(`html img, html video, html picture, html iframe { filter: none !important; }`);
    }
  }
  if (opts.highContrast) {
    rules.push(`
      html.a11y-high-contrast, html.a11y-high-contrast body { background: #000 !important; color: #ffff00 !important; }
      html.a11y-high-contrast *:not(svg):not(path):not(.a11y-widget-ui):not(.a11y-widget-ui *) { background-color: #000 !important; color: #ffff00 !important; border-color: #ffff00 !important; }
      html.a11y-high-contrast a:not(.a11y-widget-ui):not(.a11y-widget-ui *) { color: #ffffff !important; }
      html.a11y-high-contrast img, html.a11y-high-contrast video { filter: grayscale(50%) contrast(1.1); }
      html.a11y-high-contrast .a11y-widget-ui > div { background-color: #ffffff !important; color: #0f172a !important; border-color: #cbd5e1 !important; }
      html.a11y-high-contrast .a11y-widget-ui > div * { color: #0f172a !important; border-color: #e2e8f0 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-100 { background-color: #f1f5f9 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-900 { background-color: #0f172a !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-900, html.a11y-high-contrast .a11y-widget-ui .bg-slate-900 * { color: #ffffff !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-50 { background-color: #eff6ff !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-50, html.a11y-high-contrast .a11y-widget-ui .bg-blue-50 * { color: #1e40af !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-600 { background-color: #2563eb !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-300 { background-color: #cbd5e1 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-white { background-color: #ffffff !important; }
      html.a11y-high-contrast .a11y-widget-ui > button[aria-label="Open accessibility menu"] { background-color: #2563eb !important; color: #ffffff !important; border-color: #2563eb !important; box-shadow: 0 0 0 3px #ffff00 !important; }
    `);
  }
  if (opts.lightBackground) {
    rules.push(`
      html.a11y-light-bg, html.a11y-light-bg body { background: #ffffff !important; color: #111111 !important; }
      html.a11y-light-bg *:not(svg):not(path):not(img):not(video):not(.a11y-widget-ui):not(.a11y-widget-ui *) { background-color: #ffffff !important; background-image: none !important; color: #111111 !important; border-color: #d1d5db !important; }
      html.a11y-light-bg a:not(.a11y-widget-ui):not(.a11y-widget-ui *) { color: #1d4ed8 !important; }
    `);
  }
  if (opts.underline) {
    rules.push(`a { text-decoration: underline !important; }`);
  }
  if (opts.readableFont) {
    rules.push(`
      html.a11y-readable-font, html.a11y-readable-font *:not(.a11y-widget-ui):not(.a11y-widget-ui *) {
        font-family: Arial, Helvetica, sans-serif !important;
        letter-spacing: 0.02em !important;
        line-height: 1.6 !important;
      }
    `);
  }
  ensureStyleTag().textContent = rules.join("\n");
  document.documentElement.classList.toggle("a11y-high-contrast", opts.highContrast);
  document.documentElement.classList.toggle("a11y-light-bg", opts.lightBackground);
  document.documentElement.classList.toggle("a11y-readable-font", opts.readableFont);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [negativeContrast, setNegativeContrast] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  useEffect(() => {
    applyStyles({ grayscale, highContrast, negativeContrast, lightBackground, underline, readableFont });
  }, [grayscale, highContrast, negativeContrast, lightBackground, underline, readableFont]);

  const reset = () => {
    setFontScale(100);
    setGrayscale(false);
    setHighContrast(false);
    setNegativeContrast(false);
    setLightBackground(false);
    setUnderline(false);
    setReadableFont(false);
    document.documentElement.style.fontSize = "";
    ensureStyleTag().textContent = "";
    document.documentElement.classList.remove("a11y-high-contrast", "a11y-light-bg", "a11y-readable-font");
  };

  // Mutually exclusive contrast/background modes
  const toggleHighContrast = () => {
    setHighContrast((v) => {
      const nv = !v;
      if (nv) { setNegativeContrast(false); setLightBackground(false); }
      return nv;
    });
  };
  const toggleNegativeContrast = () => {
    setNegativeContrast((v) => {
      const nv = !v;
      if (nv) { setHighContrast(false); setLightBackground(false); }
      return nv;
    });
  };
  const toggleLightBackground = () => {
    setLightBackground((v) => {
      const nv = !v;
      if (nv) { setHighContrast(false); setNegativeContrast(false); }
      return nv;
    });
  };

  return (
    <div className="a11y-widget-ui fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 max-h-[80vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 text-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Accessibility</h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-slate-100"
              aria-label="Close accessibility menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-2">
              <span className="flex items-center gap-2 text-sm"><Type className="h-4 w-4" /> Text size</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFontScale((s) => Math.max(80, s - 10))}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200"
                  aria-label="Decrease text size"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs w-10 text-center">{fontScale}%</span>
                <button
                  onClick={() => setFontScale((s) => Math.min(160, s + 10))}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200"
                  aria-label="Increase text size"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <ToggleRow icon={<Droplet className="h-4 w-4" />} label="Grayscale" active={grayscale} onClick={() => setGrayscale((v) => !v)} />
            <ToggleRow icon={<Contrast className="h-4 w-4" />} label="High contrast" active={highContrast} onClick={toggleHighContrast} />
            <ToggleRow icon={<Moon className="h-4 w-4" />} label="Negative contrast" active={negativeContrast} onClick={toggleNegativeContrast} />
            <ToggleRow icon={<Sun className="h-4 w-4" />} label="Light background" active={lightBackground} onClick={toggleLightBackground} />
            <ToggleRow icon={<Link2 className="h-4 w-4" />} label="Underline links" active={underline} onClick={() => setUnderline((v) => !v)} />
            <ToggleRow icon={<BookOpen className="h-4 w-4" />} label="Readable font" active={readableFont} onClick={() => setReadableFont((v) => !v)} />

            <button
              onClick={reset}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white text-sm py-2 hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open accessibility menu"
        aria-expanded={open}
      >
        <Accessibility className="h-6 w-6" />
      </button>
    </div>
  );
}

function ToggleRow({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between rounded-lg border p-2 text-sm transition ${
        active ? "bg-blue-50 border-blue-300 text-blue-800" : "border-slate-200 hover:bg-slate-50"
      }`}
      aria-pressed={active}
    >
      <span className="flex items-center gap-2">{icon} {label}</span>
      <span className={`h-4 w-7 rounded-full relative ${active ? "bg-blue-600" : "bg-slate-300"}`}>
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${active ? "left-3.5" : "left-0.5"}`} />
      </span>
    </button>
  );
}
