/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, Variants, MotionValue } from 'framer-motion';
import { TimeTheme } from '../types';
import { motionTokens } from '../lib/motion';
import { ProgressiveImage } from './motion/ProgressiveImage';

export type DeckCardId = 'archive' | 'about';

interface EditorialDeckCardsProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: DeckCardId) => void;
  cardWidth: number;
  cardHeight: number;
  cardTop: number;
  /** Left edge of the front ("cases") card; the mobile stack tucks behind it. */
  card1Left: number;
  card2Left: number;
  card3Left: number;
  isDesktop: boolean;
  theme: TimeTheme;
  windowWidth: number;
  windowHeight: number;
  deckRepelX?: MotionValue<number>;
  /** Lets the parent dim the other cards while one is hovered or focused. */
  onHoverCard?: (card: DeckCardId | null) => void;
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
    className="opacity-90 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:opacity-100 group-hover:scale-105"
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
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
  open: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
      staggerDirection: 1,
    },
  },
};

/**
 * Card fan-out. On desktop the cards sit side by side and slide in from the
 * right with a little 3D tilt. On mobile there is no room beside the front
 * card, so they stack behind it like a deck and peek out at the corner.
 * `custom` is `true` when the layout is the mobile stack.
 */
const stackOffset = { 2: { x: 12, y: 14, scale: 0.965 }, 3: { x: 24, y: 28, scale: 0.93 } } as const;

function deckCardVariants(slot: 2 | 3): Variants {
  const stack = stackOffset[slot];
  return {
    closed: (mobile: boolean) => ({
      x: mobile ? stack.x + 70 : slot === 2 ? 90 : 140,
      y: mobile ? stack.y + 24 : slot === 2 ? 28 : 36,
      opacity: 0,
      rotateY: slot === 2 ? -8 : -12,
      scale: mobile ? stack.scale - 0.04 : slot === 2 ? 0.95 : 0.93,
      transition: {
        duration: motionTokens.duration.navigationExit,
        ease: MENU_REVEAL_EASE,
      },
    }),
    open: (mobile: boolean) => ({
      x: mobile ? stack.x : 0,
      y: mobile ? stack.y : 0,
      opacity: 1,
      rotateY: mobile ? 0 : slot === 2 ? 0 : -1.5,
      scale: mobile ? stack.scale : 1,
      transition: {
        duration: slot === 2 ? motionTokens.duration.navigation : motionTokens.duration.navigationDepth,
        ease: MENU_REVEAL_EASE,
      },
    }),
  };
}

const card2Variants = deckCardVariants(2);
const card3Variants = deckCardVariants(3);

const CardHeader: React.FC<{ theme: TimeTheme }> = ({ theme }) => (
  <div className="flex items-start justify-between w-full">
    <div className="header-name-roll cursor-pointer font-sans text-[11px] font-normal tracking-[0.14em] uppercase leading-[1.25] opacity-85">
      {['MERAJ', 'HOSSAIN'].map((name) => (
        <div key={name} className="text-roll-window relative h-[14px] overflow-hidden">
          <div className="text-roll-current">{name}</div>
          <div
            aria-hidden="true"
            className="text-roll-next absolute inset-0"
            style={{ color: theme.isLight ? '#0B8A5A' : '#34EEA0' }}
          >
            {name}
          </div>
        </div>
      ))}
    </div>
    <SignatureIcon color={theme.isLight ? '#18C98A' : theme.text} />
  </div>
);

export const EditorialDeckCards: React.FC<EditorialDeckCardsProps> = ({
  isOpen,
  onClose,
  onNavigate,
  cardWidth,
  cardHeight,
  cardTop,
  card1Left,
  card2Left,
  card3Left,
  isDesktop,
  theme,
  deckRepelX,
  onHoverCard,
}) => {
  const mobile = !isDesktop;
  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: '0px',
    boxShadow: 'none',
  };

  const open = (card: DeckCardId) => {
    if (isOpen) onNavigate(card);
  };

  const keyActivate = (card: DeckCardId) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open(card);
    }
  };

  const hoverProps = (card: DeckCardId) => ({
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === 'mouse' && isOpen) onHoverCard?.(card);
    },
    onPointerLeave: () => onHoverCard?.(null),
    onFocus: () => onHoverCard?.(card),
    onBlur: () => onHoverCard?.(null),
  });

  return (
    <motion.div
      variants={deckContainerVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-24 [perspective:1400px]"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* ========================================================
          CARD 2: ARCHIVE
          Outer element owns the entrance (position, tilt, fade); the inner
          one owns the pointer "repel" so the two never fight over `x`.
          ======================================================== */}
      <motion.div
        variants={card2Variants}
        custom={mobile}
        className="fixed"
        style={{
          transformStyle: 'preserve-3d',
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          top: `${cardTop}px`,
          left: `${mobile ? card1Left : card2Left}px`,
          zIndex: 24,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <motion.div
          role="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Open archive"
          aria-hidden={!isOpen}
          data-cursor="open"
          data-deck-card="archive"
          onClick={() => open('archive')}
          onKeyDown={keyActivate('archive')}
          {...hoverProps('archive')}
          className="group select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 sm:p-7"
          style={{ ...cardStyle, x: deckRepelX }}
        >
          <CardHeader theme={theme} />

          <div className="mt-3.5 mb-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light tracking-tight lowercase leading-none transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-1.5">
              archive
            </h2>
          </div>

          <div className="w-full pt-4">
            <div className="grid grid-cols-3 gap-2 h-[220px] sm:h-[340px] w-full overflow-hidden items-stretch">
              {[
                { src: '/assets/site/BESTSELLER.BwMYxazI.jpg', alt: 'Bestseller Archive' },
                { src: '/assets/site/archive_02.Dm2AgCPJ.jpg', alt: 'Editorial Lookbook' },
                { src: '/assets/site/COPENHAGEN_FASHION_WEEK.Cif1zX-w.jpg', alt: 'Copenhagen Fashion Week' },
              ].map((image) => (
                <div
                  key={image.src}
                  className="h-full overflow-hidden rounded-none bg-[#16181e]"
                  style={{ border: `1px solid ${theme.border}` }}
                >
                  <ProgressiveImage
                    src={image.src}
                    alt={image.alt}
                    className="transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================
          CARD 3: ABOUT
          ======================================================== */}
      <motion.div
        variants={card3Variants}
        custom={mobile}
        className="fixed"
        style={{
          transformStyle: 'preserve-3d',
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          top: `${cardTop}px`,
          left: `${mobile ? card1Left : card3Left}px`,
          zIndex: 23,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <motion.div
          role="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Open about"
          aria-hidden={!isOpen}
          data-cursor="open"
          data-deck-card="about"
          onClick={() => open('about')}
          onKeyDown={keyActivate('about')}
          {...hoverProps('about')}
          className="group select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 sm:p-7"
          style={{ ...cardStyle, x: deckRepelX }}
        >
          <CardHeader theme={theme} />

          <div className="mt-3.5 mb-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light tracking-tight lowercase leading-none transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-1.5">
              about
            </h2>
          </div>

          <div className="w-full pt-4">
            <div
              className="h-[220px] sm:h-[340px] w-full overflow-hidden rounded-none bg-[#16181e]"
              style={{ border: `1px solid ${theme.border}` }}
            >
              <ProgressiveImage
                src="/assets/site/image-1.COdZ4MWx.jpg"
                alt="Meraj Hossain Portrait"
                className="object-contain object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
