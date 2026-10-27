import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MerajProfile, TimeTheme } from '../types';
import { X, Check, Copy } from 'lucide-react';
import {
  MotionButton,
  MotionModalBackdrop,
  MotionModalContent,
  MotionTabPanel,
} from './motion/MotionPrimitives';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: MerajProfile;
  theme: TimeTheme;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  persona,
}) => {
  const [tab, setTab] = useState<'client' | 'talent' | 'email'>('client');

  // Form State
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['Motion graphics']);
  const [selectedFormat, setSelectedFormat] = useState('Project');
  const [selectedBudget, setSelectedBudget] = useState('€1,000 – €5,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(persona.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scopesList = [
    'Motion graphics',
    'Video editing',
    'Color grading',
    'Graphic design',
    'Social media creatives',
    'Promotional video campaigns',
    'Branding & advertising',
    'Stock template creation',
  ];

  const formatsList = ['Project Contract', 'Full-time / Remote', 'Retainer'];

  const budgetsList = [
    '<$1,000',
    '$1,000 – $3,000',
    '$3,000 – $10,000',
    '$10,000+',
    "Let's discuss first",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
    <MotionModalBackdrop
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#101114]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      {/* Paper Container Card in #101114 obsidian with #18C98A border */}
      <MotionModalContent
        role="dialog"
        aria-modal="true"
        aria-label="Contact Meraj Hossain"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-none shadow-none border border-[#18C98A]/30 bg-[#101114] text-[#f2f4f3] flex flex-col justify-between"
      >
        {/* Top Tab Bar & Close Button */}
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#18C98A]/15 shrink-0 bg-[#16181e]">
          <div className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] tracking-widest uppercase font-semibold">
            <MotionButton
              onClick={() => setTab('client')}
              className={`cursor-pointer motion-transition-colors ${
                tab === 'client' ? 'text-[#18C98A] underline underline-offset-4' : 'text-[#8e9693] hover:text-[#f2f4f3]'
              }`}
            >
              Client Brief
            </MotionButton>
            <MotionButton
              onClick={() => setTab('talent')}
              className={`cursor-pointer motion-transition-colors ${
                tab === 'talent' ? 'text-[#18C98A] underline underline-offset-4' : 'text-[#8e9693] hover:text-[#f2f4f3]'
              }`}
            >
              Collaboration
            </MotionButton>
            <MotionButton
              onClick={() => setTab('email')}
              className={`cursor-pointer motion-transition-colors ${
                tab === 'email' ? 'text-[#18C98A] underline underline-offset-4' : 'text-[#8e9693] hover:text-[#f2f4f3]'
              }`}
            >
              Direct Contacts
            </MotionButton>
          </div>

          <MotionButton
            onClick={onClose}
            className="flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase hover:text-[#18C98A] motion-transition-colors cursor-pointer text-[#8e9693]"
          >
            <span>Close</span>
            <X className="w-4 h-4 text-[#18C98A]" />
          </MotionButton>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait" initial={false}>
        <MotionTabPanel
          key={isSubmitted ? 'submitted' : tab}
          className="p-6 sm:p-10 flex-1 bg-[#101114]"
        >
          {isSubmitted ? (
            /* Thank you paper confirmation */
            <div className="py-20 text-center space-y-4">
              <h3 className="text-5xl sm:text-7xl font-sans font-light tracking-tight text-[#18C98A]">
                thank you
              </h3>
              <p className="font-sans text-lg text-[#8e9693] max-w-md mx-auto font-light">
                Your message has been received. Meraj Hossain will get back to you as soon as possible.
              </p>
              <div className="pt-8">
                <MotionButton
                  onClick={onClose}
                  className="px-6 py-2.5 rounded border border-[#18C98A]/40 font-mono text-[11px] tracking-widest uppercase hover:bg-[#18C98A] hover:text-[#101114] motion-transition-colors cursor-pointer text-[#18C98A]"
                >
                  Close Window
                </MotionButton>
              </div>
            </div>
          ) : tab === 'client' ? (
            /* Client Project Brief Form */
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-8 border-b border-[#18C98A]/15">
                <h2 className="text-4xl sm:text-6xl font-sans font-light tracking-tight leading-[1.05] text-[#f2f4f3]">
                  let’s create<br /><span className="text-[#18C98A]">together</span>
                </h2>
                <div className="font-mono text-[11px] tracking-wider leading-relaxed text-[#8e9693] max-w-xs">
                  Tell me about your project and I’ll get in touch<br /><br />
                  <span className="font-semibold text-[#18C98A]">Now booking 2026</span><br />
                  Direct response within 24 hours
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* 01. Scope */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4 font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                    01. Project Scope
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {scopesList.map((scope) => {
                      const checked = selectedScopes.includes(scope);
                      return (
                        <label
                          key={scope}
                          onClick={() => toggleScope(scope)}
                          className="flex items-center gap-3 cursor-pointer select-none text-xs sm:text-sm text-[#f2f4f3] font-light hover:text-[#18C98A]"
                        >
                          <div
                            className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center motion-transition-colors ${
                              checked
                                ? 'bg-[#18C98A] border-[#18C98A] text-[#101114]'
                                : 'border-[#18C98A]/40 bg-transparent'
                            }`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span>{scope}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 02. Format */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-6 border-t border-[#18C98A]/15">
                  <div className="md:col-span-4 font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                    02. Format
                  </div>
                  <div className="md:col-span-8 flex flex-wrap gap-4">
                    {formatsList.map((fmt) => (
                      <MotionButton
                        type="button"
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-4 py-1.5 rounded border text-xs sm:text-sm font-light motion-transition-colors ${
                          selectedFormat === fmt
                            ? 'bg-[#18C98A] text-[#101114] border-[#18C98A] font-medium'
                            : 'border-[#18C98A]/30 hover:border-[#18C98A] text-[#f2f4f3]'
                        }`}
                      >
                        {fmt}
                      </MotionButton>
                    ))}
                  </div>
                </div>

                {/* 03. Budget */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-6 border-t border-[#18C98A]/15">
                  <div className="md:col-span-4 font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                    03. Budget Range
                  </div>
                  <div className="md:col-span-8 flex flex-wrap gap-2.5">
                    {budgetsList.map((bg) => (
                      <MotionButton
                        type="button"
                        key={bg}
                        onClick={() => setSelectedBudget(bg)}
                        className={`px-3.5 py-1.5 rounded border text-xs font-mono motion-transition-colors ${
                          selectedBudget === bg
                            ? 'bg-[#18C98A] text-[#101114] border-[#18C98A] font-semibold'
                            : 'border-[#18C98A]/30 hover:border-[#18C98A] text-[#f2f4f3]'
                        }`}
                      >
                        {bg}
                      </MotionButton>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#18C98A]/15">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      04. Name*
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      05. Email*
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@agency.com"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      06. Company / Brand
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Agency / Brand Name"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      07. Timeline
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="Immediate / Next month"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      08. Project Brief / Deliverables Required
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe the campaign, video duration, visual style, or motion reference..."
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8e9693] uppercase tracking-widest">
                    * Required fields
                  </span>
                  <MotionButton
                    type="submit"
                    className="px-8 py-3 rounded bg-[#18C98A] text-[#101114] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#18C98A]/90 motion-transition-colors shadow-[0_0_15px_rgba(24,201,138,0.4)] cursor-pointer"
                  >
                    Send Project Brief
                  </MotionButton>
                </div>
              </form>
            </div>
          ) : tab === 'talent' ? (
            /* Talent Network */
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#18C98A]/15">
                <h2 className="text-4xl sm:text-6xl font-sans font-light tracking-tight leading-[1.05] text-[#f2f4f3]">
                  creative<br /><span className="text-[#18C98A]">collaboration</span>
                </h2>
                <div className="font-mono text-[11px] tracking-wider leading-relaxed text-[#8e9693] max-w-xs">
                  Looking for fellow motion artists, sound designers, and directors to collaborate on global projects.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                    Your Discipline
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="3D Animation / Sound Design / Cinematography"
                    className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                    Showreel / Portfolio URL
                  </label>
                  <input
                    required
                    type="url"
                    placeholder="https://behance.net/... or https://vimeo.com/..."
                    className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your.email@studio.com"
                      className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1">
                    Note / Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell me about yourself and what you love creating..."
                    className="w-full bg-transparent border-b border-[#18C98A]/30 py-2 focus:border-[#18C98A] outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40 resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <MotionButton
                    type="submit"
                    className="px-8 py-3 rounded bg-[#18C98A] text-[#101114] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#18C98A]/90 motion-transition-colors shadow-[0_0_15px_rgba(24,201,138,0.4)] cursor-pointer"
                  >
                    Submit Details
                  </MotionButton>
                </div>
              </form>
            </div>
          ) : (
            /* Direct Email & Social Contacts */
            <div className="py-8 space-y-10">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#18C98A] block mb-2">
                  Direct Inquiries & Bookings
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${persona.email}`}
                    className="text-2xl sm:text-4xl font-sans font-light tracking-tight hover:text-[#18C98A] motion-transition-colors text-[#f2f4f3]"
                  >
                    {persona.email}
                  </a>
                  <MotionButton
                    onClick={handleCopyEmail}
                    className="p-2 rounded border border-[#18C98A]/30 hover:bg-[#18C98A]/10 text-[#18C98A] motion-transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#18C98A]" /> : <Copy className="w-4 h-4" />}
                  </MotionButton>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#8e9693] block mb-1">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${persona.phone}`}
                    className="text-lg font-mono tracking-wider text-[#18C98A] hover:underline"
                  >
                    {persona.phone}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#8e9693] block mb-1">
                    Location / Studio Base
                  </span>
                  <div className="text-sm font-mono tracking-wider text-[#f2f4f3]">
                    {persona.address}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#18C98A]/15">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#8e9693] block mb-4">
                  Professional Channels
                </span>
                <div className="flex flex-wrap gap-4 font-mono text-xs tracking-wider uppercase text-[#f2f4f3]">
                  <a
                    href={persona.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded border border-[#18C98A]/30 hover:border-[#18C98A] hover:text-[#18C98A] motion-transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://stock.adobe.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded border border-[#18C98A]/30 hover:border-[#18C98A] hover:text-[#18C98A] motion-transition-colors"
                  >
                    Adobe Stock Contributor
                  </a>
                </div>
              </div>
            </div>
          )}
        </MotionTabPanel>
        </AnimatePresence>
      </MotionModalContent>
    </MotionModalBackdrop>
      )}
    </AnimatePresence>
  );
};
