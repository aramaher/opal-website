"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Lang = "fa" | "en";

const whatsappNumber = "971521035588";

const content = {
  fa: {
    dir: "rtl" as const,
    switchLabel: "EN",
    nav: {
      services: "خدمات",
      zones: "مناطق آزاد",
      process: "فرآیند",
      contact: "تماس",
      whatsapp: "واتساپ",
    },
    heroSmall: "دبی به مناطق آزاد ایران",
    scroll: "اسکرول",
    stages: [
      {
        eyebrow: "OPAL AUTO IMPORT",
        title: "از دبی تا ایران",
        desc: "مسیر واردات خودرو از دبی به مناطق آزاد ایران با مدیریت شفاف، امن و حرفه‌ای.",
      },
      {
        eyebrow: "VEHICLE SELECTION",
        title: "انتخاب خودرو",
        desc: "بررسی مدل، شرایط خودرو، سال ساخت و آماده‌سازی مسیر مناسب برای شروع واردات.",
      },
      {
        eyebrow: "DUBAI DOCUMENTS",
        title: "مدارک و خروج قانونی",
        desc: "هماهنگی مدارک، مستندات و آماده‌سازی خودرو برای خروج از دبی.",
      },
      {
        eyebrow: "PORT & SHIPPING",
        title: "حمل از بندر دبی",
        desc: "انتقال خودرو به بندر، هماهنگی لجستیک و کنترل مسیر حمل دریایی.",
      },
      {
        eyebrow: "IRAN FREE ZONES",
        title: "ورود به مناطق آزاد",
        desc: "پوشش مسیرهای کیش، قشم، اروند و انزلی برای ورود خودرو به منطقه آزاد.",
      },
      {
        eyebrow: "FINAL DELIVERY",
        title: "تحویل نهایی",
        desc: "پیگیری مراحل پایانی و تحویل خودرو به مشتری با گزارش‌دهی شفاف.",
      },
      {
        eyebrow: "START NOW",
        title: "شروع درخواست",
        desc: "مدل خودرو و مقصد را ارسال کنید تا مسیر مناسب واردات برای شما بررسی شود.",
      },
    ],
    servicesLabel: "خدمات OPAL",
    servicesTitle: "راهکارهای کامل واردات خودرو",
    services: [
      "بررسی و انتخاب خودرو",
      "آماده‌سازی مدارک دبی",
      "هماهنگی خروج خودرو",
      "حمل و لجستیک",
      "هماهنگی مناطق آزاد",
      "تحویل نهایی خودرو",
    ],
    serviceDesc:
      "مدیریت حرفه‌ای مسیر واردات خودرو از دبی به مناطق آزاد ایران با تمرکز بر امنیت، زمان‌بندی و شفافیت.",
    zonesLabel: "مقصدها",
    zonesTitle: "مناطق آزاد قابل پوشش",
    zones: ["کیش", "قشم", "اروند", "انزلی"],
    processLabel: "فرآیند",
    processTitle: "مسیر کاری OPAL",
    process: [
      "دریافت درخواست",
      "بررسی خودرو",
      "آماده‌سازی مدارک",
      "حمل دریایی",
      "تحویل نهایی",
    ],
    contactLabel: "تماس",
    contactTitle: "درخواست واردات خودرو",
    contactText:
      "اطلاعات خودرو و مقصد را وارد کنید تا پیام آماده‌شده مستقیم در واتساپ برای ما ارسال شود.",
    form: {
      name: "نام شما",
      phone: "شماره واتساپ",
      vehicle: "مدل خودرو",
      zone: "منطقه آزاد مقصد",
      message: "توضیحات درخواست",
      submit: "ارسال در واتساپ",
    },
  },
  en: {
    dir: "ltr" as const,
    switchLabel: "FA",
    nav: {
      services: "Services",
      zones: "Free Zones",
      process: "Process",
      contact: "Contact",
      whatsapp: "WhatsApp",
    },
    heroSmall: "Dubai To Iran Free Zones",
    scroll: "Scroll",
    stages: [
      {
        eyebrow: "OPAL AUTO IMPORT",
        title: "From Dubai To Iran",
        desc: "Premium vehicle import from Dubai to Iran free zones with a clear, secure and professional process.",
      },
      {
        eyebrow: "VEHICLE SELECTION",
        title: "Vehicle Selection",
        desc: "Reviewing the model, vehicle condition, production year and the right import path.",
      },
      {
        eyebrow: "DUBAI DOCUMENTS",
        title: "Legal Export Documents",
        desc: "Coordinating documentation and preparing the vehicle for legal export from Dubai.",
      },
      {
        eyebrow: "PORT & SHIPPING",
        title: "Dubai Port Shipping",
        desc: "Moving the vehicle to port, managing logistics and monitoring the sea transfer route.",
      },
      {
        eyebrow: "IRAN FREE ZONES",
        title: "Free Zone Arrival",
        desc: "Covering Kish, Qeshm, Arvand and Anzali free zones.",
      },
      {
        eyebrow: "FINAL DELIVERY",
        title: "Final Delivery",
        desc: "Final coordination and vehicle delivery with transparent updates.",
      },
      {
        eyebrow: "START NOW",
        title: "Start Your Import",
        desc: "Send the vehicle model and destination so we can review the best route.",
      },
    ],
    servicesLabel: "OPAL Services",
    servicesTitle: "Complete Vehicle Import Solutions",
    services: [
      "Vehicle Review",
      "Dubai Documents",
      "Export Coordination",
      "Shipping Logistics",
      "Free Zone Handling",
      "Final Delivery",
    ],
    serviceDesc:
      "Professional vehicle import management from Dubai to Iran free zones with focus on safety, timing and transparency.",
    zonesLabel: "Destinations",
    zonesTitle: "Covered Free Zones",
    zones: ["Kish", "Qeshm", "Arvand", "Anzali"],
    processLabel: "Process",
    processTitle: "The OPAL Route",
    process: [
      "Request",
      "Vehicle Review",
      "Documents",
      "Sea Shipping",
      "Final Delivery",
    ],
    contactLabel: "Contact",
    contactTitle: "Start Your Vehicle Import",
    contactText:
      "Enter your vehicle and destination details. The request will be sent directly to our WhatsApp.",
    form: {
      name: "Your Name",
      phone: "WhatsApp Number",
      vehicle: "Vehicle Model",
      zone: "Destination Free Zone",
      message: "Request Details",
      submit: "Send On WhatsApp",
    },
  },
};

const ZONE_OPTIONS = ["Kish", "Qeshm", "Arvand", "Anzali"];
const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stageEyebrowRef = useRef<HTMLParagraphElement>(null);
  const stageTitleRef = useRef<HTMLHeadingElement>(null);
  const stageDescRef = useRef<HTMLParagraphElement>(null);
  const stageCounterRef = useRef<HTMLParagraphElement>(null);
  const activeStageRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pendingTimeRef = useRef<number | null>(null);

  const [lang, setLang] = useState<Lang>("fa");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone] = useState("Kish");
  const [message, setMessage] = useState("");

  const t = content[lang];
  const isFa = lang === "fa";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = t.dir;
    }
  }, [lang, t.dir]);

  const closeMobileNav = () => setMobileNavOpen(false);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const stages = content[lang].stages;
    activeStageRef.current = 0;

    // Initialize text + GSAP baseline (prevents flash if scroll fires before metadata loads)
    if (stageEyebrowRef.current) stageEyebrowRef.current.textContent = stages[0].eyebrow;
    if (stageTitleRef.current) stageTitleRef.current.textContent = stages[0].title;
    if (stageDescRef.current) stageDescRef.current.textContent = stages[0].desc;
    if (stageCounterRef.current) {
      stageCounterRef.current.textContent = `01 / ${String(stages.length).padStart(2, "0")}`;
    }

    const textTargets = [
      stageEyebrowRef.current,
      stageTitleRef.current,
      stageDescRef.current,
    ].filter(Boolean) as HTMLElement[];

    gsap.set(textTargets, { opacity: 1, y: 0, filter: "blur(0px)" });

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = "scaleX(0)";
    }

    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* noop */
    }

    let trigger: ScrollTrigger | null = null;
    let latestStageInFlight = 0;

    const flushVideoTime = () => {
      rafRef.current = null;
      const pendingTime = pendingTimeRef.current;
      if (pendingTime == null) return;
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = pendingTime;
        } catch {
          /* noop */
        }
      }
    };

    const scheduleVideoTime = (time: number) => {
      pendingTimeRef.current = time;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(flushVideoTime);
      }
    };

    const transitionStage = (nextStage: number) => {
      latestStageInFlight = nextStage;
      const stage = stages[nextStage];
      if (!stage) return;

      // Reduced motion: instant swap
      if (prefersReduced) {
        if (stageEyebrowRef.current) stageEyebrowRef.current.textContent = stage.eyebrow;
        if (stageTitleRef.current) stageTitleRef.current.textContent = stage.title;
        if (stageDescRef.current) stageDescRef.current.textContent = stage.desc;
        return;
      }

      // Mobile: lighter transition, no blur (very expensive on iOS Safari)
      const fadeDuration = isMobile ? 0.22 : 0.32;
      const showDuration = isMobile ? 0.38 : 0.55;
      const useBlur = !isMobile;

      gsap.to(textTargets, {
        opacity: 0,
        y: -12,
        ...(useBlur ? { filter: "blur(8px)" } : {}),
        duration: fadeDuration,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          const targetStage = stages[latestStageInFlight] ?? stage;
          if (stageEyebrowRef.current) stageEyebrowRef.current.textContent = targetStage.eyebrow;
          if (stageTitleRef.current) stageTitleRef.current.textContent = targetStage.title;
          if (stageDescRef.current) stageDescRef.current.textContent = targetStage.desc;

          gsap.fromTo(
            textTargets,
            {
              opacity: 0,
              y: isMobile ? 16 : 24,
              ...(useBlur ? { filter: "blur(10px)" } : {}),
            },
            {
              opacity: 1,
              y: 0,
              ...(useBlur ? { filter: "blur(0px)" } : {}),
              duration: showDuration,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
      });
    };

    const setupScroll = () => {
      if (trigger) trigger.kill();

      // Shorter scroll distance on mobile so sequence finishes faster
      const scrollMultiplier = isMobile ? 5 : 7;

      trigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * scrollMultiplier),
        scrub: isMobile ? 0.6 : 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Direct DOM write — no React state on scroll
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${p})`;
          }

          if (video.duration && Number.isFinite(video.duration)) {
            scheduleVideoTime(video.duration * p);
          }

          const nextStage = Math.min(
            stages.length - 1,
            Math.floor(p * stages.length)
          );

          if (nextStage !== activeStageRef.current) {
            activeStageRef.current = nextStage;
            if (stageCounterRef.current) {
              stageCounterRef.current.textContent = `${String(nextStage + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`;
            }
            transitionStage(nextStage);
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScroll();
    } else {
      video.addEventListener("loadedmetadata", setupScroll);
    }

    // Debounced resize — ignore iOS Safari URL bar collapse spam
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", setupScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (trigger) trigger.kill();
      ScrollTrigger.getAll().forEach((item) => item.kill());
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      pendingTimeRef.current = null;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = "scaleX(0)";
      }
    };
  }, [lang]);

  const sendToWhatsApp = () => {
    const text =
      lang === "fa"
        ? `سلام، من برای واردات خودرو از دبی به مناطق آزاد ایران درخواست دارم.

نام: ${name}
شماره واتساپ: ${phone}
مدل خودرو: ${vehicle}
منطقه مقصد: ${zone}
توضیحات: ${message}`
        : `Hello, I have a request for vehicle import from Dubai to Iran free zones.

Name: ${name}
WhatsApp Number: ${phone}
Vehicle Model: ${vehicle}
Destination Free Zone: ${zone}
Message: ${message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <main dir={t.dir} className="overflow-x-hidden bg-[#050505] text-white">
      {/* NAV */}
      <nav className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/60 backdrop-blur-xl md:bg-black/40 md:backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-5 md:h-20 md:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="OPAL" className="h-7 w-auto sm:h-8 md:h-10" />

          {/* Desktop menu */}
          <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/70 md:flex">
            <a href="#services" className="transition hover:text-white">{t.nav.services}</a>
            <a href="#zones" className="transition hover:text-white">{t.nav.zones}</a>
            <a href="#process" className="transition hover:text-white">{t.nav.process}</a>
            <a href="#contact" className="transition hover:text-white">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* WhatsApp icon — mobile only */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition active:scale-95 active:bg-white/10 md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.7 1-.9 1.2-.4.2-.7.1c-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-3.5 1 1-3.4-.2-.4c-1-1.5-1.5-3.3-1.5-5 0-5 4.1-9 9.1-9s9.1 4.1 9.1 9.1c-.1 4.9-4.1 9-9.1 9z" />
              </svg>
            </a>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "fa" ? "en" : "fa")}
              aria-label="Toggle language"
              className="tap-target rounded-full border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/85 transition active:scale-95 md:px-4 md:py-2 md:text-[11px] md:hover:border-white md:hover:bg-white md:hover:text-black"
            >
              {t.switchLabel}
            </button>

            {/* WhatsApp text button — desktop */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/20 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-white/85 transition hover:border-white hover:bg-white hover:text-black md:inline-block"
            >
              {t.nav.whatsapp}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileNavOpen}
              className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition active:scale-95 active:bg-white/10 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${mobileNavOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-200 ${mobileNavOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${mobileNavOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`overflow-hidden border-t border-white/5 bg-black/90 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
            mobileNavOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-4 py-1">
            <a
              href="#services"
              onClick={closeMobileNav}
              className="border-b border-white/5 py-4 text-[13px] uppercase tracking-[0.2em] text-white/80 active:text-white"
            >
              {t.nav.services}
            </a>
            <a
              href="#zones"
              onClick={closeMobileNav}
              className="border-b border-white/5 py-4 text-[13px] uppercase tracking-[0.2em] text-white/80 active:text-white"
            >
              {t.nav.zones}
            </a>
            <a
              href="#process"
              onClick={closeMobileNav}
              className="border-b border-white/5 py-4 text-[13px] uppercase tracking-[0.2em] text-white/80 active:text-white"
            >
              {t.nav.process}
            </a>
            <a
              href="#contact"
              onClick={closeMobileNav}
              className="py-4 text-[13px] uppercase tracking-[0.2em] text-white/80 active:text-white"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="hero-section relative h-[100svh] min-h-[560px]">
        <div className="relative h-[100svh] min-h-[560px] overflow-hidden">
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            {...({ "webkit-playsinline": "true", "x-webkit-airplay": "deny" } as Record<string, string>)}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/35 md:bg-black/30" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/95 via-black/40 to-transparent md:h-64" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#050505] via-black/80 to-transparent md:h-[28rem]" />

          {/* Progress bar */}
          <div className="absolute left-0 top-0 z-50 h-[2px] w-full bg-white/10">
            <div
              ref={progressBarRef}
              className="hero-progress h-full w-full bg-white"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {/* Stage text */}
          <div className="absolute inset-0 z-40 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28 md:pb-32">
              <div className="mb-5 flex items-center justify-between gap-4 sm:mb-8">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/55 sm:text-[10px] sm:tracking-[0.35em] md:text-xs">
                  {t.heroSmall}
                </p>
                <p
                  ref={stageCounterRef}
                  className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-white/55 sm:text-[10px] sm:tracking-[0.35em] md:text-xs"
                >
                  01 / 07
                </p>
              </div>

              <div className={`max-w-4xl ${isFa ? "text-right" : "text-left"}`}>
                <p
                  ref={stageEyebrowRef}
                  className="mb-3 text-[10px] uppercase tracking-[0.32em] text-white/55 sm:mb-5 sm:text-[11px] sm:tracking-[0.4em] md:text-xs"
                >
                  {t.stages[0].eyebrow}
                </p>

                <h1
                  ref={stageTitleRef}
                  className={`font-light leading-[1.08] text-white ${
                    isFa
                      ? "text-[2rem] sm:text-4xl md:text-7xl lg:text-8xl"
                      : "text-[2.25rem] sm:text-5xl md:text-8xl lg:text-9xl"
                  }`}
                >
                  {t.stages[0].title}
                </h1>

                <p
                  ref={stageDescRef}
                  className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:mt-6 sm:text-base sm:leading-8 md:text-lg lg:text-xl"
                >
                  {t.stages[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator — hidden on mobile to avoid overlap with text */}
          <div className="absolute bottom-6 left-1/2 z-50 hidden -translate-x-1/2 text-center sm:block">
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/50">
              {t.scroll}
            </p>
            <div className="mx-auto h-10 w-px overflow-hidden bg-white/15">
              <div className="h-5 w-full animate-scrollLine bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="relative flex min-h-screen items-center justify-center bg-[#050505] px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      >
        <div className="w-full max-w-6xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:mb-6 sm:text-[11px] sm:tracking-[0.3em]">
            {t.servicesLabel}
          </p>
          <h2 className="mb-10 max-w-4xl text-3xl font-light leading-[1.15] sm:mb-16 sm:text-4xl md:text-6xl lg:text-7xl">
            {t.servicesTitle}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {t.services.map((item) => (
              <div
                key={item}
                className="luxury-card group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 active:bg-white/[0.07] sm:rounded-3xl sm:p-8 md:backdrop-blur-xl md:hover:-translate-y-1.5 md:hover:border-white/25 md:hover:bg-white/[0.06]"
              >
                <h3 className="text-xl font-light tracking-tight sm:text-2xl">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55 sm:mt-4 sm:text-base sm:leading-7">
                  {t.serviceDesc}
                </p>
                <div className="mt-6 h-px w-10 bg-white/20 transition-all duration-500 sm:mt-8 sm:w-12 md:group-hover:w-20 md:group-hover:bg-[#E10600]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE ZONES */}
      <section
        id="zones"
        className="relative flex min-h-screen items-center justify-center bg-[#070707] px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      >
        <div className="w-full max-w-6xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:mb-6 sm:text-[11px] sm:tracking-[0.3em]">
            {t.zonesLabel}
          </p>
          <h2 className="mb-10 text-3xl font-light leading-[1.15] sm:mb-16 sm:text-4xl md:text-6xl lg:text-7xl">
            {t.zonesTitle}
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {t.zones.map((item, idx) => (
              <div
                key={item}
                className="luxury-card group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-7 text-center transition duration-500 active:border-white/30 sm:rounded-3xl sm:p-12 md:hover:-translate-y-1.5 md:hover:border-white/25"
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/35 sm:mb-4 sm:tracking-[0.3em]">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-light tracking-tight sm:text-3xl">{item}</h3>
                <div className="mx-auto mt-4 h-px w-8 bg-white/20 transition-all duration-500 sm:mt-6 sm:w-10 md:group-hover:w-16 md:group-hover:bg-[#00A651]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="relative flex min-h-screen items-center justify-center bg-[#050505] px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/45 sm:mb-6 sm:text-[11px] sm:tracking-[0.3em]">
            {t.processLabel}
          </p>
          <h2 className="mb-10 text-center text-3xl font-light leading-[1.15] sm:mb-16 sm:text-4xl md:text-6xl lg:text-7xl">
            {t.processTitle}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-5">
            {t.process.map((step, index) => (
              <div
                key={step}
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 active:bg-white/[0.06] sm:rounded-3xl sm:p-7 md:hover:-translate-y-1.5 md:hover:border-white/25 md:hover:bg-white/[0.05] ${
                  isFa ? "text-right" : "text-left"
                }`}
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/35 sm:mb-5 sm:text-[11px] sm:tracking-[0.3em]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-light sm:text-lg">{step}</h3>
                <div
                  className={`mt-5 h-px w-7 bg-white/15 transition-all duration-500 sm:mt-6 sm:w-8 md:group-hover:w-14 md:group-hover:bg-white/60 ${
                    isFa ? "ms-auto" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative flex min-h-screen items-center justify-center bg-[#070707] px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <div className={isFa ? "text-right" : "text-left"}>
            <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:mb-6 sm:text-[11px] sm:tracking-[0.3em]">
              {t.contactLabel}
            </p>
            <h2 className="text-3xl font-light leading-[1.15] sm:text-4xl md:text-6xl lg:text-7xl">
              {t.contactTitle}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:mt-8 sm:text-base sm:leading-8 md:text-lg">
              {t.contactText}
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-7 py-4 text-xs uppercase tracking-[0.2em] transition active:scale-[0.98] active:bg-white/10 sm:mt-10 sm:tracking-[0.22em] md:hover:border-white md:hover:bg-white md:hover:text-black"
            >
              {t.nav.whatsapp} · +971 52 103 5588
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:rounded-3xl sm:p-7 md:p-9 md:backdrop-blur-xl">
            <div className="grid gap-3.5 sm:gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="form-input w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.name}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                autoComplete="tel"
                className="form-input w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.phone}
              />
              <input
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="form-input w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.vehicle}
              />
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                aria-label={t.form.zone}
                className="form-input w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-white outline-none transition focus:border-white/40"
              >
                {ZONE_OPTIONS.map((z) => (
                  <option key={z} value={z} className="bg-black">
                    {z}
                  </option>
                ))}
              </select>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="form-input min-h-32 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.message}
              />
              <button
                type="button"
                onClick={sendToWhatsApp}
                className="mt-2 min-h-[52px] rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.2em] text-black transition active:scale-[0.98] sm:tracking-[0.22em] md:hover:bg-zinc-200"
              >
                {t.form.submit}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050505] px-5 py-10 text-center sm:px-6 sm:py-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="OPAL" className="mx-auto mb-5 h-8 w-auto sm:mb-6 sm:h-10" />
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 sm:text-[11px] sm:tracking-[0.28em]">
          © 2026 OPAL — Dubai To Iran
        </p>
      </footer>
    </main>
  );
}
