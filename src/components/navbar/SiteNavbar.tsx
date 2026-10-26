'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight, User, LogOut } from 'lucide-react';
import { useAuth } from 'contexts/AuthContext';
import { useFeatures } from 'contexts/FeaturesContext';
import ThemeToggle from 'components/japanese/ThemeToggle';
import OpenCodeLogo from 'components/common/OpenCodeLogo';

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const { features } = useFeatures();

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileName, setProfileName] = useState<string>('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setProfileName(user?.name?.split(' ')?.[0] || user?.githubId || 'Profile');
      }
    } catch {
      setProfileName('Profile');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const flagshipEvent = features?.flagshipEvent || 'Opencode';

  const baseNavigation = [
    { label: 'Events', href: '/user/events' },
    { label: 'Leaderboard', href: `/user/leaderboard/${flagshipEvent}` },
    { label: 'Repositories', href: '/user/repos' },
    { label: 'Milestones', href: '/user/milestones' },
    { label: 'Canvas', href: '/user/rplace' },
    { label: 'Winners', href: '/user/winners' },
    { label: 'FAQ', href: '/faq' },
  ];

  const activeNavigation = baseNavigation.filter((item) => {
    if (item.href === '/user/winners' && !features.showWinners) return false;
    if (item.href === '/user/milestones' && !features.showMilestones) return false;
    if (item.href.includes('/leaderboard') && !features.showLeaderboard) return false;
    if (item.href === '/user/repos' && !features.showRepositories) return false;
    if (item.href === '/user/rplace' && !features.showRPlace) return false;
    return true;
  });

  // Include Profile in navigation items when logged in
  if (mounted && isLoggedIn) {
    activeNavigation.push({ label: 'Profile', href: '/user/profile' });
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('/leaderboard')) return pathname?.includes('/leaderboard');
    if (href.includes('/profile')) return pathname?.includes('/profile');
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    router.push('/auth/sign-in');
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-xs py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Desktop 3-Column Grid: [Logo | Nav (Truly Centered) | Right Slot] */}
          <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center w-full gap-6">
            
            {/* 1. TOP LEFT: OpenCode logo */}
            <div className="justify-self-start flex items-center">
              <Link
                href="/"
                className="group flex items-center gap-2.5 text-[var(--foreground)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                aria-label="OpenCode 2026 Home"
              >
                <OpenCodeLogo
                  width={22}
                  height={22}
                  color="var(--foreground)"
                  className="transition-opacity group-hover:opacity-75"
                />
                <span className="font-serif text-[15px] font-medium tracking-wide text-[var(--foreground)]">
                  OPENCODE <span className="font-mono text-xs text-[var(--accent)] tracking-normal">&apos;26</span>
                </span>
              </Link>
            </div>

            {/* 2. TOP CENTER: Navbar text-only links truly centered on the page */}
            <nav
              className="justify-self-center flex items-center gap-4 xl:gap-7"
              aria-label="Main Navigation"
            >
              {activeNavigation.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 text-[11px] xl:text-xs font-mono tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                      active
                        ? 'text-[var(--foreground)] font-semibold'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Active link thin underline in accent color */}
                    {active && (
                      <span
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[var(--accent)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. RIGHT SLOT: Auth CTA (Profile / Sign In) & Theme Toggle */}
            <div className="justify-self-end flex items-center gap-3">
              <ThemeToggle />

              {mounted && isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/user/profile"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
                      pathname?.includes('/profile')
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)] font-medium'
                        : 'border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] bg-[var(--surface)]'
                    }`}
                    title="View your profile"
                  >
                    <User size={13} className={pathname?.includes('/profile') ? 'text-[var(--accent-foreground)]' : 'text-[var(--accent)]'} />
                    <span className="max-w-[100px] truncate">{profileName || 'Profile'}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1.5 rounded-[2px] text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="px-3.5 py-1.5 rounded-[2px] border border-[var(--border)] hover:border-[var(--foreground)] text-xs font-mono uppercase tracking-wider text-[var(--foreground)] bg-[var(--surface)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  Sign In
                </Link>
              )}
            </div>

          </div>

          {/* Mobile/Tablet Header: Logo Left, Theme + Hamburger Right (<1024px) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--foreground)]"
              onClick={() => setIsMobileOpen(false)}
            >
              <OpenCodeLogo width={20} height={20} color="var(--foreground)" />
              <span className="font-serif text-sm font-medium tracking-wide">
                OPENCODE <span className="font-mono text-xs text-[var(--accent)]">&apos;26</span>
              </span>
            </Link>

            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                className="p-2 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--foreground)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                aria-expanded={isMobileOpen}
                aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile/Tablet Menu (<1024px) */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col justify-between pt-24 pb-10 px-8 lg:hidden overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Links">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="font-serif text-xl sm:text-2xl text-[var(--foreground)] border-b border-[var(--border)] pb-3"
            >
              Overview
            </Link>
            {activeNavigation.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`font-serif text-xl sm:text-2xl flex items-center justify-between border-b border-[var(--border)] pb-3 transition-colors ${
                    active ? 'text-[var(--accent)] font-semibold' : 'text-[var(--foreground)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.label === 'Profile' && <User size={20} className="text-[var(--accent)]" />}
                    <span>{item.label}</span>
                  </div>
                  <ArrowUpRight size={18} className="text-[var(--muted-foreground)]" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[var(--border)] flex flex-col gap-3">
            {mounted && isLoggedIn ? (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/user/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 rounded-[2px] bg-[var(--accent)] text-[var(--accent-foreground)] text-center text-xs font-mono uppercase tracking-wider font-medium flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  <User size={15} />
                  <span>My Profile ({profileName || 'Contributor'})</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-center text-xs font-mono uppercase tracking-wider font-medium hover:border-[var(--accent)] transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-center text-xs font-mono uppercase tracking-wider font-medium hover:border-[var(--foreground)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  Sign In to OpenCode
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-2.5 rounded-[2px] bg-[var(--accent)] text-[var(--accent-foreground)] text-center text-xs font-mono uppercase tracking-wider font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  Create Account
                </Link>
              </div>
            )}
            <p className="text-[11px] font-mono text-[var(--muted-foreground)] text-center pt-2">
              GeekHaven IIIT Allahabad • Winter 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}
