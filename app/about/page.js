"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  useEffect(() => {
    let scrollTriggerInstances = [];

    const initAnimations = () => {
      scrollTriggerInstances.forEach((t) => t && t.kill());
      scrollTriggerInstances = [];

      gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
        scale: 0,
      });

      const statsAnimation = gsap.to(
        [".stats-item-1", ".stats-item-2", ".stats-item-3"],
        {
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".stats",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
      scrollTriggerInstances.push(statsAnimation.scrollTrigger);

      if (window.innerWidth > 1000) {
        const portraitAnimation = gsap.to(".about-hero-portrait", {
          y: -200,
          rotation: -25,
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        scrollTriggerInstances.push(portraitAnimation.scrollTrigger);

        const tagConfigs = [
          { id: "#tag-1", y: -300, rotation: -45 },
          { id: "#tag-2", y: -150, rotation: 70 },
          { id: "#tag-3", y: -400, rotation: 120 },
          { id: "#tag-4", y: -350, rotation: -60 },
          { id: "#tag-5", y: -200, rotation: 100 },
        ];

        tagConfigs.forEach(({ id, y, rotation }) => {
          const anim = gsap.to(id, {
            y,
            rotation,
            scrollTrigger: {
              trigger: ".about-copy",
              start: "top bottom",
              end: "bottom+=100% top",
              scrub: 1,
            },
          });
          scrollTriggerInstances.push(anim.scrollTrigger);
        });
      }
    };

    initAnimations();

    const handleResize = () => initAnimations();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstances.forEach((t) => t && t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="page about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="about-hero-header">
          <h1>This is</h1>
          <h1>Otis Valen</h1>
        </div>
        <div className="about-hero-bio">
          <p className="ss">
            I&apos;m a digital designer who thrives on color chaos, joyful
            details, and ideas that make you tilt your head and grin. My work
            blends playful thinking with clean execution — whether it&apos;s a
            brand, a website, or a weird little concept that shouldn&apos;t work
            (but totally does). If it moves, clicks, scrolls, or shimmers —
            I&apos;m into it.
          </p>
          <p className="mn">Inside my head / slightly filtered</p>
        </div>
        <div className="about-hero-portrait">
          <img
            src="/images/services-header/portrait.jpeg"
            alt="Otis Valen portrait"
          />
        </div>
      </section>

      {/* About Copy */}
      <section className="about-copy">
        <div className="about-copy-content">
          <h3>
            I design things that click — literally and emotionally. From{" "}
            <span>bold</span> brands to <span>pixel-perfect</span> websites, my
            work lives in the digital space where color, energy, and{" "}
            <span>clever</span> details come out to play. I&apos;m not here to
            decorate; I&apos;m here to <span>connect</span>.
          </h3>
          <h3>
            Every project I take on is a <span>sandbox</span> — where ideas get
            messy, buttons have <span>feelings</span>, and layouts get{" "}
            <span>personality</span>. I like clean design with a{" "}
            <span>wild</span> side, smart systems that don&apos;t take
            themselves too <span>seriously</span>, and interfaces that move like
            they mean it.
          </h3>
          <h3>
            Otis Valen isn&apos;t just a name — it&apos;s a creative habit.
            I&apos;ve spent the last few years building visual identities,{" "}
            <span>interactive</span> sites, and <span>playful</span> experiences
            for clients who love good design but aren&apos;t afraid to have fun
            with it. If that sounds like you, let&apos;s make{" "}
            <span>cool</span> stuff.
          </h3>
        </div>
        <div className="tag" id="tag-1">
          <p>Interactive</p>
        </div>
        <div className="tag" id="tag-2">
          <p>Joyful</p>
        </div>
        <div className="tag" id="tag-3">
          <p>Precise</p>
        </div>
        <div className="tag" id="tag-4">
          <p>Curious</p>
        </div>
        <div className="tag" id="tag-5">
          <p>Personality</p>
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <div className="skills-copy">
          <p className="mn">01........................Illustration</p>
          <p className="mn">02......................VisualIdentity</p>
          <p className="mn">03..........................Typography</p>
          <p className="mn">04......................CreativeCoding</p>
          <p className="mn">05............................Branding</p>
          <p className="mn">06.........................Filmography</p>
          <p className="mn">07......................MotionGraphics</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats-row">
          <div className="stats-col stats-header">
            <h1>I don&apos;t love numbers, but they love me</h1>
            <p>Some slightly unhinged stats from the Otis-verse</p>
          </div>
          <div className="stats-col stats-item-1">
            <h1>32</h1>
            <p>
              Design projects that made me shout &ldquo;this is the one&rdquo;
              (every time)
            </p>
          </div>
        </div>
        <div className="stats-row">
          <div className="stats-col stats-item-2">
            <h1>100%</h1>
            <p>Remote, independent, and allergic to open-plan offices</p>
          </div>
          <div className="stats-col stats-item-3">
            <h1>30+</h1>
            <p>
              Clients who said &ldquo;wow&rdquo; — or at least made the face
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
