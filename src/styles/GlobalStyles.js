import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --border-radius-tiny: 3px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
}

/* ── LIGHT MODE ── */
:root,
:root.light-mode {
  --color-grey-0: #ffffff;
  --color-grey-50: #f8fafc;
  --color-grey-100: #f1f5f9;
  --color-grey-200: #e2e8f0;
  --color-grey-300: #cbd5e1;
  --color-grey-400: #94a3b8;
  --color-grey-500: #64748b;
  --color-grey-600: #475569;
  --color-grey-700: #334155;
  --color-grey-800: #1e293b;
  --color-grey-900: #0f172a;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;
  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.14);
  --image-grayscale: 0;
  --image-opacity: 100%;
}

/* ── DARK MODE (Stitch Design) ── */
:root.dark-mode {
  --color-grey-0:   #111118;   /* card / sidebar bg      */
  --color-grey-50:  #0a0a12;   /* page background         */
  --color-grey-100: #1a1a28;   /* card border / divider   */
  --color-grey-200: #252538;   /* input bg                */
  --color-grey-300: #32324a;   /* muted border            */
  --color-grey-400: #5a5a7a;   /* placeholder text        */
  --color-grey-500: #8080a0;   /* secondary text          */
  --color-grey-600: #a0a0c0;   /* label text              */
  --color-grey-700: #c8c8e0;   /* body text               */
  --color-grey-800: #e0e0f0;   /* heading text            */
  --color-grey-900: #f0f0fa;   /* primary text            */

  --color-blue-100: #0c2340;
  --color-blue-700: #60b8f8;
  --color-green-100: #0a2e1a;
  --color-green-700: #4ade80;
  --color-yellow-100: #2e1f04;
  --color-yellow-700: #fbbf24;
  --color-silver-100: #1e1e30;
  --color-silver-700: #d1d5db;
  --color-indigo-100: #1e1b4b;
  --color-indigo-700: #a5b4fc;
  --color-red-100: #2d0c0c;
  --color-red-700: #f87171;
  --color-red-800: #fca5a5;

  --backdrop-color: rgba(0, 0, 0, 0.5);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.5);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.6);
  --image-grayscale: 10%;
  --image-opacity: 90%;
}

*,*::before,*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border-color 0.3s;
}

html { font-size: 62.5%; }

body {
  font-family: "Inter", "Poppins", sans-serif;
  color: var(--color-grey-700);
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  background-color: var(--color-grey-50);
  -webkit-font-smoothing: antialiased;
}

#root { min-height: 100vh; }

input, button, textarea, select { font: inherit; color: inherit; }
button { cursor: pointer; }
*:disabled { cursor: not-allowed; }

select:disabled, input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus, button:focus, textarea:focus, select:focus {
  outline: 2px solid var(--color-brand-500);
  outline-offset: -1px;
}

button:has(svg) { line-height: 0; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* ── Custom scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-grey-300);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: var(--color-grey-400); }
`;

export default GlobalStyles;
