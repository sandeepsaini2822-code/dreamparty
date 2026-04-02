"use client";

import { MouseEvent as RMouseEvent } from "react";
import { G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

const FOOTER_LINKS = [
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const { isMobile, isTablet } = useViewport();

  const handleScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const navbarOffset = isMobile ? 130 : 90;
    const y = el.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const aHoverGold = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile) return;
    e.currentTarget.style.color = G.goldLight;
  };

  const aHoverTextDim = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile) return;
    e.currentTarget.style.color = G.textDim;
  };

  return (
    <footer
      style={{
        background: G.dark2,
        padding: isMobile ? "26px 14px" : isTablet ? "34px 24px" : "40px 48px",
        borderTop: "1px solid rgba(245,158,11,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
          gap: isMobile ? 18 : isTablet ? 22 : 26,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: 8,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              fontStyle: "italic",
              color: G.goldLight,
              lineHeight: 1.2,
            }}
          >
            Dream Party
          </div>

          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "0.76rem" : "0.8rem",
              letterSpacing: isMobile ? "0.06em" : "0.1em",
              color: G.textDim,
              lineHeight: 1.7,
            }}
          >
            © 2025 Dream Party Café. All rights reserved.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? 10 : isTablet ? 18 : 24,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleScroll(link.id)}
              onMouseEnter={aHoverGold}
              onMouseLeave={aHoverTextDim}
              style={{
                background: "transparent",
                border: "none",
                color: G.textDim,
                textDecoration: "none",
                fontSize: isMobile ? "0.76rem" : "0.8rem",
                letterSpacing: isMobile ? "0.1em" : "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: isMobile ? "8px 10px" : "6px 8px",
                borderRadius: 999,
                lineHeight: 1.2,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}