/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, Variants, MotionValue } from 'framer-motion';
import { TimeTheme } from '../types';
import { motionTokens } from '../lib/motion';

interface EditorialDeckCardsProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'archive' | 'about') => void;
  cardWidth: number;
  cardHeight: number;
  cardTop: number;
  card2Left: number;
  card3Left: number;
  isDesktop: boolean;
  theme: TimeTheme;
  windowWidth: number;
  windowHeight: number;
  deckRepelX?: MotionValue<number>;
}

/**
 * Signature cursive "mh." monogram icon
 * Matching the exact pen stroke signature from the header
 */
const SignatureIcon: React.FC<{ color?: string }> = ({ color = 'currentColor' }) => (
  <svg
    width="54"
    height="28"
    viewBox="0 0 102 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
  >
    <path
      d="M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="99" cy="37" r="1.8" fill={color} />
  </svg>
);

const MENU_REVEAL_EASE = motionTokens.easing.menu;

// Parent deck container coordinating sequential entrance with staggerChildren
const deckContainerVariants: Variants = {
  closed: {
    pointerEvents: 'none',
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
  open: {
    pointerEvents: 'auto',
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
      staggerDirection: 1,
    },
  },
};

// Child card entrance variants with 3D perspective fan-out
const card2Variants: Variants = {
  closed: {
    x: 90,
    y: 28,
    opacity: 0,
    rotateY: -8,
    scale: 0.95,
    transition: {
      duration: motionTokens.duration.navigationExit,
      ease: MENU_REVEAL_EASE,
    },
  },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: motionTokens.duration.navigation,
      ease: MENU_REVEAL_EASE,
    },
  },
};

const card3Variants: Variants = {
  closed: {
    x: 140,
    y: 36,
    opacity: 0,
    rotateY: -12,
    scale: 0.93,
    transition: {
      duration: motionTokens.duration.navigationExit,
      ease: MENU_REVEAL_EASE,
    },
  },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    rotateY: -1.5,
    scale: 1,
    transition: {
      duration: motionTokens.duration.navigationDepth,
      ease: MENU_REVEAL_EASE,
    },
  },
};

export const EditorialDeckCards: React.FC<EditorialDeckCardsProps> = ({
  isOpen,
  onClose,
  onNavigate,
  cardWidth,
  cardHeight,
  cardTop,
  card2Left,
  card3Left,
  isDesktop,
  theme,
  deckRepelX,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: '0px',
    boxShadow: 'none',
    transformStyle: 'preserve-3d',
  };

  return (
    <motion.div
      variants={deckContainerVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 pointer-events-none z-24 [perspective:1400px]"
    >
      {/* ========================================================
          CARD 2: ARCHIVE
          - Top-left: MERAJ / HOSSAIN (small stacked sans-serif)
          - Top-right: "mh." cursive signature
          - Title: "archive" (lowercase editorial grotesque)
          - Bottom: 3 columns of photography
          - Entrance: Sequential slide-in from bottom with 3D perspective fan-out
          ======================================================== */}
      <motion.div
        variants={card2Variants}
        onClick={() => isOpen && onNavigate('archive')}
        className={`group cursor-pointer select-none flex flex-col justify-between p-6 sm:p-7 overflow-hidden ${
          isDesktop ? 'fixed' : 'relative shrink-0'
        }`}
        style={{
          ...cardStyle,
          x: deckRepelX,
          width: isDesktop ? `${cardWidth}px` : 'min(360px, 86vw)',
          height: isDesktop ? `${cardHeight}px` : '540px',
          top: isDesktop ? `${cardTop}px` : undefined,
          left: isDesktop ? `${card2Left}px` : undefined,
          zIndex: isOpen ? 24 : -10,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        title="Open Archive"
      >
        {/* Top Header: MERAJ / HOSSAIN on left + Signature on right */}
        <div className="flex items-start justify-between w-full">
          <div className="font-sans text-[11px] font-normal tracking-[0.14em] uppercase leading-[1.25] opacity-85">
            <div>MERAJ</div>
            <div>HOSSAIN</div>
          </div>
          <SignatureIcon color={theme.isLight ? '#18C98A' : theme.text} />
        </div>

        {/* Lowercase Title "archive" */}
        <div className="mt-3.5 mb-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light tracking-tight lowercase leading-none group-hover:translate-x-1 transition-transform duration-300">
            archive
          </h2>
        </div>

        {/* 3 Columns of Portfolio Items (Mirror Cube, Editorial Spread, Copenhagen text column) */}
        <div className="w-full pt-4">
          <div className="grid grid-cols-3 gap-2 h-[220px] sm:h-[340px] w-full overflow-hidden items-stretch">
            {/* Column 1: Bestseller Mirrored Cube */}
            <div
              className="h-full overflow-hidden rounded-none bg-[#16181e]"
              style={{ border: `1px solid ${theme.border}` }}
            >
              <img
                src="/assets/site/BESTSELLER.BwMYxazI.jpg"
                alt="Bestseller Archive"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Column 2: Editorial Spread */}
            <div
              className="h-full overflow-hidden rounded-none bg-[#16181e]"
              style={{ border: `1px solid ${theme.border}` }}
            >
              <img
                src="/assets/site/archive_02.Dm2AgCPJ.jpg"
                alt="Editorial Lookbook"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Column 3: Copenhagen Fashion Week Locations */}
            <div
              className="h-full overflow-hidden rounded-none bg-[#16181e]"
              style={{ border: `1px solid ${theme.border}` }}
            >
              <img
                src="/assets/site/COPENHAGEN_FASHION_WEEK.Cif1zX-w.jpg"
                alt="Copenhagen Fashion Week"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          CARD 3: ABOUT
          - Top-left: MERAJ / HOSSAIN (small stacked sans-serif)
          - Top-right: "mh." cursive signature
          - Title: "about" (lowercase editorial grotesque)
          - Bottom: Seated portrait of Meraj in wooden chair with green plant
          - Entrance: Sequential slide-in from bottom with perspective fan-out
          ======================================================== */}
      <motion.div
        variants={card3Variants}
        onClick={() => isOpen && onNavigate('about')}
        className={`group cursor-pointer select-none flex flex-col justify-between p-6 sm:p-7 overflow-hidden ${
          isDesktop ? 'fixed' : 'relative shrink-0'
        }`}
        style={{
          ...cardStyle,
          x: deckRepelX,
          width: isDesktop ? `${cardWidth}px` : 'min(360px, 86vw)',
          height: isDesktop ? `${cardHeight}px` : '540px',
          top: isDesktop ? `${cardTop}px` : undefined,
          left: isDesktop ? `${card3Left}px` : undefined,
          zIndex: isOpen ? 23 : -10,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        title="Open About"
      >
        {/* Top Header: MERAJ / HOSSAIN on left + Signature on right */}
        <div className="flex items-start justify-between w-full">
          <div className="font-sans text-[11px] font-normal tracking-[0.14em] uppercase leading-[1.25] opacity-85">
            <div>MERAJ</div>
            <div>HOSSAIN</div>
          </div>
          <SignatureIcon color={theme.isLight ? '#18C98A' : theme.text} />
        </div>

        {/* Lowercase Title "about" */}
        <div className="mt-3.5 mb-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light tracking-tight lowercase leading-none group-hover:translate-x-1 transition-transform duration-300">
            about
          </h2>
        </div>

        {/* Clean Seated Portrait Photography Frame */}
        <div className="w-full pt-4">
          <div
            className="h-[220px] sm:h-[340px] w-full overflow-hidden rounded-none bg-[#16181e]"
            style={{ border: `1px solid ${theme.border}` }}
          >
            <img
              src="/assets/site/image-1.COdZ4MWx.jpg"
              alt="Meraj Hossain Portrait"
              className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
