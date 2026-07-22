import type { Config } from "tailwindcss";

// Color system rationale (CRO + psicología del color para un negocio de
// servicios B2C/B2B, "YoTeAyudo", audiencia 18-45):
// - brand (azul índigo): confianza, profesionalismo, tecnología/competencia.
//   Es el color dominante de marca (header, textos clave, estados activos).
// - accent (naranja): color complementario al azul → máximo contraste visual.
//   Se reserva EXCLUSIVAMENTE para CTAs de conversión (botones de compra/
//   contacto) para que destaquen sobre el resto de la UI y generen sensación
//   de acción/urgencia sin recurrir al rojo (que puede leerse como alarma/error).
// - success (verde esmeralda): confirmaciones, checkmarks, badges de
//   confianza (garantía, pago seguro) — refuerza seguridad psicológica.
// - ink/paper (slate): neutros de alto contraste para legibilidad AA/AAA.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe6fe",
          200: "#bfd3fe",
          300: "#93b4fd",
          400: "#608bfa",
          500: "#3b66f5",
          600: "#2547e9",
          700: "#1d36c9",
          800: "#1c2fa3",
          900: "#1b2b81",
          950: "#141c50",
        },
        accent: {
          50: "#fff6ed",
          100: "#ffe9d3",
          200: "#ffcfa1",
          300: "#ffab5e",
          400: "#ff8629",
          500: "#fd6a0a",
          600: "#ee4f05",
          700: "#c53808",
          800: "#9c2c0e",
          900: "#7d270f",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 6px -1px rgb(15 23 42 / 0.08)",
        cardHover: "0 8px 24px -6px rgb(15 23 42 / 0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "pulse-soft": "pulseSoft 2.2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
