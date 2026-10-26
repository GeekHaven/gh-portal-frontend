"use client";

import React, { useState, useEffect } from "react";
import "./styles/fonts.css";
import styles from "./styles/opencode-landing.module.css";
import HeroSection from "./components/HeroSection";
import SiteNavbar from "components/navbar/SiteNavbar";
import GlobalJourney from "./components/GlobalJourney";
import StatsRibbon from "./components/StatsRibbon";
import AboutSection from "./components/AboutSection";
import HowItWorks from "./components/HowItWorks";
import Projects from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import InitialLoader from "components/common/InitialLoader";

export default function OpenCodeLandingView() {
  const [showLoader, setShowLoader] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show splash entrance on initial page load per session
    try {
      const hasVisited = sessionStorage.getItem("opencode_splash_seen");
      if (!hasVisited) {
        setShowLoader(true);
        sessionStorage.setItem("opencode_splash_seen", "true");
      }
    } catch {
      // Fallback for private browsing mode without storage access
      setShowLoader(false);
    }
  }, []);

  return (
    <div className={`${styles.landingRoot} opencode-landing-root relative w-full overflow-x-hidden selection:bg-[var(--accent)]/15 selection:text-[var(--foreground)]`}>
      {mounted && showLoader && (
        <InitialLoader onComplete={() => setShowLoader(false)} />
      )}
      <SiteNavbar />
      <main className="w-full">
        <GlobalJourney />
        <HeroSection />
        <StatsRibbon />
        <AboutSection />
        <HowItWorks />
        <Projects />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
