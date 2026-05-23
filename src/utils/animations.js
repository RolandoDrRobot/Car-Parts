// CarParts Animation System
// Theme: mechanical precision, diagnostic scanner
// Feel: quick, directional, no bounce — like a system reading data

const EASE = [0.25, 0.1, 0.25, 1];

// ── Variants ──────────────────────────────────────────────────────────

// Applied to .container — staggered screen entrance
export const screen = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE, staggerChildren: 0.075 },
  },
};

// Section block (header, vehicle row, CTA area)
export const section = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.26, ease: EASE } },
};

// Section that also staggered its own children (e.g. history, listings)
export const sectionStagger = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: EASE, staggerChildren: 0.065 },
  },
};

// List item — slides from left (scanner readout feel)
export const item = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: EASE } },
};

// Badge / severity chip — scale in like a dial
export const badge = {
  initial: { opacity: 0, scale: 0.78 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: EASE } },
};

// ── Interactive states ─────────────────────────────────────────────────

// Standard button
export const btn = {
  whileHover: { scale: 1.02 },
  whileTap:   { scale: 0.97 },
};

// Primary scan/action button — activates a red glow on tap
export const scanBtn = {
  whileHover: { scale: 1.02, boxShadow: '0 8px 28px rgba(239,68,68,0.55)' },
  whileTap:   { scale: 0.97, boxShadow: '0 0 0 8px rgba(239,68,68,0.18)' },
};

// Gear / icon button — rotates 45° on hover (mechanical feel)
export const gearBtn = {
  whileHover: { scale: 1.08, rotate: 45 },
  whileTap:   { scale: 0.9, rotate: 0 },
  transition: { type: 'tween', duration: 0.22, ease: EASE },
};

// Back / navigation button
export const backBtn = {
  whileHover: { x: -4 },
  whileTap:   { opacity: 0.6 },
};

// Selectable card (country, vehicle)
export const selectable = {
  whileHover: { scale: 1.03 },
  whileTap:   { scale: 0.96 },
};
