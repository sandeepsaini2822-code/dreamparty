"use client";

import { MouseEvent as RMouseEvent } from "react";
import { BTN_PRIMARY, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

interface NavbarProps {
  count: number;
  onCartOpen: () => void;
}

export default function Navbar({ count, onCartOpen }: NavbarProps) {
  const { isMobile, isTablet } = useViewport();

  const navPad = isMobile ? "12px 14px" : isTablet ? "16px 24px" : "18px 40px";

  const aHoverGold = (e: RMouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.currentTarget.style.color = G.goldLight;
    }
  };

  const aHoverDim = (e: RMouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.currentTarget.style.color = G.creamDim;
    }
  };

  const btnHoverIn = (e: RMouseEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      e.currentTarget.style.background =
        "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
      e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
      e.currentTarget.style.transform = "translateY(-1px)";
    }
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      e.currentTarget.style.background = G.gradPrimary;
      e.currentTarget.style.boxShadow = G.shadowGlow;
      e.currentTarget.style.transform = "translateY(0)";
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? 12 : 18,
        padding: navPad,
        background:
          "linear-gradient(to bottom, rgba(15,12,10,0.96) 0%, rgba(15,12,10,0.78) 58%, rgba(15,12,10,0.35) 82%, transparent 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(245,158,11,0.08)",
      }}
    >
      {/* Top Row */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: isMobile ? "1rem" : isTablet ? "1.25rem" : "1.5rem",
            color: G.goldLight,
            fontStyle: "italic",
            letterSpacing: isMobile ? "0.05em" : "0.08em",
            flexShrink: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Dream Party
        </div>

        {!isMobile && (
          <button
            onClick={onCartOpen}
            onMouseEnter={btnHoverIn}
            onMouseLeave={btnHoverOut}
            style={{
              ...BTN_PRIMARY,
              padding: isTablet ? "10px 18px" : "11px 24px",
              fontSize: isTablet ? "0.74rem" : "0.78rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minHeight: 42,
              flexShrink: 0,
            }}
          >
            <span>🛒 Cart</span>
            {count > 0 && (
              <span
                style={{
                  background: G.dark,
                  color: G.goldLight,
                  borderRadius: "999px",
                  minWidth: 22,
                  height: 22,
                  padding: "0 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  border: "1px solid rgba(245,158,11,0.25)",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: isMobile ? 10 : isTablet ? 22 : 34,
          width: "100%",
        }}
      >
        {["Menu", "Gallery", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              color: G.creamDim,
              textDecoration: "none",
              fontSize: isMobile ? "0.72rem" : "0.82rem",
              letterSpacing: isMobile ? "0.1em" : "0.18em",
              textTransform: "uppercase",
              padding: isMobile ? "8px 10px" : "6px 4px",
              minHeight: isMobile ? 40 : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={aHoverGold}
            onMouseLeave={aHoverDim}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Mobile Cart Button */}
      {isMobile && (
        <button
          onClick={onCartOpen}
          style={{
            ...BTN_PRIMARY,
            width: "100%",
            padding: "12px 16px",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            minHeight: 46,
          }}
        >
          <span>🛒 Cart</span>
          {count > 0 && (
            <span
              style={{
                background: G.dark,
                color: G.goldLight,
                borderRadius: "999px",
                minWidth: 22,
                height: 22,
                padding: "0 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                border: "1px solid rgba(245,158,11,0.25)",
                lineHeight: 1,
              }}
            >
              {count}
            </span>
          )}
        </button>
      )}
    </nav>
  );
}