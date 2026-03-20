"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroImgRef = useRef(null);

  useEffect(() => {
    // Hero image carousel
    const heroImg = heroImgRef.current;
    if (!heroImg) return;

    let currentImageIndex = 1;
    const totalImages = 10;

    const interval = setInterval(() => {
      currentImageIndex =
        currentImageIndex >= totalImages ? 1 : currentImageIndex + 1;
      heroImg.src = `/images/work-items/work-item-${currentImageIndex}.jpg`;
    }, 250);

    // Hero scroll animation
    let heroTrigger = null;
    const initHeroAnimations = () => {
      if (heroTrigger) heroTrigger.kill();
      heroTrigger = ScrollTrigger.create({
        trigger: ".hero-img-holder",
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(".hero-img", {
            y: `${-110 + 110 * progress}%`,
            scale: 0.25 + 0.75 * progress,
            rotation: -15 + 15 * progress,
          });
        },
      });
    };

    initHeroAnimations();

    // Featured work animations
    let featuredTrigger = null;
    const initFeaturedWork = () => {
      if (featuredTrigger) {
        featuredTrigger.kill();
        featuredTrigger = null;
      }

      if (window.innerWidth <= 1000) return;

      const indicatorContainer = document.querySelector(
        ".featured-work-indicator"
      );
      if (!indicatorContainer) return;

      indicatorContainer.innerHTML = "";
      for (let section = 1; section <= 5; section++) {
        const sectionNumber = document.createElement("p");
        sectionNumber.className = "mn";
        sectionNumber.textContent = `0${section}`;
        indicatorContainer.appendChild(sectionNumber);
        for (let i = 0; i < 10; i++) {
          const indicator = document.createElement("div");
          indicator.className = "indicator";
          indicatorContainer.appendChild(indicator);
        }
      }

      const featuredCardPosSmall = [
        { y: 100, x: 1000 },
        { y: 1500, x: 100 },
        { y: 1250, x: 1950 },
        { y: 1500, x: 850 },
        { y: 200, x: 2100 },
        { y: 250, x: 600 },
        { y: 1100, x: 1650 },
        { y: 1000, x: 800 },
        { y: 900, x: 2200 },
        { y: 150, x: 1600 },
      ];

      const featuredCardPosLarge = [
        { y: 800, x: 5000 },
        { y: 2000, x: 3000 },
        { y: 240, x: 4450 },
        { y: 1200, x: 3450 },
        { y: 500, x: 2200 },
        { y: 750, x: 1100 },
        { y: 1850, x: 3350 },
        { y: 2200, x: 1300 },
        { y: 3000, x: 1950 },
        { y: 500, x: 4500 },
      ];

      const featuredCardPos =
        window.innerWidth >= 1600 ? featuredCardPosLarge : featuredCardPosSmall;

      const featuredTitles = document.querySelector(".featured-titles");
      const moveDistance = window.innerWidth * 4;
      const imagesContainer = document.querySelector(".featured-images");
      if (!imagesContainer) return;

      imagesContainer.innerHTML = "";
      for (let i = 1; i <= 10; i++) {
        const featuredImgCard = document.createElement("div");
        featuredImgCard.className = `featured-img-card featured-img-card-${i}`;
        const img = document.createElement("img");
        img.src = `/images/work-items/work-item-${i}.jpg`;
        img.alt = `featured work image ${i}`;
        featuredImgCard.appendChild(img);
        const position = featuredCardPos[i - 1];
        gsap.set(featuredImgCard, { x: position.x, y: position.y });
        imagesContainer.appendChild(featuredImgCard);
      }

      const featuredImgCards = document.querySelectorAll(".featured-img-card");
      featuredImgCards.forEach((card) => {
        gsap.set(card, { z: -1500, scale: 0 });
      });

      featuredTrigger = ScrollTrigger.create({
        trigger: ".featured-work",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(featuredTitles, {
            x: -moveDistance * self.progress,
          });

          featuredImgCards.forEach((card, index) => {
            const staggerOffset = index * 0.075;
            const scaledProgress = (self.progress - staggerOffset) * 2;
            const individualProgress = Math.max(
              0,
              Math.min(1, scaledProgress)
            );
            const newZ = -1500 + 3000 * individualProgress;
            const scaleProgress = Math.min(1, individualProgress * 10);
            const scale = Math.max(0, Math.min(1, scaleProgress));
            gsap.set(card, { z: newZ, scale });
          });

          const indicators = document.querySelectorAll(".indicator");
          const totalIndicators = indicators.length;
          const progressPerIndicator = 1 / totalIndicators;
          indicators.forEach((indicator, index) => {
            const indicatorStart = index * progressPerIndicator;
            gsap.to(indicator, {
              opacity: self.progress > indicatorStart ? 1 : 0.2,
              duration: 0.3,
            });
          });
        },
      });
    };

    initFeaturedWork();

    // Services pinning animations
    let serviceTriggers = [];
    const initServices = () => {
      serviceTriggers.forEach((t) => t && t.kill());
      serviceTriggers = [];

      if (window.innerWidth <= 1000) return;

      const services = gsap.utils.toArray(".service-card");

      const mainTrigger = ScrollTrigger.create({
        trigger: services[0],
        start: "top 50%",
        endTrigger: services[services.length - 1],
        end: "top 150%",
      });
      serviceTriggers.push(mainTrigger);

      services.forEach((service, index) => {
        const isLast = index === services.length - 1;
        const serviceCardInner = service.querySelector(".service-card-inner");

        if (!isLast) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            pin: true,
            pinSpacing: false,
          });
          serviceTriggers.push(pinTrigger);

          const scrollAnimation = gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: service,
              start: "top 45%",
              endTrigger: ".contact-cta",
              end: "top 90%",
              scrub: true,
            },
          });
          serviceTriggers.push(scrollAnimation.scrollTrigger);
        }
      });
    };

    initServices();

    const handleResize = () => {
      initHeroAnimations();
      initFeaturedWork();
      initServices();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      if (heroTrigger) heroTrigger.kill();
      if (featuredTrigger) featuredTrigger.kill();
      serviceTriggers.forEach((t) => t && t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-header-wrapper">
          <div className="hero-header hero-header-1">
            <h1>Otis</h1>
          </div>
          <div className="hero-header hero-header-2">
            <h1>Valen</h1>
          </div>
        </div>
        <div className="hero-footer">
          <div className="hero-footer-symbols">
            <img src="/images/global/symbols.png" alt="" />
          </div>
          <div className="hero-footer-scroll-down">
            <p className="mn">Pixels by Otis / 2025</p>
          </div>
          <div className="hero-footer-tags">
            <p className="mn">Portfolio Mode: ON</p>
          </div>
        </div>
      </section>

      {/* Hero Image Holder */}
      <section className="hero-img-holder">
        <div className="hero-img">
          <img ref={heroImgRef} src="/images/hero/img1.jpg" alt="" />
        </div>
      </section>

      {/* Featured Work */}
      <section className="featured-work">
        <div className="featured-images"></div>
        <div className="featured-titles">
          <div className="featured-title-wrapper">
            <h1 className="featured-title">Work Playground</h1>
          </div>
          <div className="featured-title-wrapper">
            <div className="featured-title-img">
              <img src="/images/work-items/work-item-1.jpg" alt="" />
            </div>
            <h1 className="featured-title">Cosmic Deli</h1>
          </div>
          <div className="featured-title-wrapper">
            <div className="featured-title-img">
              <img src="/images/work-items/work-item-2.jpg" alt="" />
            </div>
            <h1 className="featured-title">Skull Pop 7</h1>
          </div>
          <div className="featured-title-wrapper">
            <div className="featured-title-img">
              <img src="/images/work-items/work-item-3.jpg" alt="" />
            </div>
            <h1 className="featured-title">Red Dot Mission</h1>
          </div>
          <div className="featured-title-wrapper">
            <div className="featured-title-img">
              <img src="/images/work-items/work-item-4.jpg" alt="" />
            </div>
            <h1 className="featured-title">Sweetbones</h1>
          </div>
        </div>
        <div className="featured-work-indicator"></div>
        <div className="featured-work-footer">
          <p className="mn">Visual Vault [ 10 ]</p>
          <p className="mn">///////////////////</p>
          <p className="mn">
            <TransitionLink href="/work">Browse Full Bizarre</TransitionLink>
          </p>
        </div>
      </section>

      {/* Services Header */}
      <section className="services-header">
        <div className="services-header-content">
          <div className="services-profile-icon">
            <img
              src="/images/services-header/portrait.jpeg"
              alt="Otis Valen Portrait"
            />
          </div>
          <p>Your ideas. My toolbox.</p>
          <div className="services-header-title">
            <h1>Pixel wizardry</h1>
            <h1>served fresh</h1>
          </div>
          <div className="services-header-arrow-icon">
            <h1>&#8595;</h1>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="service-card" id="service-card-1">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Visual DNA</h1>
            </div>
            <div className="service-card-img">
              <img src="/images/services/service-1.jpg" alt="Experience Design" />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-2">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Brand Alchemy</h1>
            </div>
            <div className="service-card-img">
              <img src="/images/services/service-2.jpg" alt="Experience Design" />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-3">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Feel First Design</h1>
            </div>
            <div className="service-card-img">
              <img src="/images/services/service-3.jpg" alt="Experience Design" />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-4">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Human Clicks</h1>
            </div>
            <div className="service-card-img">
              <img src="/images/services/service-4.jpg" alt="Experience Design" />
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
