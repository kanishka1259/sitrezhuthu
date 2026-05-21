/**
 * Shared color contrast utilities for portfolio templates.
 * All functions are pure — no React dependency.
 */

/** Parse any 3/4/6/8-char hex string to [r,g,b] 0–255. Returns null on failure. */
function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }
  if (h.length === 6 || h.length === 8) {
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  return null;
}

/**
 * Returns the relative luminance (0–1) of a hex color.
 * Uses WCAG formula.
 */
export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  return rgb.reduce((lum, c, i) => {
    const s = c / 255;
    const linear = s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    return lum + linear * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

/**
 * Returns `'#fff'` or `'#111'` (or custom dark/light) depending on what
 * has better contrast against `bgHex`. Uses WCAG contrast ratio.
 */
export function contrastColor(
  bgHex: string,
  light = '#ffffff',
  dark = '#111111'
): string {
  const lum = luminance(bgHex);
  // White on dark bg: contrast = (1 + 0.05) / (lum + 0.05)
  // Dark on light bg: contrast = (lum + 0.05) / (0 + 0.05)
  const contrastLight = (1.05) / (lum + 0.05);
  const contrastDark  = (lum + 0.05) / (0.05);
  return contrastLight >= contrastDark ? light : dark;
}

/**
 * Returns true if the hex color is "dark" (luminance < 0.35).
 * Useful for picking text / icon colors over a given background.
 */
export function isDark(hex: string): boolean {
  return luminance(hex) < 0.35;
}

/**
 * Returns a semi-transparent version of `hex` at `alpha` (0–1).
 * Works by appending an alpha hex byte.
 */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  if (h.length === 6) return `#${h}${a}`;
  return hex; // fallback for non-hex
}
