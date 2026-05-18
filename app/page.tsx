"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Lang = "fa" | "en";

const whatsappNumber = "971521035588";

const content = {
  fa: {
    dir: "rtl",
    switchLabel: "EN",
    nav: {
      services: "خدمات",
      zones: "مناطق آزاد",
      process: "فرآیند",
      contact: "تماس",
      whatsapp: "واتساپ",
    },
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
      message: "توضیحات درخواست",
      submit: "ارسال در واتساپ",
    },
  },
  en: {
    dir: "ltr",
    switchLabel: "FA",
    nav: {
      services: "Services",
      zones: "Free Zones",
      process: "Process",
      contact: "Contact",
      whatsapp: "WhatsApp",
    },
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
      message: "Request Details",
      submit: "Send On WhatsApp",
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [lang, setLang] = useState<Lang>("fa");
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone] = useState("Kish");
  const [message, setMessage] = useState("");

  const t = content[lang];
  const isFa = lang === "fa";
  const stage = t.stages[activeStage];

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video) return;

    video.pause();
    video.currentTime = 0;

    let trigger: ScrollTrigger | null = null;

    const setupScroll = () => {
      if (trigger) trigger.kill();

      trigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=7000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          if (video.duration && Number.isFinite(video.duration)) {
            video.currentTime = video.duration * p;
          }

          const nextStage = Math.min(
            t.stages.length - 1,
            Math.floor(p * t.stages.length)
          );

          setActiveStage(nextStage);
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScroll();
    } else {
      video.addEventListener("loadedmetadata", setupScroll);
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupScroll);
      if (trigger) trigger.kill();
      ScrollTrigger.getAll().forEach((item) => item.kill());
    };
  }, [lang, t.stages.length]);

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
    <main dir={t.dir} className="overflow-x-hidden bg-black text-white">
      <nav className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <img src="/logo.png" alt="OPAL" className="w-24 md:w-32" />

          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-white/65 md:flex">
            <a href="#services" className="transition hover:text-white">
              {t.nav.services}
            </a>
            <a href="#zones" className="transition hover:text-white">
              {t.nav.zones}
            </a>
            <a href="#process" className="transition hover:text-white">
              {t.nav.process}
            </a>
            <a href="#contact" className="transition hover:text-white">
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fa" ? "en" : "fa")}
              className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white hover:bg-white hover:text-black"
            >
              {t.switchLabel}
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="hidden rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white hover:bg-white hover:text-black md:inline-block"
            >
              {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="hero-section relative h-screen">
        <div className="relative h-screen overflow-hidden">
          <video
            ref={videoRef}
            src="/hero-hq.mp4"
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="absolute left-0 top-0 z-50 h-1 w-full bg-white/10">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="absolute inset-0 z-40 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-24 md:pb-28">
              <div className="mb-8 flex items-center justify-between gap-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  {t.heroSmall}
                </p>

                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  {String(activeStage + 1).padStart(2, "0")} /{" "}
                  {String(t.stages.length).padStart(2, "0")}
                </p>
              </div>

              <div
                key={`${lang}-${activeStage}`}
                className={`hero-copy animate-heroText max-w-4xl ${
                  isFa ? "text-right" : "text-left"
                }`}
              >
                <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/50">
                  {stage.eyebrow}
                </p>

                <h1 className="text-5xl font-light leading-tight text-white md:text-8xl">
                  {stage.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-xl">
                  {stage.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/45">
              Scroll
            </p>
            <div className="mx-auto h-10 w-[1px] overflow-hidden bg-white/20">
              <div className="h-5 w-full animate-scrollLine bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="flex min-h-screen items-center justify-center bg-black px-6 py-28"
      >
        <div className="w-full max-w-6xl">
          <p className="mb-6 text-sm uppercase text-white/40">
            {t.servicesLabel}
          </p>

          <h2 className="mb-16 text-4xl font-light leading-tight md:text-7xl">
            {t.servicesTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {t.services.map((item) => (
              <div
                key={item}
                className="luxury-card rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.08]"
              >
                <h3 className="text-2xl font-light">{item}</h3>
                <p className="mt-4 text-white/50">{t.serviceDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="zones"
        className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-28"
      >
        <div className="w-full max-w-6xl text-center">
          <p className="mb-6 text-sm uppercase text-white/40">
            {t.zonesLabel}
          </p>

          <h2 className="mb-16 text-4xl font-light md:text-7xl">
            {t.zonesTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {t.zones.map((item) => (
              <div
                key={item}
                className="luxury-card rounded-3xl border border-white/10 bg-black p-10 text-center transition duration-500 hover:-translate-y-2 hover:border-white/30"
              >
                <h3 className="text-3xl font-light">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="flex min-h-screen items-center justify-center bg-black px-6 py-28"
      >
        <div className="max-w-6xl text-center">
          <p className="mb-6 text-sm uppercase text-white/40">
            {t.processLabel}
          </p>

          <h2 className="mb-12 text-4xl font-light md:text-7xl">
            {t.processTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-5">
            {t.process.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/[0.06]"
              >
                <p className="mb-4 text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-28"
      >
        <div className="grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-6 text-sm uppercase text-white/40">
              {t.contactLabel}
            </p>

            <h2 className="text-4xl font-light leading-tight md:text-7xl">
              {t.contactTitle}
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              {t.contactText}
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="mt-10 inline-block rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.18em] transition hover:border-white hover:bg-white hover:text-black"
            >
              {t.nav.whatsapp}
            </a>
          </div>

          <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="grid gap-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.name}
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.phone}
              />

              <input
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.vehicle}
              />

              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-white/40"
              >
                <option>Kish</option>
                <option>Qeshm</option>
                <option>Arvand</option>
                <option>Anzali</option>
              </select>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                placeholder={t.form.message}
              />

              <button
                type="button"
                onClick={sendToWhatsApp}
                className="rounded-full bg-white px-8 py-4 text-sm uppercase tracking-[0.18em] text-black transition hover:bg-zinc-300"
              >
                {t.form.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-6 py-12 text-center">
        <img src="/logo.png" alt="OPAL" className="mx-auto mb-6 w-28" />
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          © 2026 OPAL — Dubai To Iran
        </p>
      </footer>
    </main>
  );
}
