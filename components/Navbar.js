"use client";

import { useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Index" },
  { href: "/work", label: "The Good Stuff" },
  { href: "/about", label: "Meet Isha" },
  { href: "/contact", label: "Slide In" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const scrollYRef = useRef(0);

  const handleMenuToggle = useCallback(() => {
    if (isAnimatingRef.current) {
      gsap.killTweensOf([
        ".nav-overlay",
        ".open-label",
        ".close-label",
        ".nav-item",
      ]);
      isAnimatingRef.current = false;
    }

    if (!isMenuOpen) {
      isAnimatingRef.current = true;

      const navOverlay = document.querySelector(".nav-overlay");
      const menuBtn = document.querySelector(".menu-toggle-btn");
      if (navOverlay) navOverlay.style.pointerEvents = "all";
      if (menuBtn) menuBtn.classList.add("menu-open");

      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";

      gsap.to(".open-label", { y: "-1rem", duration: 0.3 });
      gsap.to(".close-label", { y: "-1rem", duration: 0.3 });
      gsap.to(".nav-overlay", {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      gsap.to(
        [".nav-item", ".nav-footer-item-header", ".nav-footer-item-copy"],
        {
          opacity: 1,
          y: "0%",
          duration: 0.75,
          stagger: 0.075,
          ease: "power4.out",
        }
      );

      setIsMenuOpen(true);
    } else {
      isAnimatingRef.current = true;

      const navOverlay = document.querySelector(".nav-overlay");
      const menuBtn = document.querySelector(".menu-toggle-btn");
      if (navOverlay) navOverlay.style.pointerEvents = "none";
      if (menuBtn) menuBtn.classList.remove("menu-open");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);

      gsap.to(".open-label", { y: "0rem", duration: 0.3 });
      gsap.to(".close-label", { y: "0rem", duration: 0.3 });
      gsap.to(".nav-overlay", {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(
            [".nav-item", ".nav-footer-item-header", ".nav-footer-item-copy"],
            { opacity: 0, y: "100%" }
          );
          isAnimatingRef.current = false;
        },
      });

      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();

      if (href === pathname) {
        handleMenuToggle();
        return;
      }

      // Close menu first
      const navOverlay = document.querySelector(".nav-overlay");
      const menuBtn = document.querySelector(".menu-toggle-btn");
      if (navOverlay) navOverlay.style.pointerEvents = "none";
      if (menuBtn) menuBtn.classList.remove("menu-open");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);

      gsap.to(".open-label", { y: "0rem", duration: 0.3 });
      gsap.to(".close-label", { y: "0rem", duration: 0.3 });
      gsap.to(".nav-overlay", { opacity: 0, duration: 0.3 });

      setIsMenuOpen(false);

      // Animate transition out
      gsap.set(".transition-overlay", { scaleY: 0, transformOrigin: "bottom" });
      gsap.to(".transition-overlay", {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [pathname, router, handleMenuToggle]
  );

  return (
    <>
      <nav>
        <div className="logo">
          <div className="logo-container">
            <p className="mn">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
              >
                Isha ✦ Raghav
              </a>
            </p>
          </div>
        </div>
        <div className="menu-toggle-btn" onClick={handleMenuToggle}>
          <div className="menu-toggle-btn-wrapper">
            <p className="mn open-label">Menu</p>
            <p className="mn close-label">Close</p>
          </div>
        </div>
      </nav>

      <div className="nav-overlay">
        <div className="nav-items">
          {navItems.map((item) => (
            <div
              key={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <p>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              </p>
            </div>
          ))}
        </div>
        <div className="nav-footer">
          <div className="nav-footer-item">
            <div className="nav-footer-item-header">
              <p className="mn">Find Me</p>
            </div>
            <div className="nav-footer-item-copy">
              <p className="mn">
                <a href="#" target="_blank">
                  Instagram
                </a>
              </p>
              <p className="mn">
                <a href="#" target="_blank">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
          <div className="nav-footer-item">
            <div className="nav-footer-item-copy">
              <p className="mn">Backend dev · 2025</p>
            </div>
          </div>
          <div className="nav-footer-item">
            <div className="nav-footer-item-header">
              <p className="mn">Say Hi</p>
            </div>
            <div className="nav-footer-item-copy">
              <p className="mn">
                <a href="mailto:hello@isharaghav.com" target="_blank">
                  hello@isharaghav.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
