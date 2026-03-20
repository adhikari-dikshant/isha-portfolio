"use client";

import TransitionLink from "./TransitionLink";

export default function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="contact-button">
        <TransitionLink href="/contact" />
        <div className="contact-text-small">
          <p>Greenfield APIs, refactors, or architecture chats welcome</p>
        </div>
        <div className="contact-text-large">
          <h1>Hit Me Up</h1>
        </div>
      </div>
    </section>
  );
}
