"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";

export default function Footer() {
  const footerRef = useRef(null);
  const hasExplodedRef = useRef(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const explosionContainer = footer.querySelector(".explosion-container");
    if (!explosionContainer) return;

    const config = {
      gravity: 0.25,
      friction: 0.99,
      imageSize: 150,
      horizontalForce: 20,
      verticalForce: 15,
      rotationSpeed: 10,
    };

    const imageParticleCount = 10;
    const imagePaths = Array.from(
      { length: imageParticleCount },
      (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
    );

    // Preload images
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });

    class Particle {
      constructor(element) {
        this.element = element;
        this.x = 0;
        this.y = 0;
        this.vx = (Math.random() - 0.5) * config.horizontalForce;
        this.vy = -config.verticalForce - Math.random() * 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
      }

      update() {
        this.vy += config.gravity;
        this.vx *= config.friction;
        this.vy *= config.friction;
        this.rotationSpeed *= config.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }

    const createParticles = () => {
      explosionContainer.innerHTML = "";
      imagePaths.forEach((path) => {
        const particle = document.createElement("img");
        particle.src = path;
        particle.classList.add("explosion-particle-img");
        particle.style.width = `${config.imageSize}px`;
        explosionContainer.appendChild(particle);
      });
    };

    const explode = () => {
      if (hasExplodedRef.current) return;
      hasExplodedRef.current = true;

      createParticles();

      const particleElements = explosionContainer.querySelectorAll(
        ".explosion-particle-img"
      );
      const particles = Array.from(particleElements).map(
        (el) => new Particle(el)
      );

      let animationId;
      const animate = () => {
        particles.forEach((p) => p.update());
        animationId = requestAnimationFrame(animate);
        if (
          particles.every((p) => p.y > explosionContainer.offsetHeight / 2)
        ) {
          cancelAnimationFrame(animationId);
        }
      };
      animate();
    };

    const checkFooterPosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top > viewportHeight + 100) {
        hasExplodedRef.current = false;
      }

      if (!hasExplodedRef.current && footerRect.top <= viewportHeight + 250) {
        explode();
      }
    };

    let checkTimeout;
    const onScroll = () => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkFooterPosition, 5);
    };

    const onResize = () => {
      hasExplodedRef.current = false;
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    createParticles();
    setTimeout(checkFooterPosition, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(checkTimeout);
    };
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-container">
        <div className="footer-symbols footer-symbols-1">
          <img src="/images/global/s6.png" alt="" />
          <img src="/images/global/s6.png" alt="" />
        </div>
        <div className="footer-symbols footer-symbols-2">
          <img src="/images/global/s6.png" alt="" />
          <img src="/images/global/s6.png" alt="" />
        </div>
        <div className="footer-header">
          <h1>Isha Raghav</h1>
        </div>
        <div className="footer-row">
          <div className="footer-col">
            <p>Quick Jumps</p>
            <p>
              <TransitionLink href="/work">Portfolio</TransitionLink>
            </p>
            <p>
              <TransitionLink href="/about">About</TransitionLink>
            </p>
            <p>
              <TransitionLink href="/contact">Contact</TransitionLink>
            </p>
          </div>
          <div className="footer-col">
            <p>Side Streets</p>
            <p>Roll the Showreel</p>
            <p>Weird Shop</p>
            <p>Buy Me a Coffee</p>
          </div>
          <div className="footer-col">
            <p>Social Signals</p>
            <p>
              <a href="https://www.youtube.com/@codegrid" target="_blank">
                YouTube
              </a>
            </p>
            <p>
              <a
                href="https://codegrid.gumroad.com/l/codegridpro"
                target="_blank"
              >
                Membership
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/codegridweb/"
                target="_blank"
              >
                Instagram
              </a>
            </p>
          </div>
          <div className="footer-col">
            <p>Alt Dimensions</p>
            <p>Logo Dump</p>
            <p>Freelance Top 100</p>
          </div>
        </div>
        <div className="copyright-info">
          <p className="mn">Backend portfolio · 2025</p>
          <p className="mn">//</p>
          <p className="mn">
            Built by{" "}
            <a href="https://www.youtube.com/@codegrid" target="_blank">
              Codegrid
            </a>
          </p>
        </div>
        <div className="explosion-container"></div>
      </div>
    </footer>
  );
}
