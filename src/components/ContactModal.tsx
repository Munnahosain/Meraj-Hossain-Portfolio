import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

type Tab = 'client' | 'talent' | 'email';
type SubmitStatus = 'idle' | 'sending' | 'error';

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
const budgetsList = ['<$1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000+', "Let's discuss first"];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClass =
  'w-full bg-transparent border-b border-[#18C98A]/30 py-2 outline-none font-sans text-sm text-[#f2f4f3] placeholder:text-[#8e9693]/40';
const labelClass = 'block font-mono text-[10px] tracking-widest uppercase text-[#8e9693] mb-1';

/** Text field whose underline draws in on focus. */
const Field: React.FC<{ label: string; className?: string; children: React.ReactNode }> = ({
  label,
  className = '',
  children,
}) => (
  <label className={`field relative block ${className}`}>
    <span className={labelClass}>{label}</span>
    <span className="relative block">
      {children}
      <span className="field-bar" aria-hidden="true" />
    </span>
  </label>
);

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  timeline: '',
  message: '',
  discipline: '',
  portfolio: '',
  website: '', // honeypot: real people never see or fill this
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, persona }) => {
  const [tab, setTab] = useState<Tab>('client');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['Motion graphics']);
  const [selectedFormat, setSelectedFormat] = useState('Project Contract');
  const [selectedBudget, setSelectedBudget] = useState('$1,000 – $3,000');
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const setField = (key: keyof typeof EMPTY_FORM) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((item) => item !== scope) : [...prev, scope],
    );
  };

  // Start fresh next time the modal opens (runs after the exit animation).
  const resetAfterClose = () => {
    setTab('client');
    setIsSubmitted(false);
    setStatus('idle');
    setForm(EMPTY_FORM);
    setSelectedScopes(['Motion graphics']);
    setSelectedFormat('Project Contract');
    setSelectedBudget('$1,000 – $3,000');
  };

  // Focus management: move focus in, trap Tab, close on Escape, restore on close.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus({ preventScroll: true });
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey, true);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  useEffect(
    () => () => {
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const submit = useCallback(
    async (kind: 'client' | 'talent', event: React.FormEvent) => {
      event.preventDefault();
      if (status === 'sending') return;
      setStatus('sending');
      const payload =
        kind === 'client'
          ? {
              kind,
              name: form.name,
              email: form.email,
              company: form.company,
              timeline: form.timeline,
              message: form.message,
              scopes: selectedScopes,
              format: selectedFormat,
              budget: selectedBudget,
              website: form.website,
            }
          : {
              kind,
              name: form.name,
              email: form.email,
              discipline: form.discipline,
              portfolio: form.portfolio,
              message: form.message,
              website: form.website,
            };
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(String(response.status));
        setIsSubmitted(true);
        setStatus('idle');
      } catch {
        setStatus('error');
      }
    },
    [form, selectedBudget, selectedFormat, selectedScopes, status],
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(persona.email);
      setCopiedEmail(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the address is still on screen.
      window.location.href = `mailto:${persona.email}`;
      return;
    }
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const mailtoFallback = `mailto:${persona.email}?subject=${encodeURIComponent(
    'Project inquiry',
  )}&body=${encodeURIComponent(form.message)}`;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'client', label: 'Client Brief' },
    { id: 'talent', label: 'Collaboration' },
    { id: 'email', label: 'Direct Contacts' },
  ];

  const sending = status === 'sending';
  const submitLabel = (idle: string) => (sending ? 'Sending…' : idle);

  const honeypot = (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      value={form.website}
      onChange={setField('website')}
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );

  const errorNote =
    status === 'error' ? (
      <p role="alert" className="font-mono text-[11px] tracking-wider text-[#ff8a7a]">
        Couldn’t send that just now.{' '}
        <a href={mailtoFallback} className="underline underline-offset-4 hover:text-[#18C98A]">
          Email me directly instead
        </a>
        .
      </p>
    ) : null;

  const submitButtonClass =
    'px-8 py-3 rounded bg-[#18C98A] text-[#101114] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[#18C98A]/90 motion-transition-colors shadow-[0_0_15px_rgba(24,201,138,0.4)] cursor-pointer disabled:cursor-wait disabled:opacity-70';

  return (
    <AnimatePresence onExitComplete={resetAfterClose}>
      {isOpen && (
    <MotionModalBackdrop
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#101114]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      {/* Paper Container Card in #101114 obsidian with #18C98A border */}
      <MotionModalContent
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact Meraj Hossain"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-none shadow-none border border-[#18C98A]/30 bg-[#101114] text-[#f2f4f3] flex flex-col justify-between"
      >
        {/* Top Tab Bar & Close Button */}
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#18C98A]/15 shrink-0 bg-[#16181e]">
          <div role="tablist" className="flex items-center gap-5 sm:gap-8 font-mono text-[11px] tracking-widest uppercase font-semibold">
            {tabs.map((item) => (
              <MotionButton
                key={item.id}
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => {
                  setTab(item.id);
                  setStatus('idle');
                }}
                className={`relative cursor-pointer pb-1.5 motion-transition-colors ${
                  tab === item.id ? 'text-[#18C98A]' : 'text-[#8e9693] hover:text-[#f2f4f3]'
                }`}
              >
                {item.label}
                {tab === item.id && (
                  <motion.span
                    layoutId="contact-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-[#18C98A]"
                    transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  />
                )}
              </MotionButton>
            ))}
          </div>

          <MotionButton
            onClick={onClose}
            aria-label="Close contact dialog"
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

              <form onSubmit={(event) => submit('client', event)} className="relative space-y-10">{honeypot}
                {/* 01. Scope */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4 font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                    01. Project Scope
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {scopesList.map((scope) => {
                      const checked = selectedScopes.includes(scope);
                      return (
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          key={scope}
                          onClick={() => toggleScope(scope)}
                          className="group/check flex items-center gap-3 cursor-pointer select-none text-left text-xs sm:text-sm text-[#f2f4f3] font-light motion-transition-colors hover:text-[#18C98A]"
                        >
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-active/check:scale-90 ${
                              checked
                                ? 'bg-[#18C98A] border-[#18C98A] text-[#101114]'
                                : 'border-[#18C98A]/40 bg-transparent'
                            }`}
                          >
                            <Check
                              className={`h-2.5 w-2.5 stroke-[3] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                                checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                              }`}
                            />
                          </span>
                          <span>{scope}</span>
                        </button>
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
                  <Field label="04. Name*">
                    <input required type="text" autoComplete="name" value={form.name} onChange={setField('name')} placeholder="Jane Doe" className={inputClass} />
                  </Field>
                  <Field label="05. Email*">
                    <input required type="email" autoComplete="email" value={form.email} onChange={setField('email')} placeholder="jane@agency.com" className={inputClass} />
                  </Field>
                  <Field label="06. Company / Brand">
                    <input type="text" autoComplete="organization" value={form.company} onChange={setField('company')} placeholder="Agency / Brand Name" className={inputClass} />
                  </Field>
                  <Field label="07. Timeline">
                    <input type="text" value={form.timeline} onChange={setField('timeline')} placeholder="Immediate / Next month" className={inputClass} />
                  </Field>
                  <Field label="08. Project Brief / Deliverables Required" className="sm:col-span-2">
                    <textarea rows={3} value={form.message} onChange={setField('message')} placeholder="Describe the campaign, video duration, visual style, or motion reference..." className={`${inputClass} resize-none`} />
                  </Field>
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-[10px] text-[#8e9693] uppercase tracking-widest">
                    {errorNote ?? '* Required fields'}
                  </div>
                  <MotionButton type="submit" disabled={sending} aria-busy={sending} className={submitButtonClass}>
                    {submitLabel('Send Project Brief')}
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

              <form onSubmit={(event) => submit('talent', event)} className="relative space-y-6">
                {honeypot}
                <Field label="Your Discipline">
                  <input required type="text" value={form.discipline} onChange={setField('discipline')} placeholder="3D Animation / Sound Design / Cinematography" className={inputClass} />
                </Field>
                <Field label="Showreel / Portfolio URL">
                  <input required type="url" value={form.portfolio} onChange={setField('portfolio')} placeholder="https://behance.net/... or https://vimeo.com/..." className={inputClass} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Your Name">
                    <input required type="text" autoComplete="name" value={form.name} onChange={setField('name')} placeholder="Your Name" className={inputClass} />
                  </Field>
                  <Field label="Email">
                    <input required type="email" autoComplete="email" value={form.email} onChange={setField('email')} placeholder="your.email@studio.com" className={inputClass} />
                  </Field>
                </div>
                <Field label="Note / Message">
                  <textarea rows={2} value={form.message} onChange={setField('message')} placeholder="Tell me about yourself and what you love creating..." className={`${inputClass} resize-none`} />
                </Field>
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>{errorNote}</div>
                  <MotionButton type="submit" disabled={sending} aria-busy={sending} className={submitButtonClass}>
                    {submitLabel('Submit Details')}
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
                    aria-label="Copy email address"
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
