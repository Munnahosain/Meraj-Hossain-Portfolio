/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { ArchiveItem, MerajProfile, TimeTheme, ViewMode } from '../types';
import { motionTokens } from '../lib/motion';
import { ProgressiveImage } from './motion/ProgressiveImage';
import { ArchiveView } from './ArchiveView';
import { AboutView } from './AboutView';

export type DeckCardId = 'archive' | 'about';

interface EditorialDeckCardsProps {
  isOpen: boolean;
  activeView: ViewMode;
  onClose: () => void;
  onNavigate: (view: DeckCardId) => void;
  onCloseExpanded: () => void;
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
  persona: MerajProfile;
  archiveItems: ArchiveItem[];
  onOpenContact: () => void;
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

const stackOffset = { 2: { x: 12, y: 14, scale: 0.965 }, 3: { x: 24, y: 28, scale: 0.93 } } as const;

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
  activeView,
  onClose,
  onNavigate,
  onCloseExpanded,
  cardWidth,
  cardHeight,
  cardTop,
  card1Left,
  card2Left,
  card3Left,
  isDesktop,
  theme,
  windowWidth,
  windowHeight,
  deckRepelX,
  onHoverCard,
  persona,
  archiveItems,
  onOpenContact,
}) => {
  const mobile = !isDesktop;
  const isArchiveExpanded = activeView === 'archive';
  const isAboutExpanded = activeView === 'about';
  const anyExpanded = isArchiveExpanded || isAboutExpanded;

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: '0px',
    boxShadow: 'none',
  };

  const open = (card: DeckCardId) => {
    if (isOpen && !anyExpanded) onNavigate(card);
  };

  const keyActivate = (card: DeckCardId) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open(card);
    }
  };

  const hoverProps = (card: DeckCardId) => ({
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === 'mouse' && isOpen && !anyExpanded) onHoverCard?.(card);
    },
    onPointerLeave: () => onHoverCard?.(null),
    onFocus: () => onHoverCard?.(card),
    onBlur: () => onHoverCard?.(null),
  });

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget && isOpen && !anyExpanded) onClose();
      }}
      className={`fixed inset-0 [perspective:1400px] ${
        anyExpanded ? 'z-50 pointer-events-auto' : isOpen ? 'z-24 pointer-events-auto' : 'z-0 pointer-events-none'
      }`}
    >
      {/* ========================================================
          CARD 2: ARCHIVE
          Expands directly from Card 2's deck coordinates (card2Left, cardTop)
          out to fullscreen, and collapses seamlessly back into that position!
          ======================================================== */}
      <motion.div
        initial={false}
        animate={
          isArchiveExpanded
            ? {
                top: 0,
                left: 0,
                width: windowWidth,
                height: windowHeight,
                opacity: 1,
                zIndex: 50,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
              }
            : isOpen
            ? {
                top: cardTop,
                left: mobile ? card1Left : card2Left,
                width: cardWidth,
                height: cardHeight,
                opacity: isAboutExpanded ? 0 : 1,
                zIndex: 24,
                x: mobile ? stackOffset[2].x : 0,
                y: mobile ? stackOffset[2].y : 0,
                scale: mobile ? stackOffset[2].scale : 1,
                rotateY: mobile ? 0 : 0,
              }
            : {
                top: cardTop,
                left: mobile ? card1Left : card2Left,
                width: cardWidth,
                height: cardHeight,
                opacity: 0,
                zIndex: 24,
                x: mobile ? stackOffset[2].x + 70 : 90,
                y: mobile ? stackOffset[2].y + 24 : 28,
                scale: mobile ? stackOffset[2].scale - 0.04 : 0.95,
                rotateY: -8,
              }
        }
        transition={{
          duration: 0.65,
          ease: [0.65, 0, 0.35, 1],
        }}
        className={`fixed transform-gpu ${
          isArchiveExpanded
            ? 'overflow-hidden pointer-events-auto'
            : isOpen && !anyExpanded
            ? 'pointer-events-auto overflow-hidden'
            : 'pointer-events-none overflow-hidden'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          backgroundColor: theme.bg,
          color: theme.text,
          border: isArchiveExpanded ? '0px solid transparent' : `1px solid ${theme.border}`,
          borderRadius: '0px',
          boxShadow: 'none',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isArchiveExpanded ? (
            <motion.div
              key="full-archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <ArchiveView theme={theme} items={archiveItems} onClose={onCloseExpanded} />
            </motion.div>
          ) : (
            <motion.div
              key="deck-archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="button"
              tabIndex={isOpen && !anyExpanded ? 0 : -1}
              aria-label="Open archive"
              aria-hidden={!isOpen || anyExpanded}
              data-cursor="open"
              data-deck-card="archive"
              onClick={() => open('archive')}
              onKeyDown={keyActivate('archive')}
              {...hoverProps('archive')}
              className="group select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 sm:p-7 cursor-pointer"
              style={{ x: deckRepelX }}
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
          )}
        </AnimatePresence>
      </motion.div>

      {/* ========================================================
          CARD 3: ABOUT
          Expands directly from Card 3's deck coordinates (card3Left, cardTop)
          out to fullscreen, and collapses seamlessly back into that position!
          ======================================================== */}
      <motion.div
        initial={false}
        animate={
          isAboutExpanded
            ? {
                top: 0,
                left: 0,
                width: windowWidth,
                height: windowHeight,
                opacity: 1,
                zIndex: 50,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
              }
            : isOpen
            ? {
                top: cardTop,
                left: mobile ? card1Left : card3Left,
                width: cardWidth,
                height: cardHeight,
                opacity: isArchiveExpanded ? 0 : 1,
                zIndex: 23,
                x: mobile ? stackOffset[3].x : 0,
                y: mobile ? stackOffset[3].y : 0,
                scale: mobile ? stackOffset[3].scale : 1,
                rotateY: mobile ? 0 : -1.5,
              }
            : {
                top: cardTop,
                left: mobile ? card1Left : card3Left,
                width: cardWidth,
                height: cardHeight,
                opacity: 0,
                zIndex: 23,
                x: mobile ? stackOffset[3].x + 70 : 140,
                y: mobile ? stackOffset[3].y + 28 : 36,
                scale: mobile ? stackOffset[3].scale - 0.04 : 0.93,
                rotateY: -12,
              }
        }
        transition={{
          duration: 0.65,
          ease: [0.65, 0, 0.35, 1],
        }}
        className={`fixed transform-gpu ${
          isAboutExpanded
            ? 'overflow-y-auto no-scrollbar pointer-events-auto'
            : isOpen && !anyExpanded
            ? 'pointer-events-auto overflow-hidden'
            : 'pointer-events-none overflow-hidden'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          backgroundColor: theme.bg,
          color: theme.text,
          border: isAboutExpanded ? '0px solid transparent' : `1px solid ${theme.border}`,
          borderRadius: '0px',
          boxShadow: 'none',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isAboutExpanded ? (
            <motion.div
              key="full-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full min-h-full"
            >
              <AboutView
                persona={persona}
                onOpenContact={onOpenContact}
                theme={theme}
                onClose={onCloseExpanded}
              />
            </motion.div>
          ) : (
            <motion.div
              key="deck-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="button"
              tabIndex={isOpen && !anyExpanded ? 0 : -1}
              aria-label="Open about"
              aria-hidden={!isOpen || anyExpanded}
              data-cursor="open"
              data-deck-card="about"
              onClick={() => open('about')}
              onKeyDown={keyActivate('about')}
              {...hoverProps('about')}
              className="group select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 sm:p-7 cursor-pointer"
              style={{ x: deckRepelX }}
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
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
