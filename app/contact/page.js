"use client";

import { useEffect, useRef } from "react";

export default function ContactPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDesktop = window.innerWidth > 1000;
    let animationId = null;
    let mouseMoveListener = null;

    const config = {
      imageCount: 10,
      imageLifespan: 750,
      removalDelay: 50,
      mouseThreshold: 100,
      inDuration: 750,
      outDuration: 1000,
      inEasing: "cubic-bezier(.07,.5,.5,1)",
      outEasing: "cubic-bezier(.87, 0, .13, 1)",
    };

    const images = Array.from(
      { length: config.imageCount },
      (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
    );
    const trail = [];

    let mouseX = 0,
      mouseY = 0,
      lastMouseX = 0,
      lastMouseY = 0;
    let isCursorInContainer = false;
    let lastRemovalTime = 0;

    const isInContainer = (x, y) => {
      const rect = container.getBoundingClientRect();
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    };

    const hasMovedEnough = () => {
      const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
      );
      return distance > config.mouseThreshold;
    };

    const createImage = () => {
      const img = document.createElement("img");
      img.classList.add("trail-img");

      const randomIndex = Math.floor(Math.random() * images.length);
      const rotation = (Math.random() - 0.5) * 50;
      img.src = images[randomIndex];

      const rect = container.getBoundingClientRect();
      const relativeX = mouseX - rect.left;
      const relativeY = mouseY - rect.top;

      img.style.left = `${relativeX}px`;
      img.style.top = `${relativeY}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

      container.appendChild(img);

      setTimeout(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      }, 10);

      trail.push({
        element: img,
        rotation,
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (now - lastRemovalTime < config.removalDelay || trail.length === 0)
        return;

      const oldestImage = trail[0];
      if (now >= oldestImage.removeTime) {
        const imgToRemove = trail.shift();
        imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
        imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
        lastRemovalTime = now;

        setTimeout(() => {
          if (imgToRemove.element.parentNode) {
            imgToRemove.element.parentNode.removeChild(imgToRemove.element);
          }
        }, config.outDuration);
      }
    };

    const startAnimation = () => {
      if (!isDesktop) return;

      mouseMoveListener = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isCursorInContainer = isInContainer(mouseX, mouseY);

        if (isCursorInContainer && hasMovedEnough()) {
          lastMouseX = mouseX;
          lastMouseY = mouseY;
          createImage();
        }
      };

      document.addEventListener("mousemove", mouseMoveListener);

      const animate = () => {
        removeOldImages();
        animationId = requestAnimationFrame(animate);
      };
      animate();
    };

    const stopAnimation = () => {
      if (mouseMoveListener) {
        document.removeEventListener("mousemove", mouseMoveListener);
        mouseMoveListener = null;
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      trail.forEach((item) => {
        if (item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      trail.length = 0;
    };

    const handleResize = () => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth > 1000;
      if (isDesktop && !wasDesktop) startAnimation();
      else if (!isDesktop && wasDesktop) stopAnimation();
    };

    window.addEventListener("resize", handleResize);
    if (isDesktop) startAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      stopAnimation();
    };
  }, []);

  return (
    <div className="page contact-page">
      <section className="contact trail-container" ref={containerRef}>
        <div className="contact-card contact-card-1">
          <div className="contact-card-header-main">
            <h1>Isha is listening</h1>
            <p>
              Need help with APIs, data modeling, or scaling a service? Want a
              second pair of eyes on architecture? Whether you have a full spec
              or a rough problem statement, reach out — I reply to real
              engineering mail.
            </p>
          </div>
          <p className="mn contact-card-header">Project &amp; contracts</p>
          <p className="mn">work@isharaghav.com</p>
          <br />
          <p className="mn contact-card-header">General</p>
          <p className="mn">hello@isharaghav.com</p>
        </div>
        <div className="contact-card contact-card-2">
          <p className="mn contact-card-header">Drop a Line &#8599;</p>
        </div>
        <div className="contact-symbol">
          <img src="/images/global/symbols.png" alt="" />
        </div>
      </section>
    </div>
  );
}
