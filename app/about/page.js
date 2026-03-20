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
          <h1>Isha Raghav</h1>
        </div>
        <div className="about-hero-bio">
          <p className="ss">
            I&apos;m a backend developer who cares about clear architecture,
            dependable APIs, and data that stays consistent when traffic spikes.
            I like turning messy requirements into services you can ship and
            monitor — from the first endpoint to production hardening. If it
            runs on a server, talks to a database, or needs to scale quietly in
            the background, that&apos;s my lane.
          </p>
          <p className="mn">How I build / no fluff</p>
        </div>
        <div className="about-hero-portrait">
          <img
            src="/images/services-header/portrait.jpeg"
            alt="Isha Raghav portrait"
          />
        </div>
      </section>

      {/* About Copy */}
      <section className="about-copy">
        <div className="about-copy-content">
          <h3>
            I build systems that stay <span>predictable</span> under load. From{" "}
            <span>REST</span> and <span>GraphQL</span> APIs to{" "}
            <span>PostgreSQL</span> schemas and background jobs, my focus is the
            layer users don&apos;t see but absolutely depend on. I&apos;m not
            here for vanity metrics; I&apos;m here for{" "}
            <span>uptime</span> and <span>data integrity</span>.
          </h3>
          <h3>
            Every engagement is a chance to tighten <span>boundaries</span> —
            clear service contracts,             <span>observable</span> failures, and code
            the next developer won&apos;t curse. I like pragmatic patterns,{" "}
            <span>automated</span> tests where they matter, and deployments
            that don&apos;t require a ritual.
          </h3>
          <h3>
            Isha Raghav is how I sign the work — backend ownership from{" "}
            <span>schema</span> to <span>CI</span>. I&apos;ve shipped APIs,
            integrations, and platform pieces for teams that need someone who
            reads logs without flinching. If you need a reliable{" "}
            <span>foundation</span> for your product, let&apos;s talk.
          </h3>
        </div>
        <div className="tag" id="tag-1">
          <p>APIs</p>
        </div>
        <div className="tag" id="tag-2">
          <p>Postgres</p>
        </div>
        <div className="tag" id="tag-3">
          <p>Pragmatic</p>
        </div>
        <div className="tag" id="tag-4">
          <p>Curious</p>
        </div>
        <div className="tag" id="tag-5">
          <p>Production</p>
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <div className="skills-copy">
          <p className="mn">01..............................Node.js</p>
          <p className="mn">02............................TypeScript</p>
          <p className="mn">03.............................PostgreSQL</p>
          <p className="mn">04...............................REST</p>
          <p className="mn">05...............................Docker</p>
          <p className="mn">06...............................Redis</p>
          <p className="mn">07...........................AWS / GCP</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats-row">
          <div className="stats-col stats-header">
            <h1>I don&apos;t love numbers, but they love me</h1>
            <p>Numbers from the server room (rounded for humans)</p>
          </div>
          <div className="stats-col stats-item-1">
            <h1>32</h1>
            <p>
              Backend services and APIs shipped end-to-end — migrations,
              auth, and the boring stuff that matters
            </p>
          </div>
        </div>
        <div className="stats-row">
          <div className="stats-col stats-item-2">
            <h1>100%</h1>
            <p>Remote-first, docs-in-repo, reviews that catch edge cases</p>
          </div>
          <div className="stats-col stats-item-3">
            <h1>30+</h1>
            <p>
              Teams who stopped paging at 3am after we fixed the hot path
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
