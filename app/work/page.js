"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import TransitionLink from "@/components/TransitionLink";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

const workItems = [
  [
    { name: "Cosmic Deli", type: "Character Design", img: "work-item-1.jpg" },
    { name: "Skull Pop 7", type: "Color Exploration", img: "work-item-2.jpg" },
  ],
  [
    { name: "Room 404", type: "3D Composition", img: "work-item-3.jpg" },
    {
      name: "Red Dot Mission",
      type: "Narrative Design",
      img: "work-item-4.jpg",
    },
  ],
  [
    {
      name: "Sweetbones",
      type: "Editorial Illustration",
      img: "work-item-5.jpg",
    },
    {
      name: "Carnival Bloom 31",
      type: "Pattern Design",
      img: "work-item-6.jpg",
    },
  ],
  [
    { name: "Soft Noise", type: "Typography Play", img: "work-item-7.jpg" },
    {
      name: "Cloud Valley Echo",
      type: "Creative Direction",
      img: "work-item-8.jpg",
    },
  ],
  [
    { name: "Heartbyte", type: "Logo Concept", img: "work-item-9.jpg" },
    { name: "Orbit Quilt", type: "Digital Collage", img: "work-item-10.jpg" },
  ],
];

export default function WorkPage() {
  useEffect(() => {
    let scrollTriggerInstances = [];

    // Header animations
    gsap.set(".work-profile-icon", { scale: 0 });
    gsap.set(".work-header-arrow-icon", { scale: 0 });

    const feastText = SplitText.create(".work-header-content p", {
      type: "lines",
      mask: "lines",
    });

    const titleText = SplitText.create(".work-header-title h1", {
      type: "lines",
      mask: "lines",
    });

    gsap.set([feastText.lines, titleText.lines], { y: "120%" });

    const headerTl = gsap.timeline({ delay: 0.75 });

    headerTl.to(".work-profile-icon", {
      scale: 1,
      duration: 1,
      ease: "power4.out",
    });

    headerTl.to(
      feastText.lines,
      { y: "0%", duration: 1, ease: "power4.out" },
      "-=0.9"
    );

    headerTl.to(
      titleText.lines,
      { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
      "-=0.9"
    );

    headerTl.to(
      ".work-header-arrow-icon",
      { scale: 1, duration: 0.75, ease: "power4.out" },
      "-=0.9"
    );

    // Work items animations
    const initAnimations = () => {
      scrollTriggerInstances.forEach((t) => t && t.kill());
      scrollTriggerInstances = [];

      gsap.set(".work-item", { opacity: 0, scale: 0.75 });

      document.querySelectorAll(".work-items .row").forEach((row) => {
        const items = row.querySelectorAll(".work-item");

        items.forEach((item, itemIndex) => {
          const fromLeft = itemIndex % 2 === 0;
          gsap.set(item, {
            x: fromLeft ? -1000 : 1000,
            rotation: fromLeft ? -50 : 50,
            transformOrigin: "center center",
          });
        });

        const trigger = ScrollTrigger.create({
          trigger: row,
          start: "top 75%",
          onEnter: () => {
            gsap.timeline().to(items, {
              duration: 1,
              x: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              ease: "power4.out",
            });
          },
        });
        scrollTriggerInstances.push(trigger);
      });

      ScrollTrigger.refresh();
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
    <div className="page work-page">
      {/* Work Header */}
      <section className="work-header">
        <div className="work-header-content">
          <div className="work-profile-icon">
            <img
              src="/images/work-header/work-portrait.jpg"
              alt="Otis Valen portrait"
            />
          </div>
          <p>Feast your eyes, friend</p>
          <div className="work-header-title">
            <h1>I&apos;m Kinda Proud Of</h1>
            <h1>Stuff I Made</h1>
          </div>
          <div className="work-header-arrow-icon">
            <h1>&#8595;</h1>
          </div>
        </div>
        <div className="work-footer">
          <div className="work-footer-symbols">
            <img src="/images/global/symbols.png" alt="" />
          </div>
          <div className="work-footer-scroll-down">
            <p className="mn">Enter the Archive</p>
          </div>
          <div className="work-footer-tags">
            <p className="mn">The Goods / 2025</p>
          </div>
        </div>
      </section>

      {/* Work Items */}
      <section className="work-items">
        {workItems.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((item) => (
              <div className="work-item" key={item.name}>
                <div className="work-item-img">
                  <TransitionLink href="/project">
                    <img
                      src={`/images/work-items/${item.img}`}
                      alt={item.name}
                    />
                  </TransitionLink>
                </div>
                <div className="work-item-content">
                  <h3>{item.name}</h3>
                  <p className="mn">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
