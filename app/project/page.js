"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ProjectPage() {
  useEffect(() => {
    // Hero text animations
    const heroTitle = SplitText.create(".project-hero-header-h1 h1", {
      type: "lines",
      mask: "lines",
    });

    const projectTags = SplitText.create(".project-tags p", {
      type: "lines",
      mask: "lines",
    });

    const heroDescription = SplitText.create(".project-hero-description p", {
      type: "lines",
      mask: "lines",
    });

    gsap.set([heroTitle.lines, projectTags.lines, heroDescription.lines], {
      position: "relative",
      y: "120%",
      willChange: "transform",
    });

    gsap.set(".project-hero-header-h1 img", {
      scale: 0,
      willChange: "transform",
    });

    const heroTl = gsap.timeline({ delay: 0.85 });

    heroTl.to(heroTitle.lines, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
    });

    heroTl.to(
      ".project-hero-header-h1 img",
      { scale: 1, duration: 1, ease: "power4.out" },
      "-=1"
    );

    heroTl.to(
      projectTags.lines,
      { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
      "-=0.9"
    );

    heroTl.to(
      heroDescription.lines,
      { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
      "-=0.9"
    );

    // Preview scroll animation
    const previewTrigger = ScrollTrigger.create({
      trigger: ".project-page-whitespace",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const projectPreviewWrapper = document.querySelector(
          ".project-preview-wrapper"
        );
        const previewCols = document.querySelectorAll(
          ".preview-col:not(.main-preview-col)"
        );
        const mainPreviewImg = document.querySelector(
          ".preview-img.main-preview-img img"
        );

        if (!projectPreviewWrapper || !mainPreviewImg) return;

        const previewScreenWidth = window.innerWidth;
        const previewMaxScale = previewScreenWidth < 900 ? 4 : 2.65;

        const scale = 1 + self.progress * previewMaxScale;
        const yPreviewColTranslate = self.progress * 300;
        const mainPreviewImgScale = 2 - self.progress * 0.85;

        projectPreviewWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;

        previewCols.forEach((previewCol) => {
          previewCol.style.transform = `translateY(${yPreviewColTranslate}px)`;
        });

        mainPreviewImg.style.transform = `scale(${mainPreviewImgScale})`;
      },
    });

    return () => {
      previewTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="page project-page">
      {/* Preview Gallery */}
      <section className="project-preview">
        <div className="project-preview-wrapper">
          <div className="preview-col">
            <div className="preview-img">
              <img src="/images/work-items/work-item-8.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-2.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-3.jpg" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/images/work-items/work-item-4.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-5.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-6.jpg" alt="" />
            </div>
          </div>
          <div className="preview-col main-preview-col">
            <div className="preview-img">
              <img src="/images/work-items/work-item-7.jpg" alt="" />
            </div>
            <div className="preview-img main-preview-img">
              <img src="/images/work-items/work-item-1.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-9.jpg" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/images/work-items/work-item-10.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-8.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-2.jpg" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/images/work-items/work-item-3.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-4.jpg" alt="" />
            </div>
            <div className="preview-img">
              <img src="/images/work-items/work-item-5.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Hero */}
      <section className="project-hero">
        <div className="project-hero-header">
          <div className="project-hero-header-h1">
            <img src="/images/global/s6-dark.png" alt="" />
            <h1>Room 404</h1>
            <img src="/images/global/s6-dark.png" alt="" />
          </div>
          <div className="project-tags">
            <p className="mn">3D Composition</p>
            <p className="mn">//</p>
            <p className="mn">Conceptual UI</p>
          </div>
        </div>
        <div className="project-hero-description">
          <p>
            Room 404 is a surreal interface study—built like a dream, styled like
            a glitch. Inspired by forgotten log-in screens, hotel lobbies in
            space, and retro-futurism at large, this project blends 3D visuals
            with UI elements that feel oddly familiar. It&apos;s not functional.
            It&apos;s not broken. It just... exists. Welcome in.
          </p>
        </div>
        <div className="project-hero-footer">
          <div className="project-hero-footer-symbols">
            <img src="/images/global/symbols.png" alt="" />
          </div>
          <div className="project-hero-footer-scroll-down">
            <p className="mn">Scroll Down</p>
          </div>
          <div className="project-hero-footer-tags">
            <p className="mn">Project 0001</p>
          </div>
        </div>
      </section>

      {/* Whitespace */}
      <section className="project-page-whitespace"></section>

      {/* Client Feedback */}
      <section className="project-client-feedback">
        <div className="project-client-feedback-header">
          <h1>What They Said After</h1>
        </div>
        <div className="project-client-feedback-copy">
          <p>
            &ldquo;Isha didn&apos;t just ship endpoints — she delivered a
            platform we could actually run. Migrations were clean, errors were
            observable, and the API contract stayed stable while we iterated on
            the product. We came in with performance pain and left with
            metrics that made sense.&rdquo;
          </p>
        </div>
        <div className="project-client-info">
          <div className="project-client-icon">
            <img
              src="/images/project/client-portrait.jpg"
              alt="Client portrait"
            />
          </div>
          <div className="project-client-bio">
            <p>Juno Merrick</p>
            <p className="mn">Director, WOW Studio</p>
          </div>
        </div>
      </section>

      {/* Snapshots */}
      <section className="project-snapshots">
        <div className="project-snapshot">
          <img src="/images/work-items/work-item-6.jpg" alt="" />
        </div>
        <div className="project-snapshot">
          <img src="/images/work-items/work-item-8.jpg" alt="" />
        </div>
        <div className="project-snapshot">
          <img src="/images/work-items/work-item-10.jpg" alt="" />
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
