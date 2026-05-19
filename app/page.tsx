"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Lang = "fa" | "en";

const WHATSAPP = "971521035588";

const BG = {
  services: "/images/backgrounds/services-bg.jpg",
  zones: "/images/backgrounds/zones-bg.jpg",
  process: "/images/backgrounds/process-bg.jpg",
  shipping: "/images/backgrounds/shipping-bg.jpg",
  listings: "/images/backgrounds/listings-bg.jpg",
  contact: "/images/backgrounds/contact-bg.jpg",
} as const;

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

const content = {
  fa: {
    dir: "rtl" as const,
    switchLabel: "EN",
    nav: {
      services: "خدمات",
      zones: "مناطق آزاد",
      process: "فرآیند",
      shipping: "حمل",
      listings: "آگهی‌ها",
      contact: "تماس",
      whatsapp: "واتساپ",
    },
    heroSmall: "انتقال خودرو از دبی به مناطق آزاد ایران",
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
    shippingLabel: "خدمات حمل و ارسال",
    shippingTitle: "حمل خودرو از دبی تا مقصد",
    shippingDesc:
      "OPAL مسیر حمل خودرو را از هماهنگی بندر، بارگیری، حمل دریایی، پیگیری مسیر و تحویل در مقصد مدیریت می‌کند.",
    shippingCards: [
      "هماهنگی بندر دبی",
      "حمل دریایی",
      "پیگیری مسیر",
      "تحویل در منطقه آزاد",
    ],
    listingsLabel: "آگهی خودروها",
    listingsTitle: "خودروهای پیشنهادی OPAL",
    listingsDesc:
      "برای دریافت اطلاعات کامل هر خودرو، روی دکمه واتساپ همان خودرو کلیک کنید.",
    carCta: "اطلاعات در واتساپ",
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
    zoneOptions: ["کیش", "قشم", "اروند", "انزلی"],
    footer: "واردات خودرو از دبی به مناطق آزاد ایران",
    carWa: (model: string, year: string, route: string) =>
      `سلام، من اطلاعات کامل این خودرو را می‌خواهم:\nمدل: ${model}\nسال: ${year}\nمسیر: ${route}`,
    importWa: (name: string, phone: string, vehicle: string, zone: string, message: string) =>
      `سلام، من برای واردات خودرو از دبی به مناطق آزاد ایران درخواست دارم.\n\nنام: ${name}\nشماره واتساپ: ${phone}\nمدل خودرو: ${vehicle}\nمنطقه مقصد: ${zone}\nتوضیحات: ${message}`,
  },
  en: {
    dir: "ltr" as const,
    switchLabel: "FA",
    nav: {
      services: "Services",
      zones: "Free Zones",
      process: "Process",
      shipping: "Shipping",
      listings: "Listings",
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
    shippingLabel: "Shipping Services",
    shippingTitle: "Vehicle Shipping From Dubai",
    shippingDesc:
      "OPAL manages port coordination, loading, sea shipping, tracking and destination delivery.",
    shippingCards: [
      "Dubai Port Coordination",
      "Sea Shipping",
      "Route Tracking",
      "Free Zone Delivery",
    ],
    listingsLabel: "Vehicle Listings",
    listingsTitle: "Featured OPAL Vehicles",
    listingsDesc:
      "Click WhatsApp on any vehicle to request full details.",
    carCta: "WhatsApp for details",
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
    zoneOptions: ["Kish", "Qeshm", "Arvand", "Anzali"],
    footer: "Vehicle import from Dubai to Iran free zones",
    carWa: (model: string, year: string, route: string) =>
      `Hello, I want full details for this vehicle:\nModel: ${model}\nYear: ${year}\nRoute: ${route}`,
    importWa: (name: string, phone: string, vehicle: string, zone: string, message: string) =>
      `Hello, I have a request for vehicle import from Dubai to Iran free zones.\n\nName: ${name}\nWhatsApp: ${phone}\nVehicle: ${vehicle}\nDestination: ${zone}\nMessage: ${message}`,
  },
};

const carListings = [
  {
    id: "g63",
    model: "Mercedes-Benz G63 AMG",
    year: "2023",
    routeFa: "دبی → کیش",
    routeEn: "Dubai → Kish",
    image: "/images/cars/g63.jpg",
  },
  {
    id: "range-rover",
    model: "Range Rover Autobiography",
    year: "2022",
    routeFa: "دبی → قشم",
    routeEn: "Dubai → Qeshm",
    image: "/images/cars/range-rover.jpg",
  },
  {
    id: "urus",
    model: "Lamborghini Urus",
    year: "2021",
    routeFa: "دبی → اروند",
    routeEn: "Dubai → Arvand",
    image: "/images/cars/urus.jpg",
  },
  {
    id: "lx600",
    model: "Lexus LX600",
    year: "2023",
    routeFa: "دبی → انزلی",
    routeEn: "Dubai → Anzali",
    image: "/images/cars/lx600.jpg",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden>
      <div className="section-divider__line">
        <span className="section-divider__gem" />
      </div>
    </div>
  );
}

function SectionShell({
  id,
  bg,
  children,
  className = "",
}: {
  id: string;
  bg: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section-shell min-h-screen ${className}`}>
      <div
        className="section-shell__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div className="section-shell__overlay" aria-hidden />
      <div className="section-shell__inner mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 md:px-6 md:py-32">
        {children}
      </div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  description,
  align = "start",
}: {
  label: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-start max-w-3xl";

  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/40">
        {label}
      </p>
      <h2 className="text-3xl font-light leading-[1.12] text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-white/55 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);

  const [lang, setLang] = useState<Lang>("fa");
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone] = useState("کیش");
  const [message, setMessage] = useState("");

  const t = content[lang];
  const isFa = lang === "fa";
  const stage = t.stages[activeStage];

  const videoSrc = useMemo(
    () => (isMobile ? "/hero-mobile.mp4?v=3" : "/hero.mp4?v=15"),
    [isMobile]
  );

  useEffect(() => {
    setZone(t.zoneOptions[0]);
  }, [lang, t.zoneOptions]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetPage = () => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh(true);
      }, 250);
      setTimeout(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh(true);
      }, 800);
    };

    resetPage();
    window.addEventListener("pageshow", resetPage);
    window.addEventListener("load", resetPage);

    return () => {
      window.removeEventListener("pageshow", resetPage);
      window.removeEventListener("load", resetPage);
    };
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!hero || !video || !progressBar) return;

    video.pause();
    video.currentTime = 0;
    activeStageRef.current = 0;
    setActiveStage(0);
    progressBar.style.transform = "scaleX(0)";

    let trigger: ScrollTrigger | null = null;
    let refreshTimerOne: ReturnType<typeof setTimeout> | null = null;
    let refreshTimerTwo: ReturnType<typeof setTimeout> | null = null;

    const setupScroll = () => {
      if (trigger) trigger.kill();

      trigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: isMobile ? "+=4300" : "+=7600",
        scrub: isMobile ? 0.35 : 0.65,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressBar.style.transform = `scaleX(${p})`;

          if (video.duration && Number.isFinite(video.duration)) {
            const target =
              p >= 1
                ? Math.max(0, video.duration - 0.001)
                : video.duration * p;
            if (Math.abs(video.currentTime - target) > 0.035) {
              video.currentTime = target;
            }
          }

          const nextStage = Math.min(
            t.stages.length - 1,
            Math.floor(p * t.stages.length)
          );

          if (nextStage !== activeStageRef.current) {
            activeStageRef.current = nextStage;
            setActiveStage(nextStage);
          }
        },
      });

      ScrollTrigger.refresh(true);
      refreshTimerOne = setTimeout(() => ScrollTrigger.refresh(true), 500);
      refreshTimerTwo = setTimeout(() => ScrollTrigger.refresh(true), 1200);
    };

    const onReady = () => setupScroll();

    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener("loadedmetadata", onReady, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      if (refreshTimerOne) clearTimeout(refreshTimerOne);
      if (refreshTimerTwo) clearTimeout(refreshTimerTwo);
      if (trigger) trigger.kill();
    };
  }, [lang, t.stages.length, isMobile, videoSrc]);

  const sendForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      window.open(
        waUrl(t.importWa(name, phone, vehicle, zone, message)),
        "_blank",
        "noopener,noreferrer"
      );
    },
    [t, name, phone, vehicle, zone, message]
  );

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#zones", label: t.nav.zones },
    { href: "#process", label: t.nav.process },
    { href: "#shipping", label: t.nav.shipping },
    { href: "#listings", label: t.nav.listings },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <main dir={t.dir} className="overflow-x-hidden bg-[#050505] text-[#ededed]">
      <header className="fixed inset-x-0 top-0 z-[999] border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[4.5rem] md:px-6">
          <a href="#" className="block">
            <img src="/logo.png" alt="OPAL" className="h-8 w-auto md:h-9" />
          </a>

          <nav
            className={`hidden items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/55 lg:flex ${isFa ? "flex-row-reverse" : ""}`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setLang("fa")}
                className={`rounded-full border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition md:px-3 ${lang === "fa" ? "lang-active" : "lang-inactive"}`}
                aria-pressed={lang === "fa"}
              >
                FA
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition md:px-3 ${lang === "en" ? "lang-active" : "lang-inactive"}`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
            <a
              href={waUrl(
                isFa
                  ? "سلام، می‌خواهم درباره واردات خودرو از دبی صحبت کنم."
                  : "Hello, I would like to discuss vehicle import from Dubai."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-[#00A651] hover:text-white sm:inline-block"
            >
              {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </header>

      {/* —— Hero (pinned scroll timeline) —— */}
      <section ref={heroRef} className="hero-section relative h-screen">
        <div className="relative h-screen overflow-hidden bg-black">
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            className="hero-video absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/[0.04]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent md:h-36" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/65 via-black/20 to-transparent md:h-64" />

          <div className="absolute left-0 top-0 z-50 h-[2px] w-full overflow-hidden bg-white/10">
            <div
              ref={progressBarRef}
              className="hero-progress h-full bg-[#E10600]"
            />
          </div>

          <div className="absolute inset-0 z-40 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-20 md:px-6 md:pb-28">
              <div
                className={`mb-5 flex items-center justify-between gap-4 md:mb-8 ${isFa ? "flex-row-reverse" : ""}`}
              >
                <p className="max-w-[220px] text-[9px] uppercase tracking-[0.22em] text-white/55 md:max-w-none md:text-xs md:tracking-[0.35em]">
                  {t.heroSmall}
                </p>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/50 md:text-xs md:tracking-[0.35em]">
                  {String(activeStage + 1).padStart(2, "0")} /{" "}
                  {String(t.stages.length).padStart(2, "0")}
                </p>
              </div>

              <div
                key={`${lang}-${activeStage}`}
                className={`hero-copy animate-heroText max-w-4xl ${isFa ? "text-right" : "text-left"}`}
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.26em] text-white/55 md:mb-5 md:text-xs md:tracking-[0.35em]">
                  {stage.eyebrow}
                </p>
                <h1 className="text-4xl font-light leading-tight text-white md:text-8xl">
                  {stage.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:mt-6 md:text-xl md:leading-8">
                  {stage.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 text-center md:bottom-8">
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/45 md:mb-3 md:text-[10px]">
              {t.scroll}
            </p>
            <div className="mx-auto h-8 w-px overflow-hidden bg-white/20 md:h-10">
              <div className="h-4 w-full animate-scrollLine bg-white md:h-5" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* —— Services —— */}
      <SectionShell id="services" bg={BG.services}>
        <Reveal>
          <SectionHeading
            label={t.servicesLabel}
            title={t.servicesTitle}
            description={t.serviceDesc}
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((item, i) => (
            <Reveal key={item} delay={i * 70}>
              <article className="luxury-card glass-panel rounded-2xl p-6 md:p-7">
                <span className="text-[10px] tracking-[0.3em] text-[#E10600]/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-3 text-xl font-light text-white md:text-2xl ${isFa ? "text-right" : "text-left"}`}
                >
                  {item}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionDivider />

      {/* —— Free Zones —— */}
      <SectionShell id="zones" bg={BG.zones}>
        <Reveal>
          <SectionHeading
            label={t.zonesLabel}
            title={t.zonesTitle}
            align="center"
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.zones.map((item, i) => (
            <Reveal key={item} delay={i * 80}>
              <a
                href={waUrl(
                  isFa
                    ? `سلام، علاقه‌مند به واردات خودرو به منطقه آزاد ${item} هستم.`
                    : `Hello, I am interested in vehicle import to ${item} free zone.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`luxury-card glass-panel flex min-h-[110px] flex-col justify-end rounded-2xl p-5 transition hover:border-[#E10600]/35 md:p-6 ${isFa ? "text-right" : "text-left"}`}
              >
                <h3 className="text-2xl font-light text-white md:text-3xl">
                  {item}
                </h3>
                <span className="mt-2 text-[10px] uppercase tracking-[0.26em] text-white/35">
                  WhatsApp
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionDivider />

      {/* —— Process —— */}
      <SectionShell id="process" bg={BG.process}>
        <Reveal>
          <SectionHeading
            label={t.processLabel}
            title={t.processTitle}
            align="center"
          />
        </Reveal>
        <ol className="process-timeline grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.process.map((step, i) => (
            <Reveal key={step} delay={i * 90} as="li">
              <div
                className={`process-step glass-panel rounded-2xl p-5 md:p-6 ${isFa ? "text-right" : "text-left"}`}
              >
                <div
                  className={`process-step__dot ${isFa ? "ms-auto" : ""}`}
                />
                <span className="text-[10px] tracking-[0.3em] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-base font-light text-white md:text-lg">
                  {step}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </SectionShell>

      <SectionDivider />

      {/* —— Shipping —— */}
      <SectionShell id="shipping" bg={BG.shipping}>
        <Reveal>
          <SectionHeading
            label={t.shippingLabel}
            title={t.shippingTitle}
            description={t.shippingDesc}
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.shippingCards.map((card, i) => (
            <Reveal key={card} delay={i * 75}>
              <article
                className={`luxury-card glass-panel rounded-2xl p-6 md:p-7 ${isFa ? "text-right" : "text-left"}`}
              >
                <span className="text-[10px] tracking-[0.3em] text-[#00A651]/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-light text-white md:text-xl">
                  {card}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionDivider />

      {/* —— Car Listings —— */}
      <SectionShell id="listings" bg={BG.listings}>
        <Reveal>
          <SectionHeading
            label={t.listingsLabel}
            title={t.listingsTitle}
            description={t.listingsDesc}
            align="center"
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {carListings.map((car, i) => {
            const route = isFa ? car.routeFa : car.routeEn;
            return (
              <Reveal key={car.id} delay={i * 90}>
                <article className="car-card luxury-card overflow-hidden rounded-2xl border border-white/[0.08] bg-black/50">
                  <div className="car-card__image-wrap">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="car-card__image"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`p-5 md:p-6 ${isFa ? "text-right" : "text-left"}`}
                  >
                    <h3 className="text-xl font-light text-white md:text-2xl">
                      {car.model}
                    </h3>
                    <p className="mt-2 text-sm text-white/50">
                      {isFa ? "سال" : "Year"}: {car.year}
                    </p>
                    <p className="mt-1 text-sm text-white/65">{route}</p>
                    <a
                      href={waUrl(t.carWa(car.model, car.year, route))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp mt-5 inline-flex rounded-full px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em]"
                    >
                      {t.carCta}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </SectionShell>

      <SectionDivider />

      {/* —— Contact —— */}
      <SectionShell id="contact" bg={BG.contact}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              label={t.contactLabel}
              title={t.contactTitle}
              description={t.contactText}
            />
            <a
              href={waUrl(
                isFa
                  ? "سلام، می‌خواهم درباره واردات خودرو از دبی صحبت کنم."
                  : "Hello, I would like to discuss vehicle import from Dubai."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 inline-flex rounded-full px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em]"
            >
              {t.nav.whatsapp}
            </a>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={sendForm}
              className="glass-panel rounded-2xl p-6 md:p-8"
            >
              <div className="grid gap-4">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field-input"
                  placeholder={t.form.name}
                  autoComplete="name"
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="field-input"
                  placeholder={t.form.phone}
                  autoComplete="tel"
                  inputMode="tel"
                />
                <input
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="field-input"
                  placeholder={t.form.vehicle}
                />
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {t.form.zone}
                  </label>
                  <select
                    required
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="field-input appearance-none"
                  >
                    {t.zoneOptions.map((z) => (
                      <option key={z} value={z} className="bg-[#050505]">
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-input min-h-[7rem] resize-y"
                  placeholder={t.form.message}
                />
                <button
                  type="submit"
                  className="btn-whatsapp mt-1 w-full rounded-full py-4 text-[11px] font-medium uppercase tracking-[0.22em]"
                >
                  {t.form.submit}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </SectionShell>

      <footer className="border-t border-white/[0.08] bg-[#050505] px-6 py-12 text-center">
        <img src="/logo.png" alt="OPAL" className="mx-auto mb-7 h-11 w-auto" />
        <p className="fixed bottom-4 right-4 z-[9999] rounded-full bg-red-600 px-4 py-2 text-white">
        NEW OPAL VERSION 2026
        </p>
      </footer>
    </main>
  );
}
