import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPAL | Dubai to Iran Free Zones",
  description:
    "Luxury vehicle import and shipping from Dubai to Iran free zones including Kish, Qeshm, Arvand and Anzali.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: #050505;
                --foreground: #ededed;
                --accent-red: #e10600;
                --accent-green: #00a651;
                --border: rgba(255,255,255,0.1);
              }

              * { box-sizing: border-box; }

              html {
                scroll-behavior: auto;
                background: #050505;
              }

              body {
                margin: 0;
                background: var(--background);
                color: var(--foreground);
                font-family: Arial, Helvetica, sans-serif;
                overflow-x: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }

              a { color: inherit; text-decoration: none; }
              button, input, textarea, select { font-family: inherit; }
              img, video { max-width: 100%; }

              .hero-video {
                transform: translateZ(0);
                backface-visibility: hidden;
                will-change: transform;
                background: #000;
              }

              .hero-progress {
                transform-origin: left center;
                transform: scaleX(0);
                will-change: transform;
              }

              [dir="rtl"] .hero-progress {
                transform-origin: right center;
              }

              @keyframes heroText {
                0% {
                  opacity: 0;
                  transform: translateY(26px) scale(0.985);
                  filter: blur(8px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                  filter: blur(0);
                }
              }

              .animate-heroText {
                animation: heroText 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }

              @keyframes scrollLine {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(200%); }
              }

              .animate-scrollLine {
                animation: scrollLine 1.6s ease-in-out infinite;
              }

              .section-shell {
                position: relative;
                isolation: isolate;
                overflow: hidden;
                background: #050505;
                color: #ededed;
              }

              .section-shell__bg {
                position: absolute;
                inset: 0;
                z-index: 0;
                background-size: cover;
                background-position: center;
                opacity: 0.38;
                transform: scale(1.03) translateZ(0);
                pointer-events: none;
              }

              .section-shell__overlay {
                position: absolute;
                inset: 0;
                z-index: 1;
                background:
                  radial-gradient(circle at 20% 20%, rgba(225, 6, 0, 0.13), transparent 28%),
                  radial-gradient(circle at 80% 70%, rgba(0, 166, 81, 0.12), transparent 30%),
                  linear-gradient(180deg, rgba(0, 0, 0, 0.78), rgba(5, 5, 5, 0.92));
                pointer-events: none;
              }

              .section-shell__inner {
                position: relative;
                z-index: 2;
              }

              .section-divider {
                position: relative;
                z-index: 5;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 1.5rem;
                height: 4.5rem;
                background: #050505;
                overflow: hidden;
              }

              .section-divider__line {
                position: relative;
                width: min(42rem, 100%);
                height: 1px;
                background: linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(225, 6, 0, 0.45) 18%,
                  rgba(255, 255, 255, 0.28) 50%,
                  rgba(0, 166, 81, 0.45) 82%,
                  transparent 100%
                );
                box-shadow:
                  0 0 18px rgba(225, 6, 0, 0.28),
                  0 0 18px rgba(0, 166, 81, 0.25);
              }

              .section-divider__line::before {
                content: "";
                position: absolute;
                inset: -1px 20%;
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(225, 6, 0, 0.15),
                  rgba(0, 166, 81, 0.15),
                  transparent
                );
                filter: blur(6px);
                opacity: 0.9;
              }

              .section-divider__gem {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 6px;
                height: 6px;
                transform: translate(-50%, -50%) rotate(45deg);
                background: #ededed;
                box-shadow:
                  0 0 12px rgba(225, 6, 0, 0.45),
                  0 0 12px rgba(0, 166, 81, 0.35);
              }

              .reveal {
                opacity: 0;
                transform: translate3d(0, 24px, 0);
                transition:
                  opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
              }

              .reveal--visible {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }

              .luxury-card {
                position: relative;
                overflow: hidden;
                transition:
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.35s ease,
                  background-color 0.35s ease;
              }

              .luxury-card::before {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                  120deg,
                  transparent,
                  rgba(255, 255, 255, 0.08),
                  transparent
                );
                transform: translateX(-100%);
                transition: transform 0.75s ease;
                pointer-events: none;
              }

              .luxury-card:hover {
                transform: translateY(-4px);
              }

              .luxury-card:hover::before {
                transform: translateX(100%);
              }

              .glass-panel {
                background: rgba(5, 5, 5, 0.55);
                border: 1px solid var(--border);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                box-shadow: 0 24px 80px rgba(0,0,0,0.22);
              }

              .field-input {
                width: 100%;
                border-radius: 0.75rem;
                border: 1px solid var(--border);
                background: rgba(0,0,0,0.45);
                padding: 1rem 1.25rem;
                color: #fff;
                outline: none;
                transition: border-color 0.25s ease, background 0.25s ease;
              }

              .field-input::placeholder {
                color: rgba(255,255,255,0.32);
              }

              .field-input:focus {
                border-color: rgba(255,255,255,0.35);
                background: rgba(0,0,0,0.58);
              }

              .btn-whatsapp {
                border: 1px solid rgba(0,166,81,0.45);
                background: linear-gradient(135deg, rgba(0,166,81,0.95), rgba(0,120,60,0.95));
                color: #fff;
                box-shadow: 0 18px 50px rgba(0,166,81,0.18);
                transition:
                  background 0.25s ease,
                  transform 0.25s ease,
                  box-shadow 0.25s ease,
                  border-color 0.25s ease;
              }

              .btn-whatsapp:hover {
                transform: translateY(-2px);
                border-color: rgba(255,255,255,0.5);
                box-shadow: 0 24px 70px rgba(0,166,81,0.28);
              }

              .process-timeline { position: relative; }

              .process-timeline::before {
                content: "";
                position: absolute;
                top: 2.5rem;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(255,255,255,0.15) 15%,
                  rgba(255,255,255,0.15) 85%,
                  transparent
                );
                display: none;
              }

              @media (min-width: 1024px) {
                .process-timeline::before { display: block; }
              }

              .process-step { position: relative; }

              .process-step__dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--accent-red);
                box-shadow: 0 0 14px rgba(225,6,0,0.5);
                margin-bottom: 1rem;
              }

              .car-card {
                box-shadow: 0 30px 100px rgba(0,0,0,0.35);
              }

              .car-card__image-wrap {
                position: relative;
                aspect-ratio: 16 / 10;
                overflow: hidden;
                border-radius: 1rem 1rem 0 0;
                background: #0a0a0a;
              }

              .car-card__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform: scale(1.02);
                transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              }

              .car-card:hover .car-card__image {
                transform: scale(1.06);
              }

              .lang-active {
                color: #fff;
                border-color: rgba(255,255,255,0.45);
                background: rgba(255,255,255,0.08);
              }

              .lang-inactive {
                color: rgba(255,255,255,0.45);
                border-color: rgba(255,255,255,0.12);
              }

              .lang-inactive:hover {
                color: rgba(255,255,255,0.75);
                border-color: rgba(255,255,255,0.25);
              }

              @media (max-width: 768px) {
                html, body {
                  width: 100%;
                  overflow-x: hidden;
                }

                .section-shell__bg {
                  opacity: 0.28;
                }

                .section-shell__overlay {
                  background:
                    radial-gradient(circle at 18% 20%, rgba(225,6,0,0.1), transparent 26%),
                    radial-gradient(circle at 82% 75%, rgba(0,166,81,0.1), transparent 28%),
                    linear-gradient(180deg, rgba(0,0,0,0.82), rgba(5,5,5,0.94));
                }

                .glass-panel {
                  backdrop-filter: blur(12px);
                  -webkit-backdrop-filter: blur(12px);
                }

                .reveal {
                  transform: translateY(22px);
                }
              }

              @media (prefers-reduced-motion: reduce) {
                .reveal,
                .reveal--visible {
                  opacity: 1;
                  transform: none;
                  transition: none;
                }
              }
            `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
