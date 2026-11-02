import React from 'react';
import { MerajProfile, TimeTheme } from '../types';
import { ArrowUpRight, Award, Briefcase, GraduationCap } from 'lucide-react';
import { FadeUp, MotionButton } from './motion/MotionPrimitives';

interface AboutViewProps {
  persona: MerajProfile;
  onOpenContact: () => void;
  theme: TimeTheme;
}

export const AboutView: React.FC<AboutViewProps> = ({
  persona,
  onOpenContact,
  theme,
}) => {
  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-36 pb-24 transition-colors duration-700 overflow-x-hidden"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Massive Headline Statement */}
        <FadeUp
          inView
          once
          amount={0.25}
          className="pb-16 border-b border-[#18C98A]/15"
        >
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block mb-4">
            {persona.subtitle}
          </span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-light tracking-tight leading-[1.02] max-w-6xl text-balance transition-colors duration-500"
            style={{ color: theme.text }}
          >
            {persona.headline}
          </h1>
        </FadeUp>

        {/* Primary Split: Portrait & Biography */}
        <FadeUp
          inView
          once
          amount={0.12}
          delay={0.08}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-b border-[#18C98A]/15 items-start"
        >
          {/* Portrait Column */}
          <div className="lg:col-span-5 sticky top-36">
            <div className="relative w-full rounded-none overflow-hidden border border-[#18C98A]/20 bg-[#16181e] shadow-none">
              <img
                src={persona.avatarImage}
                alt={persona.name}
                className="w-full h-[520px] sm:h-[600px] object-cover grayscale-[15%] hover:grayscale-0 transition-[filter] duration-[var(--motion-duration-emphasis)] ease-[var(--motion-ease-enter)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="font-sans text-xl font-medium text-[#f2f4f3]">
                    {persona.name}
                  </div>
                  <div className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                    {persona.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Resume Contact Chip */}
            <div className="mt-6 p-5 rounded border border-[#18C98A]/20 bg-[#16181e] space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#8e9693]">Email</span>
                <a href={`mailto:${persona.email}`} className="text-[#18C98A] hover:underline">
                  {persona.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8e9693]">Phone</span>
                <span className="text-[#f2f4f3]">{persona.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8e9693]">Address</span>
                <span className="text-[#f2f4f3]">{persona.address}</span>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-16">
            {/* About Me */}
            <div className="space-y-4">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block">
                Profile
              </span>
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-[#f2f4f3]">
                {persona.aboutText.intro}
              </p>
              <p className="text-base sm:text-lg font-light leading-relaxed text-[#8e9693] pt-2">
                {persona.aboutText.background}
              </p>
            </div>

            {/* Philosophy */}
            <div className="space-y-4 pt-4 border-t border-[#18C98A]/15">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block">
                Philosophy
              </span>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-[#f2f4f3]/90">
                {persona.aboutText.philosophy}
              </p>
            </div>

            {/* Skills & Software Grid */}
            <div className="space-y-6 pt-4 border-t border-[#18C98A]/15">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block">
                Skills & Technical Expertise
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {persona.skills.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded border border-[#18C98A]/15 bg-[#16181e] space-y-3"
                  >
                    <span className="font-mono text-[10px] uppercase text-[#8e9693] tracking-wider block">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#101114] border border-[#18C98A]/20 text-xs font-mono text-[#18C98A]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience from Resume */}
            <div className="space-y-6 pt-4 border-t border-[#18C98A]/15">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#18C98A]" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                  Work Experience
                </span>
              </div>

              <div className="space-y-4">
                {persona.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded border border-[#18C98A]/15 bg-[#16181e] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-lg font-medium text-[#f2f4f3]">{exp.role}</h4>
                        <div className="text-xs font-mono text-[#18C98A]">{exp.company}</div>
                      </div>
                      <div className="text-xs font-mono text-[#8e9693]">{exp.period}</div>
                    </div>
                    <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-[#8e9693] font-light list-disc list-inside">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education History from Resume */}
            <div className="space-y-6 pt-4 border-t border-[#18C98A]/15">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#18C98A]" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                  Education & Honors
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {persona.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded border border-[#18C98A]/15 bg-[#16181e] flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-[#18C98A] block mb-1">
                        {edu.year}
                      </span>
                      <h5 className="text-sm font-medium text-[#f2f4f3] leading-snug">
                        {edu.degree}
                      </h5>
                    </div>
                    <p className="text-xs font-mono text-[#8e9693] mt-3">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reach out CTA */}
            <div className="p-8 rounded-none border border-[#18C98A]/30 bg-[#16181e] space-y-4 shadow-none">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#18C98A] block">
                Collaboration & Inquiries
              </span>
              <p className="text-sm sm:text-base text-[#8e9693] leading-relaxed font-light">
                Available for commercial motion graphics, video editing, social media campaign creative direction, and brand design contracts globally.
              </p>
              <MotionButton
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#18C98A] hover:text-[#18C98A]/80 motion-transition-colors pt-2 cursor-pointer"
              >
                <span>Let's build together — Open Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MotionButton>
            </div>
          </div>
        </FadeUp>

        {/* 5-Step Motion Design Process */}
        <FadeUp
          inView
          once
          amount={0.18}
          className="py-20 border-b border-[#18C98A]/15"
        >
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block mb-2">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-tight text-[#f2f4f3]">
              Motion & Visual Design Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {persona.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded border border-[#18C98A]/15 bg-[#16181e] space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#18C98A] font-semibold">{step.step}</span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8e9693]">
                    {step.sub}
                  </span>
                </div>
                <h4 className="text-xl font-sans font-medium text-[#f2f4f3]">{step.title}</h4>
                <p className="text-xs sm:text-sm text-[#8e9693] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Clients & Recognition Section */}
        <FadeUp
          inView
          once
          amount={0.18}
          className="py-20"
        >
          <div className="mb-10">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block mb-2">
              Affiliations & Client Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-[#f2f4f3]">
              Workplaces & Global Media Platforms
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {persona.clients.map((client, i) => (
              <div
                key={i}
                className="px-5 py-3 rounded border border-[#18C98A]/20 bg-[#16181e] font-mono text-xs tracking-wider uppercase text-[#f2f4f3]"
              >
                {client}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
};
