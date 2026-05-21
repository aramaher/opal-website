"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Lang = "fa" | "en";

const WHATSAPP = "971521035588";

const heroImages = [
  "/hero-photo1.jpg",
  "/hero-photo2.jpg",
  "/hero-photo3.jpg",
  "/hero-photo4.jpg",
  "/hero-photo5.jpg",
  "/hero-photo6.jpg",
] as const;

const mobileHeroImageFallbacks = heroImages.map((src, index) => {
  const n = index + 1;
  return [
    src,
    `/hero-photo${n}.jpeg`,
    `/hero-photo${n}.png`,
    `/hero-photo${n}.webp`,
    `/images/hero-photo${n}.jpg`,
    `/images/hero-photo${n}.jpeg`,
    `/images/hero-photo${n}.png`,
    `/images/hero-photo${n}.webp`,
    `/images/hero/hero-photo${n}.jpg`,
    `/images/hero/hero-photo${n}.jpeg`,
    `/images/hero/hero-photo${n}.png`,
    `/images/hero/hero-photo${n}.webp`,
    `/images/hero/mobile-${n}.jpg`,
    `/images/hero/mobile-${n}.jpeg`,
    `/images/hero/mobile-${n}.png`,
    `/images/hero/mobile-${n}.webp`,
    "/hero-poster.jpg",
    "/hero-poster.jpeg",
    "/hero-poster.png",
    "/hero-poster.webp",
    "/logo.png",
  ];
});

const sectionBg = {
  services: "/images/backgrounds/services-bg.jpg",
  zones: "/images/backgrounds/zones-bg.jpg",
  process: "/images/backgrounds/process-bg.jpg",
  shipping: "/images/backgrounds/shipping-bg.jpg",
  listings: "/images/backgrounds/listings-bg.jpg",
  contact: "/images/backgrounds/contact-bg.jpg",
};

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
  bg,
  label,
  title,
  desc,
  children,
}: {
  id: string;
  bg: string;
  label: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="sectionBg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="sectionOverlay" />
      <div className="sectionInner">
        <div className="sectionHead">
          <p>{label}</p>
          <h2>{title}</h2>
          {desc ? <span>{desc}</span> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function MobileHeroImage({
  index,
  alt,
}: {
  index: number;
  alt: string;
}) {
  const sources = mobileHeroImageFallbacks[index] ?? mobileHeroImageFallbacks[0];
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [index]);

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      loading={index === 0 ? "eager" : "lazy"}
      onError={() => {
        setSourceIndex((current) =>
          current < sources.length - 1 ? current + 1 : current,
        );
      }}
    />
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);

  const [lang, setLang] = useState<Lang>("fa");
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false,
  );
  const [stageIndex, setStageIndex] = useState(0);
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
    setZone(zoneItems[0]);
  }, [lang, zoneItems]);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (isMobile !== false || !heroRef.current || !progressRef.current) return;

    const hero = heroRef.current;
    const progress = progressRef.current;
    const video = videoRef.current;

    stageRef.current = 0;
    setStageIndex(0);
    progress.style.transform = "scaleX(0)";

    let trigger: ScrollTrigger | undefined;

    const setProgress = (p: number) => {
      progress.style.transform = `scaleX(${p})`;

      const nextStage = Math.min(t.stages.length - 1, Math.round(p * (t.stages.length - 1)));
      if (nextStage !== stageRef.current) {
        stageRef.current = nextStage;
        setStageIndex(nextStage);
      }

      if (video?.duration && Number.isFinite(video.duration)) {
        const target = Math.max(0.01, Math.min(video.duration - 0.01, video.duration * p));
        if (Math.abs(video.currentTime - target) > 0.04) {
          video.currentTime = target;
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
      video.preload = "metadata";
      video.pause();
      if (video.readyState >= 1) createTrigger();
      else video.addEventListener("loadedmetadata", createTrigger, { once: true });
    }

    return () => {
      video?.removeEventListener("loadedmetadata", createTrigger);
      trigger?.kill();
    };
  }, [isMobile, lang, t.stages.length]);

  const sendForm = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      window.open(waUrl(t.importWa(name, phone, vehicle, zone, message)), "_blank", "noopener,noreferrer");
    },
    [message, name, phone, t, vehicle, zone],
  );

  return (
    <main dir={t.dir}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="OPAL">
          <img src="/logo.png" alt="OPAL" />
        </a>
        <nav>
          {["services", "zones", "process", "shipping", "listings", "contact"].map((id, index) => (
            <a key={id} href={`#${id}`}>
              {t.nav[index]}
            </a>
          ))}
        </nav>
        <div className="actions">
          <button className={lang === "fa" ? "active" : ""} type="button" onClick={() => setLang("fa")}>
            FA
          </button>
          <button className={lang === "en" ? "active" : ""} type="button" onClick={() => setLang("en")}>
            EN
          </button>
          <a href={waUrl(isFa ? "سلام، درباره واردات خودرو راهنمایی می‌خواهم." : "Hello, I need vehicle import guidance.")}>
            {t.whatsapp}
          </a>
        </div>
      </header>

      {isMobile === false ? (
        <section id="top" ref={heroRef} className="hero">
          <div className="heroMedia">
            <video
              ref={videoRef}
              src="/hero.mp4?v=80"
              poster="/hero-poster.jpg"
              muted
              playsInline
              preload="metadata"
              className="heroAsset"
            />
            <div className="heroShade" />
            <div className="progress">
              <div ref={progressRef} />
            </div>
            <div className="heroContent">
              <div className="heroMeta">
                <span>{t.heroSmall}</span>
                <span>
                  {String(stageIndex + 1).padStart(2, "0")} / {String(t.stages.length).padStart(2, "0")}
                </span>
              </div>
              <div key={`${lang}-${stageIndex}`} className="heroText">
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
      ) : (
        <section id="top" className="mobileHero" aria-label="OPAL mobile hero">
          {t.stages.map((item, index) => (
            <article className="mobileHeroPanel" key={item.eyebrow}>
              <MobileHeroImage index={index} alt="OPAL vehicle import" />
              <div className="mobileHeroShade" />
              <div className="mobileHeroText">
                <div className="heroMeta">
                  <span>{t.heroSmall}</span>
                  <span>
                    {String(index + 1).padStart(2, "0")} / {String(t.stages.length).padStart(2, "0")}
                  </span>
                </div>
                <p>{item.eyebrow}</p>
                <h1>{item.title}</h1>
                <span>{item.desc}</span>
              </div>
            </article>
          ))}
        </section>
      )}

      <Section
        id="services"
        bg={sectionBg.services}
        label={t.sections.services.label}
        title={t.sections.services.title}
        desc={t.sections.services.desc}
      >
        <div className="cards three">
          {t.sections.services.items.map((item, index) => (
            <article className="card" key={item}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section id="zones" bg={sectionBg.zones} label={t.sections.zones.label} title={t.sections.zones.title}>
        <div className="cards four">
          {zoneItems.map((item) => (
            <a
              className="card zone"
              key={item}
              href={waUrl(isFa ? `سلام، واردات خودرو به منطقه آزاد ${item} را می‌خواهم.` : `Hello, I want vehicle import to ${item}.`)}
            >
              <h3>{item}</h3>
              <small>WhatsApp</small>
            </a>
          ))}
        </div>
      </Section>

      <Section id="process" bg={sectionBg.process} label={t.sections.process.label} title={t.sections.process.title}>
        <div className="cards five">
          {t.sections.process.items.map((item, index) => (
            <article className="card" key={item}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="shipping"
        bg={sectionBg.shipping}
        label={t.sections.shipping.label}
        title={t.sections.shipping.title}
        desc={t.sections.shipping.desc}
      >
        <div className="cards four">
          {t.sections.shipping.items.map((item, index) => (
            <article className="card" key={item}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="listings"
        bg={sectionBg.listings}
        label={t.sections.listings.label}
        title={t.sections.listings.title}
        desc={t.sections.listings.desc}
      >
        <div className="cars">
          {cars.map((car) => {
            const route = isFa ? car.routeFa : car.routeEn;
            return (
              <article className="car" key={car.model}>
                <img src={car.image} alt={car.model} loading="lazy" />
                <div>
                  <h3>{car.model}</h3>
                  <p>
                    {t.year}: {car.year}
                  </p>
                  <p>{route}</p>
                  <a href={waUrl(t.carWa(car.model, car.year, route))}>{t.carCta}</a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="contact"
        bg={sectionBg.contact}
        label={t.sections.contact.label}
        title={t.sections.contact.title}
        desc={t.sections.contact.desc}
      >
        <form className="form" onSubmit={sendForm}>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.form.name} />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.form.phone} />
          <input required value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder={t.form.vehicle} />
          <select required value={zone} onChange={(e) => setZone(e.target.value)}>
            {zoneItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.form.message} />
          <button type="submit">{t.form.submit}</button>
        </form>
      </Section>

      <footer>
        <img src="/logo.png" alt="OPAL" />
        <p>2026 OPAL - {t.footer}</p>
      </footer>
    </main>
  );
}
