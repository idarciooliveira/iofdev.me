/**
 * Shared theme module — port of clone/astro-paper/src/scripts/theme.ts,
 * adapted to this repo's tokens (data-theme attribute + #theme-toggle).
 *
 * Why this exists: <ClientRouter /> turns menubar navigations into
 * client-side swaps instead of full page loads. Component <script>s only
 * run once, so without the astro:after-swap / astro:before-swap hooks
 * below the toggle button goes dead after the first navigation and the
 * incoming document loses data-theme (falls back to light).
 */

const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

type Theme = "light" | "dark";
type ThemeWindow = Window & {
  __theme?: { value: Theme };
  __themeListenersBound?: boolean;
};

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === LIGHT || stored === DARK) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: Theme =
  (window as ThemeWindow).__theme?.value ?? getPreferredTheme();

function syncToggleUi(theme: Theme): void {
  const themeButton = document.getElementById("theme-toggle");
  if (!themeButton) return;
  const isDark = theme === DARK;
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Alternar para modo claro" : "Alternar para modo escuro",
  );
}

function reflect(): void {
  document.documentElement.setAttribute("data-theme", themeValue);
  syncToggleUi(themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // the browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  (window as ThemeWindow).__theme = { value: themeValue };
  reflect();
}

function setup(): void {
  reflect();
  const themeButton = document.getElementById("theme-toggle") as
    | (HTMLElement & { __themeBound?: boolean })
    | null;
  if (themeButton && !themeButton.__themeBound) {
    themeButton.__themeBound = true;
    themeButton.addEventListener("click", () => {
      themeValue = themeValue === LIGHT ? DARK : LIGHT;
      persist();
    });
  }
}

setup();

// Re-run after View Transitions navigation: the header DOM is swapped,
// so re-apply the theme and bind the fresh toggle button.
function onAfterSwap(): void {
  setup();
}

// Carry the theme across View Transitions so the incoming document already
// has the right data-theme before paint (prevents flash/reset to light),
// plus the theme-color value for the browser chrome.
function onBeforeSwap(event: Event): void {
  const newDocument = (event as unknown as { newDocument: Document })
    .newDocument;
  if (!newDocument) return;
  newDocument.documentElement.setAttribute("data-theme", themeValue);
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
}

function onSchemeChange({ matches }: MediaQueryListEvent): void {
  themeValue = matches ? DARK : LIGHT;
  persist();
}

// Guarded so a re-executed bundle can't pile up duplicate listeners.
const w = window as ThemeWindow;
if (!w.__themeListenersBound) {
  w.__themeListenersBound = true;
  document.addEventListener("astro:after-swap", onAfterSwap);
  document.addEventListener("astro:before-swap", onBeforeSwap);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onSchemeChange);
}
