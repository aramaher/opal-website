"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type Lang = "fa" | "en";

const WHATSAPP = "971521035588";

const MOBILE_HERO_IMAGES = [
  "/hero-photo1.jpg",
  "/hero-photo2.jpg",
  "/hero-photo3.jpg",
  "/hero-photo4.jpg",
  "/hero-photo5.jpg",
  "/hero-photo6.jpg",
] as const;

const SECTION_VARIANTS = [
  "services",
  "zones",
  "process",
  "shipping",
  "listings",
  "contact",
] as const;

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

// ============================================================================
// CONTENT
// ============================================================================

const copy = {
  fa: {
    dir: "rtl" as const,
    nav: ["خدمات", "مناطق آزاد", "فرآیند", "حمل", "آگهی‌ها", "تماس"],
    whatsapp: "واتساپ",
    scroll: "اسکرول",
    heroSmall: "انتقال خودرو از دبی به مناطق آزاد ایران",
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
    ],
    sections: {
      services: {
        label: "خدمات OPAL",
        title: "راهکارهای کامل واردات خودرو",
        desc: "مدیریت حرفه‌ای مسیر واردات خودرو از دبی به مناطق آزاد ایران با تمرکز بر امنیت، زمان‌بندی و شفافیت.",
        items: [
          "بررسی و انتخاب خودرو",
          "آماده‌سازی مدارک دبی",
          "هماهنگی خروج خودرو",
          "حمل و لجستیک",
          "هماهنگی مناطق آزاد",
          "تحویل نهایی خودرو",
        ],
      },
      zones: {
        label: "مقصدها",
        title: "مناطق آزاد قابل پوشش",
        items: ["کیش", "قشم", "اروند", "انزلی"],
      },
      process: {
        label: "فرآیند",
        title: "مسیر کاری OPAL",
        items: [
          "دریافت درخواست",
          "بررسی خودرو",
          "آماده‌سازی مدارک",
          "حمل دریایی",
          "تحویل نهایی",
        ],
      },
      shipping: {
        label: "خدمات حمل و ارسال",
        title: "حمل خودرو از دبی تا مقصد",
        desc: "OPAL مسیر حمل خودرو را از هماهنگی بندر، بارگیری، حمل دریایی، پیگیری مسیر و تحویل در مقصد مدیریت می‌کند.",
        items: [
          "هماهنگی بندر دبی",
          "حمل دریایی",
          "پیگیری مسیر",
          "تحویل در منطقه آزاد",
        ],
      },
      listings: {
        label: "آگهی خودروها",
        title: "خودروهای پیشنهادی OPAL",
        desc: "برای دریافت اطلاعات کامل هر خودرو، روی دکمه واتساپ همان خودرو کلیک کنید.",
      },
      contact: {
        label: "تماس",
        title: "درخواست واردات خودرو",
        desc: "اطلاعات خودرو و مقصد را وارد کنید تا پیام آماده‌شده مستقیم در واتساپ برای ما ارسال شود.",
      },
    },
    form: {
      name: "نام شما",
      phone: "شماره واتساپ",
      vehicle: "مدل خودرو",
      zone: "منطقه آزاد مقصد",
      message: "توضیحات درخواست",
      submit: "ارسال در واتساپ",
    },
    year: "سال",
    carCta: "اطلاعات در واتساپ",
    footer: "واردات خودرو از دبی به مناطق آزاد ایران",
    importWa: (n: string, p: string, v: string, z: string, m: string) =>
      `سلام، من برای واردات خودرو از دبی به مناطق آزاد ایران درخواست دارم.\n\nنام: ${n}\nشماره واتساپ: ${p}\nمدل خودرو: ${v}\nمنطقه مقصد: ${z}\nتوضیحات: ${m}`,
    carWa: (model: string, year: string, route: string) =>
      `سلام، اطلاعات کامل این خودرو را می‌خواهم:\nمدل: ${model}\nسال: ${year}\nمسیر: ${route}`,
  },
  en: {
    dir: "ltr" as const,
    nav: ["Services", "Free Zones", "Process", "Shipping", "Listings", "Contact"],
    whatsapp: "WhatsApp",
    scroll: "Scroll",
    heroSmall: "Dubai To Iran Free Zones",
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
    ],
    sections: {
      services: {
        label: "OPAL Services",
        title: "Complete Vehicle Import Solutions",
        desc: "Professional vehicle import management from Dubai to Iran free zones with focus on safety, timing and transparency.",
        items: [
          "Vehicle Review",
          "Dubai Documents",
          "Export Coordination",
          "Shipping Logistics",
          "Free Zone Handling",
          "Final Delivery",
        ],
      },
      zones: {
        label: "Destinations",
        title: "Covered Free Zones",
        items: ["Kish", "Qeshm", "Arvand", "Anzali"],
      },
      process: {
        label: "Process",
        title: "The OPAL Route",
        items: [
          "Request",
          "Vehicle Review",
          "Documents",
          "Sea Shipping",
          "Final Delivery",
        ],
      },
      shipping: {
        label: "Shipping Services",
        title: "Vehicle Shipping From Dubai",
        desc: "OPAL manages port coordination, loading, sea shipping, tracking and destination delivery.",
        items: [
          "Dubai Port Coordination",
          "Sea Shipping",
          "Route Tracking",
          "Free Zone Delivery",
        ],
      },
      listings: {
        label: "Vehicle Listings",
        title: "Featured OPAL Vehicles",
        desc: "Click WhatsApp on any vehicle to request full details.",
      },
      contact: {
        label: "Contact",
        title: "Start Your Vehicle Import",
        desc: "Enter your vehicle and destination details. The request will be sent directly to our WhatsApp.",
      },
    },
    form: {
      name: "Your Name",
      phone: "WhatsApp Number",
      vehicle: "Vehicle Model",
      zone: "Destination Free Zone",
      message: "Request Details",
      submit: "Send On WhatsApp",
    },
    year: "Year",
    carCta: "WhatsApp for details",
    footer: "Vehicle import from Dubai to Iran free zones",
    importWa: (n: string, p: string, v: string, z: string, m: string) =>
      `Hello, I have a request for vehicle import from Dubai to Iran free zones.\n\nName: ${n}\nWhatsApp: ${p}\nVehicle: ${v}\nDestination: ${z}\nMessage: ${m}`,
    carWa: (model: string, year: string, route: string) =>
      `Hello, I want full details for this vehicle:\nModel: ${model}\nYear: ${year}\nRoute: ${route}`,
  },
};

const cars = [
  {
    model: "Mercedes-Benz G63 AMG",
    year: "2023",
    routeFa: "دبی به کیش",
    routeEn: "Dubai to Kish",
    image: "/images/cars/g63.jpg",
  },
  {
    model: "Range Rover Autobiography",
    year: "2022",
    routeFa: "دبی به قشم",
    routeEn: "Dubai to Qeshm",
    image: "/images/cars/range-rover.jpg",
  },
  {
    model: "Lamborghini Urus",
    year: "2021",
    routeFa: "دبی به اروند",
    routeEn: "Dubai to Arvand",
    image: "/images/cars/urus.jpg",
  },
  {
    model: "Lexus LX600",
    year: "2023",
    routeFa: "دبی به انزلی",
    routeEn: "Dubai to Anzali",
    image: "/images/cars/lx600.jpg",
  },
];

// ============================================================================
// SECTION COMPONENT
// ============================================================================

function Section({
  id,
  variant,
  label,
  title,
  desc,
  children,
}: {
  id: string;
  variant: (typeof SECTION_VARIANTS)[number];
  label: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section section--${variant}`}>
      <div className="section__bg" />
      <div className="section__glow" />
      <div className="section__overlay" />
      <div className="section__inner">
        <div className="section__head reveal">
          <p>{label}</p>
          <h2>{title}</h2>
          {desc ? <span>{desc}</span> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// HOME PAGE
// ============================================================================

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileHeroRef = useRef<HTMLElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const mobileFrameRef = useRef(0);

  const [lang, setLang] = useState<Lang>("fa");
  const [stageIndex, setStageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone] = useState("کیش");
  const [message, setMessage] = useState("");

  const t = copy[lang];
  const isFa = lang === "fa";
  const stage = t.stages[stageIndex];
  const zoneItems = t.sections.zones.items;

  // Reset zone option when language changes
  useEffect(() => {
    setZone(zoneItems[0]);
  }, [lang, zoneItems]);

  // Sync <html lang> and <html dir> so [dir="rtl"] CSS selectors work
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  // ==========================================================================
  // DESKTOP HERO - GSAP video scrub
  // ==========================================================================
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const hero = heroRef.current;
    const progress = progressRef.current;
    if (!hero || !progress) return;

    let cancelled = false;
    let trigger: { kill: () => void } | undefined;
    let removeLoadedMeta: (() => void) | undefined;

    const setup = async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      stageRef.current = 0;
      setStageIndex(0);
      progress.style.transform = "scaleX(0)";

      const onUpdate = (p: number) => {
        progress.style.transform = `scaleX(${p})`;

        const nextStage = Math.min(
          t.stages.length - 1,
          Math.round(p * (t.stages.length - 1)),
        );
        if (nextStage !== stageRef.current) {
          stageRef.current = nextStage;
          setStageIndex(nextStage);
        }

        if (video?.duration && Number.isFinite(video.duration)) {
          const target = Math.min(
            video.duration - 0.01,
            Math.max(0, video.duration * p),
          );
          if (Math.abs(video.currentTime - target) > 0.04) {
            try {
              video.currentTime = target;
            } catch {
              /* noop */
            }
          }
        }
      };

      const create = () => {
        trigger?.kill();
        trigger = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 6, 4800)}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => onUpdate(self.progress),
        });
        ScrollTrigger.refresh();
      };

      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        try {
          video.pause();
        } catch {
          /* noop */
        }
        if (video.readyState >= 1) {
          create();
        } else {
          const onMeta = () => create();
          video.addEventListener("loadedmetadata", onMeta, { once: true });
          removeLoadedMeta = () =>
            video.removeEventListener("loadedmetadata", onMeta);
        }
      } else {
        create();
      }
    };

    setup();

    return () => {
      cancelled = true;
      removeLoadedMeta?.();
      trigger?.kill();
    };
  }, [lang, t.stages.length]);

  // ==========================================================================
  // MOBILE HERO - GSAP image swap (no video)
  // ==========================================================================
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const hero = mobileHeroRef.current;
    const img = mobileImgRef.current;
    const progress = mobileProgressRef.current;
    if (!hero || !img || !progress) return;

    let cancelled = false;
    let trigger: { kill: () => void } | undefined;

    const setup = async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      stageRef.current = 0;
      mobileFrameRef.current = 0;
      setStageIndex(0);
      progress.style.transform = "scaleX(0)";

      const totalFrames = MOBILE_HERO_IMAGES.length;
      const totalStages = t.stages.length;

      const onUpdate = (p: number) => {
        progress.style.transform = `scaleX(${p})`;

        const nextFrame = Math.min(totalFrames - 1, Math.floor(p * totalFrames));
        if (nextFrame !== mobileFrameRef.current) {
          mobileFrameRef.current = nextFrame;
          img.src = MOBILE_HERO_IMAGES[nextFrame];
        }

        const nextStage = Math.min(
          totalStages - 1,
          Math.round(p * (totalStages - 1)),
        );
        if (nextStage !== stageRef.current) {
          stageRef.current = nextStage;
          setStageIndex(nextStage);
        }
      };

      trigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 5, 3600)}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => onUpdate(self.progress),
      });

      ScrollTrigger.refresh();
    };

    setup();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [lang, t.stages.length]);

  // ==========================================================================
  // REVEAL ON SCROLL — IntersectionObserver, lightweight
  // ==========================================================================
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = document.querySelectorAll<HTMLElement>(".reveal");

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("reveal--in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  // ==========================================================================
  // CONTACT FORM SUBMIT
  // ==========================================================================
  const sendForm = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      window.open(
        waUrl(t.importWa(name, phone, vehicle, zone, message)),
        "_blank",
        "noopener,noreferrer",
      );
    },
    [message, name, phone, t, vehicle, zone],
  );

  const navIds = ["services", "zones", "process", "shipping", "listings", "contact"];

  return (
    <main dir={t.dir} className="page" data-lang={lang}>
      {/* =================== TOPBAR =================== */}
      <header className="topbar">
        <a className="topbar__brand" href="#top" aria-label="OPAL">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="OPAL" />
        </a>

        <nav className="topbar__nav">
          {navIds.map((id, i) => (
            <a key={id} href={`#${id}`}>
              {t.nav[i]}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <div className="lang-toggle">
            <button
              className={lang === "fa" ? "is-active" : ""}
              type="button"
              onClick={() => setLang("fa")}
              aria-label="فارسی"
            >
              FA
            </button>
            <button
              className={lang === "en" ? "is-active" : ""}
              type="button"
              onClick={() => setLang("en")}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <a
            className="topbar__wa"
            href={waUrl(
              isFa
                ? "سلام، درباره واردات خودرو راهنمایی می‌خواهم."
                : "Hello, I need vehicle import guidance.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.whatsapp}
          </a>

          <button
            className="topbar__menu"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`burger ${menuOpen ? "burger--open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
          {navIds.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {t.nav[i]}
            </a>
          ))}
        </div>
      </header>

      {/* =================== DESKTOP HERO (video scrub) =================== */}
      <section id="top" ref={heroRef} className="hero hero--desktop">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          controls={false}
          className="hero__video"
        />
        <div className="hero__shade" />
        <div className="hero__progress">
          <div ref={progressRef} />
        </div>

        <div className="hero__content">
          <div className="hero__meta">
            <span>{t.heroSmall}</span>
          </div>

          <div
            key={`d-${lang}-${stageIndex}`}
            className="hero__text hero__text--animate"
          >
            <p>{stage.eyebrow}</p>
            <h1>{stage.title}</h1>
            <span>{stage.desc}</span>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{t.scroll}</span>
          <i />
        </div>
      </section>

      {/* =================== MOBILE HERO (image scrub) =================== */}
      <section
        id="top-m"
        ref={mobileHeroRef}
        className="hero hero--mobile"
        aria-label="OPAL"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mobileImgRef}
          src={MOBILE_HERO_IMAGES[0]}
          alt=""
          className="hero__image"
          decoding="async"
        />
        <div className="hero__shade" />
        <div className="hero__progress">
          <div ref={mobileProgressRef} />
        </div>

        <div className="hero__content">
          <div className="hero__meta">
            <span>{t.heroSmall}</span>
          </div>

          <div
            key={`m-${lang}-${stageIndex}`}
            className="hero__text hero__text--animate"
          >
            <p>{stage.eyebrow}</p>
            <h1>{stage.title}</h1>
            <span>{stage.desc}</span>
          </div>
        </div>

        {/* Preload remaining frames silently */}
        <div className="hero__preload" aria-hidden="true">
          {MOBILE_HERO_IMAGES.slice(1).map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" loading="eager" decoding="async" />
          ))}
        </div>
      </section>

      {/* =================== SERVICES =================== */}
      <Section
        id="services"
        variant="services"
        label={t.sections.services.label}
        title={t.sections.services.title}
        desc={t.sections.services.desc}
      >
        <div className="grid grid--3">
          {t.sections.services.items.map((item) => (
            <article className="card reveal" key={item}>
              <h3>{item}</h3>
              <i className="card__line" />
            </article>
          ))}
        </div>
      </Section>

      {/* =================== FREE ZONES =================== */}
      <Section
        id="zones"
        variant="zones"
        label={t.sections.zones.label}
        title={t.sections.zones.title}
      >
        <div className="grid grid--4">
          {zoneItems.map((item) => (
            <a
              className="card card--zone reveal"
              key={item}
              href={waUrl(
                isFa
                  ? `سلام، واردات خودرو به منطقه آزاد ${item} را می‌خواهم.`
                  : `Hello, I want vehicle import to ${item}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{item}</h3>
              <i className="card__line" />
              <em>WhatsApp</em>
            </a>
          ))}
        </div>
      </Section>

      {/* =================== PROCESS =================== */}
      <Section
        id="process"
        variant="process"
        label={t.sections.process.label}
        title={t.sections.process.title}
      >
        <div className="grid grid--5">
          {t.sections.process.items.map((item) => (
            <article className="card reveal" key={item}>
              <h3>{item}</h3>
              <i className="card__line" />
            </article>
          ))}
        </div>
      </Section>

      {/* =================== SHIPPING =================== */}
      <Section
        id="shipping"
        variant="shipping"
        label={t.sections.shipping.label}
        title={t.sections.shipping.title}
        desc={t.sections.shipping.desc}
      >
        <div className="grid grid--4">
          {t.sections.shipping.items.map((item) => (
            <article className="card reveal" key={item}>
              <h3>{item}</h3>
              <i className="card__line" />
            </article>
          ))}
        </div>
      </Section>

      {/* =================== LISTINGS =================== */}
      <Section
        id="listings"
        variant="listings"
        label={t.sections.listings.label}
        title={t.sections.listings.title}
        desc={t.sections.listings.desc}
      >
        <div className="grid grid--cars">
          {cars.map((car) => {
            const route = isFa ? car.routeFa : car.routeEn;
            return (
              <article className="car reveal" key={car.model}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={car.image} alt={car.model} loading="lazy" />
                <div className="car__body">
                  <h3>{car.model}</h3>
                  <p>
                    {t.year}: {car.year}
                  </p>
                  <p>{route}</p>
                  <a
                    className="btn"
                    href={waUrl(t.carWa(car.model, car.year, route))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.carCta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* =================== CONTACT =================== */}
      <Section
        id="contact"
        variant="contact"
        label={t.sections.contact.label}
        title={t.sections.contact.title}
        desc={t.sections.contact.desc}
      >
        <form className="form reveal" onSubmit={sendForm}>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.name}
            autoComplete="name"
          />
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.form.phone}
            inputMode="tel"
            autoComplete="tel"
          />
          <input
            required
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder={t.form.vehicle}
          />
          <select
            required
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            aria-label={t.form.zone}
          >
            {zoneItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.form.message}
            rows={4}
          />
          <button className="btn btn--block" type="submit">
            {t.form.submit}
          </button>
        </form>
      </Section>

      {/* =================== FOOTER =================== */}
      <footer className="footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="OPAL" />
        <p>© 2026 OPAL — {t.footer}</p>
      </footer>
    </main>
  );
}
