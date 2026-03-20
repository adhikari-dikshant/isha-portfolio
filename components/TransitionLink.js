"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ href, children, ...props }) {
  const router = useRouter();

  const handleClick = useCallback(
    (e) => {
      // Allow external links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      e.preventDefault();

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
    [href, router]
  );

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
