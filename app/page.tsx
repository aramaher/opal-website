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

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

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
        items: ["دریافت درخواست", "بررسی خودرو", "آماده‌سازی مدارک", "حمل دریایی", "تحویل نهایی"],
      },
      shipping: {
        label: "خدمات حمل و ارسال",
        title: "حمل خودرو از دبی تا مقصد",
        desc: "OPAL مسیر حمل خودرو را از هماهنگی بندر، بارگیری، حمل دریایی، پیگیری مسیر و تحویل در مقصد مدیریت می‌کند.",
        items: ["هماهنگی بندر دبی", "حمل دریایی", "پیگیری مسیر", "تحویل در منطقه آزاد"],
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
    importWa: (name: string, phone: string, vehicle: string, zone: string, msg: string) =>
      `سلام، من برای واردات خودرو از دبی به مناطق آزاد ایران درخواست دارم.\n\nنام: ${name}\nشماره واتساپ: ${phone}\nمدل خودرو: ${vehicle}\nمنطقه مقصد: ${zone}\nتوضیحات: ${msg}`,
    carWa: (model: string, year: string, route: string) =>
      `سلام، من اطلاعات کامل این خودرو را می‌خواهم:\nمدل: ${model}\nسال: ${year}\nمسیر: ${route}`,
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
        items: ["Request", "Vehicle Review", "Documents", "Sea Shipping", "Final Delivery"],
      },
      shipping: {
        label: "Shipping Services",
        title: "Vehicle Shipping From Dubai",
        desc: "OPAL manages port coordination, loading, sea shipping, tracking and destination delivery.",
        items: ["Dubai Port Coordination", "Sea Shipping", "Route Tracking", "Free Zone Delivery"],
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
    importWa: (name: string, phone: string, vehicle: string, zone: string, msg: string) =>
      `Hello, I have a request for vehicle import from Dubai to Iran free zones.\n\nName: ${name}\nWhatsApp: ${phone}\nVehicle: ${vehicle}\nDestination: ${zone}\nMessage: ${msg}`,
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

function Section({
  id,
  variant,
  label,
  title,
  desc,
  children,
}: {
  id: string;
  variant: string;
  label: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section section-${variant}`}>
      <div className="sectionBg" />
      <div className="sectionGlow" />
      <div className="sectionOverlay" />
      <div className="sectionInner">
        <div className="sectionHead reveal">
          <p>{label}</p>
          <h2>{title}</h2>
          {desc ? <span>{desc}</span> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileHeroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const mobileFrameRef = useRef(0);

  const [lang, setLang] = useState<Lang>("fa");
  const [stageIndex, setStageIndex] = useState(0);
  const [mobileFrame, setMobileFrame] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone] = useState("کیش");
  const [message, setMessage] = useState("");

  const t = copy[lang];
  const isFa = lang === "fa";
  const stage = t.stages[stageIndex];
  const zoneItems = t.sections.zones.items;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(max-width: 768px)");
    const updateViewport = () => {
      setIsMobile(query.matches);
      setStageIndex(0);
      setMobileFrame(0);
      stageRef.current = 0;
      mobileFrameRef.current = 0;
    };

    updateViewport();
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", updateViewport);
    } else {
      query.addListener(updateViewport);
    }

    return () => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", updateViewport);
      } else {
        query.removeListener(updateViewport);
      }
    };
  }, []);

  useEffect(() => {
    setZone(zoneItems[0]);
  }, [lang, zoneItems]);

  // Sync <html> lang and dir so [dir="rtl"] / [dir="ltr"] CSS selectors work
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  // -----------------------------------------------------------
  // DESKTOP hero — GSAP ScrollTrigger video scrub
  // Loaded dynamically only on desktop, only on client.
  // -----------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile !== false) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = heroRef.current;
    const progress = progressRef.current;
    if (!hero || !progress) return;

    let cancelled = false;
    let trigger: { kill: () => void } | undefined;
    let removeMetadataListener: (() => void) | undefined;

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !heroRef.current || !progressRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      stageRef.current = 0;
      setStageIndex(0);
      progress.style.transform = "scaleX(0)";

      const setProgress = (p: number) => {
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
          const target = Math.max(
            0.01,
            Math.min(video.duration - 0.01, video.duration * p),
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

      const createTrigger = () => {
        trigger?.kill();
        trigger = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 7, 5200)}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
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
          createTrigger();
        } else {
          const onLoadedMetadata = () => createTrigger();
          video.addEventListener("loadedmetadata", onLoadedMetadata, {
            once: true,
          });
          removeMetadataListener = () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
          };
        }
      } else {
        createTrigger();
      }
    };

    setup();

    return () => {
      cancelled = true;
      removeMetadataListener?.();
      trigger?.kill();
    };
  }, [isMobile, lang, t.stages.length]);

  // -----------------------------------------------------------
  // MOBILE hero — GSAP ScrollTrigger pins hero + swaps image src
  // No video, no autoplay, no poster.
  // -----------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile !== true) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = mobileHeroRef.current;
    const progress = mobileProgressRef.current;
    if (!hero || !progress) return;

    let cancelled = false;
    let trigger: { kill: () => void } | undefined;

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !mobileHeroRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      stageRef.current = 0;
      mobileFrameRef.current = 0;
      setStageIndex(0);
      setMobileFrame(0);
      progress.style.transform = "scaleX(0)";

      const totalFrames = MOBILE_HERO_IMAGES.length;
      const totalStages = t.stages.length;

      const setProgress = (p: number) => {
        progress.style.transform = `scaleX(${p})`;

        const nextFrame = Math.min(
          totalFrames - 1,
          Math.floor(p * totalFrames),
        );
        if (nextFrame !== mobileFrameRef.current) {
          mobileFrameRef.current = nextFrame;
          setMobileFrame(nextFrame);
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
        onUpdate: (self) => setProgress(self.progress),
      });

      ScrollTrigger.refresh();
    };

    setup();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [isMobile, lang, t.stages.length]);

  // -----------------------------------------------------------
  // Reveal-on-scroll for section content (cards, headings).
  // Uses IntersectionObserver — light, GPU-only motion via CSS.
  // -----------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = document.querySelectorAll<HTMLElement>(".reveal");

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("reveal--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  // Mark cards/cars with .reveal once on mount; we attach class via JSX below.

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

  return (
    <main dir={t.dir}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="OPAL">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="OPAL" />
        </a>

        <nav>
          {["services", "zones", "process", "shipping", "listings", "contact"].map(
            (id, index) => (
              <a key={id} href={`#${id}`}>
                {t.nav[index]}
              </a>
            ),
          )}
        </nav>

        <div className="actions">
          <button
            className={lang === "fa" ? "active" : ""}
            type="button"
            onClick={() => setLang("fa")}
          >
            FA
          </button>

          <button
            className={lang === "en" ? "active" : ""}
            type="button"
            onClick={() => setLang("en")}
          >
            EN
          </button>

          <a
            href={waUrl(
              isFa
                ? "سلام، درباره واردات خودرو راهنمایی می‌خواهم."
                : "Hello, I need vehicle import guidance.",
            )}
          >
            {t.whatsapp}
          </a>
        </div>
      </header>

      {isMobile === null ? <div id="top" className="heroShell" /> : null}

      {isMobile === false ? (
        <section id="top" ref={heroRef} className="hero hero-section">
          <div className="heroMedia">
            <video
              ref={videoRef}
              src="/hero.mp4"
              poster="/hero-poster.jpg"
              muted
              playsInline
              preload="auto"
              controls={false}
              className="heroAsset hero-video"
            />

            <div className="heroShade" />

            <div className="progress hero-progress">
              <div ref={progressRef} />
            </div>

            <div className="heroContent">
              <div className="heroMeta">
                <span>{t.heroSmall}</span>
              </div>

              <div
                key={`d-${lang}-${stageIndex}`}
                className="heroText animate-heroText"
              >
                <p>{stage.eyebrow}</p>
                <h1>{stage.title}</h1>
                <span>{stage.desc}</span>
              </div>
            </div>

            <div className="scrollHint">
              <span>{t.scroll}</span>
              <i />
            </div>
          </div>
        </section>
      ) : null}

      {isMobile === true ? (
        <section
          id="top"
          ref={mobileHeroRef}
          className="mobileHero"
          aria-label="OPAL mobile hero"
        >
          <div className="mobileHeroPanel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MOBILE_HERO_IMAGES[mobileFrame]}
              alt="OPAL vehicle import"
              className="hero-mobile-image"
              decoding="async"
              fetchPriority="high"
            />

            <div className="mobileHeroShade" />

            <div className="progress hero-progress mobileProgress">
              <div ref={mobileProgressRef} />
            </div>

            <div className="mobileHeroText">
              <div className="heroMeta">
                <span>{t.heroSmall}</span>
              </div>

              <div
                key={`m-${lang}-${stageIndex}`}
                className="heroText animate-heroText"
              >
                <p>{stage.eyebrow}</p>
                <h1>{stage.title}</h1>
                <span>{stage.desc}</span>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="mobileHeroPreload">
            {MOBILE_HERO_IMAGES.slice(1).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" loading="eager" decoding="async" />
            ))}
          </div>
        </section>
      ) : null}

      <Section
        id="services"
        variant="services"
        label={t.sections.services.label}
        title={t.sections.services.title}
        desc={t.sections.services.desc}
      >
        <div className="cards three">
          {t.sections.services.items.map((item) => (
            <article className="card luxury-card reveal" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="zones"
        variant="zones"
        label={t.sections.zones.label}
        title={t.sections.zones.title}
      >
        <div className="cards four">
          {zoneItems.map((item) => (
            <a
              className="card zone luxury-card reveal"
              key={item}
              href={waUrl(
                isFa
                  ? `سلام، واردات خودرو به منطقه آزاد ${item} را می‌خواهم.`
                  : `Hello, I want vehicle import to ${item}.`,
              )}
            >
              <h3>{item}</h3>
              <small>WhatsApp</small>
            </a>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        variant="process"
        label={t.sections.process.label}
        title={t.sections.process.title}
      >
        <div className="cards five">
          {t.sections.process.items.map((item) => (
            <article className="card luxury-card reveal" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="shipping"
        variant="shipping"
        label={t.sections.shipping.label}
        title={t.sections.shipping.title}
        desc={t.sections.shipping.desc}
      >
        <div className="cards four">
          {t.sections.shipping.items.map((item) => (
            <article className="card luxury-card reveal" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="listings"
        variant="listings"
        label={t.sections.listings.label}
        title={t.sections.listings.title}
        desc={t.sections.listings.desc}
      >
        <div className="cars">
          {cars.map((car) => {
            const route = isFa ? car.routeFa : car.routeEn;

            return (
              <article className="car car-card reveal" key={car.model}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={car.image} alt={car.model} loading="lazy" />

                <div>
                  <h3>{car.model}</h3>
                  <p>
                    {t.year}: {car.year}
                  </p>
                  <p>{route}</p>
                  <a
                    className="btn-whatsapp"
                    href={waUrl(t.carWa(car.model, car.year, route))}
                  >
                    {t.carCta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="contact"
        variant="contact"
        label={t.sections.contact.label}
        title={t.sections.contact.title}
        desc={t.sections.contact.desc}
      >
        <form className="form glass-panel reveal" onSubmit={sendForm}>
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

          <select required value={zone} onChange={(e) => setZone(e.target.value)}>
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
          />

          <button type="submit" className="btn-whatsapp">
            {t.form.submit}
          </button>
        </form>
      </Section>

      <footer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="OPAL" />
        <p>2026 OPAL - {t.footer}</p>
      </footer>
    </main>
  );
}
