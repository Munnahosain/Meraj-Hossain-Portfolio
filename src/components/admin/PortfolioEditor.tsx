import { useState } from 'react';
import { ArrowDown, ArrowUp, Copy, ExternalLink, Plus, Trash2, Upload } from 'lucide-react';

export type EditableValue =
  | string
  | number
  | boolean
  | null
  | EditableValue[]
  | { [key: string]: EditableValue };

interface PortfolioEditorProps {
  value: EditableValue;
  onChange: (value: EditableValue) => void;
  onUpload: (file: File) => Promise<string | null>;
}

const templates: Record<string, EditableValue> = {
  caseStudies: {
    id: '',
    slug: '',
    title: '',
    status: 'draft',
    client: '',
    year: '',
    category: '',
    role: '',
    coverImage: '',
    description: '',
    contentMedia: [],
    sections: [],
    services: [],
    tools: [],
    featured: false,
    heroVisible: true,
    animationSettings: {
      preset: 'cinematic',
      transitionDurationMs: 850,
      easingPreset: 'cinematic',
      shutterDirection: 'upward',
      imageTransitionStyle: 'shutter',
      textRevealStyle: 'rise',
      stickyImageBehavior: 'enabled',
      reducedMotionFallback: 'instant',
    },
    scrollGalleryRow1: [],
    scrollGalleryRow2: [],
  },
  archiveItems: {
    id: '',
    number: '',
    title: '',
    category: '',
    year: '',
    type: 'image',
    src: '',
  },
  contentMedia: { type: 'image', src: '', caption: '', aspect: 'landscape' },
  sections: {
    id: '',
    layout: 'image-left',
    heading: '',
    body: '',
    image: '',
    imageAlt: '',
    caption: '',
    galleryImages: [],
    galleryCaptions: [],
    galleryAltTexts: [],
    textAlignment: 'left',
    imagePosition: 'left',
    imageSize: 'standard',
    backgroundTreatment: 'none',
    spacing: 'comfortable',
    stickyEnabled: true,
    animationPreset: 'cinematic',
    ctaLabel: '',
    ctaUrl: '',
  },
  skills: { category: '', items: [] },
  experience: { role: '', company: '', period: '', description: [] },
  education: { degree: '', institution: '', year: '' },
  values: { number: '', title: '', description: '' },
  process: { step: '', title: '', sub: '', description: '' },
};

const selectOptions: Record<string, Array<{ value: string; label: string }>> = {
  layout: [
    { value: 'image-left', label: 'Image left, text right' },
    { value: 'image-right', label: 'Text left, image right' },
    { value: 'full-width', label: 'Full-width visual' },
    { value: 'sticky-story', label: 'Sticky image storytelling' },
    { value: 'cinematic-gallery', label: 'Cinematic image gallery' },
  ],
  textAlignment: ['left', 'center', 'right'].map((value) => ({ value, label: value })),
  imagePosition: ['left', 'right'].map((value) => ({ value, label: value })),
  imageSize: ['compact', 'standard', 'immersive'].map((value) => ({ value, label: value })),
  backgroundTreatment: ['none', 'panel', 'accent'].map((value) => ({ value, label: value })),
  spacing: ['compact', 'comfortable', 'spacious'].map((value) => ({ value, label: value })),
  animationPreset: ['cinematic', 'smooth', 'minimal', 'reduced-motion'].map((value) => ({
    value,
    label: value.replace('-', ' '),
  })),
  preset: ['cinematic', 'smooth', 'minimal', 'reduced-motion'].map((value) => ({
    value,
    label: value.replace('-', ' '),
  })),
  easingPreset: ['cinematic', 'smooth', 'minimal'].map((value) => ({ value, label: value })),
  shutterDirection: [{ value: 'upward', label: 'Upward shutter' }],
  imageTransitionStyle: [{ value: 'shutter', label: 'Upward shutter' }],
  textRevealStyle: ['rise', 'fade', 'none'].map((value) => ({ value, label: value })),
  stickyImageBehavior: ['enabled', 'disabled'].map((value) => ({ value, label: value })),
  reducedMotionFallback: ['instant', 'fade'].map((value) => ({ value, label: value })),
  status: [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ],
};

function isRecord(value: EditableValue): value is { [key: string]: EditableValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function copyValue(value: EditableValue): EditableValue {
  if (Array.isArray(value)) return value.map(copyValue);
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, copyValue(child)]));
  }
  return value;
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (character) => character.toUpperCase());
}

function isMediaField(name: string) {
  return /image|video|avatar|poster|(^|_)src$/i.test(name);
}

function blankFrom(value: EditableValue): EditableValue {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  if (Array.isArray(value)) return [];
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankFrom(child)]));
  }
  return '';
}

function newArrayItem(name: string, value: EditableValue[]): EditableValue {
  const template = templates[name];
  if (template && name === 'caseStudies' && isRecord(template)) {
    const slug = `project-${Date.now().toString(36)}-${value.length + 1}`;
    const newProject = copyValue(template);
    if (isRecord(newProject)) return { ...newProject, id: slug, slug };
  }
  if (template) return copyValue(template);
  return value.length > 0 ? blankFrom(value[0]) : '';
}

function duplicateArrayItem(name: string, item: EditableValue): EditableValue {
  const duplicate = copyValue(item);
  if (!isRecord(duplicate)) return duplicate;

  if (name === 'caseStudies') {
    const slug = `project-copy-${Date.now().toString(36)}`;
    return {
      ...duplicate,
      id: slug,
      slug,
      title: `${String(duplicate.title || 'Project')} copy`,
      status: 'draft',
    };
  }
  if (name === 'sections') {
    return { ...duplicate, id: `section-${Date.now().toString(36)}` };
  }
  return duplicate;
}

export function toEditableValue(value: unknown): EditableValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  if (Array.isArray(value)) return value.map(toEditableValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, toEditableValue(child)]),
    );
  }
  return '';
}

export function PortfolioEditor({ value, onChange, onUpload }: PortfolioEditorProps) {
  return <EditableField name="Content" value={value} onChange={onChange} onUpload={onUpload} />;
}

function EditableField({
  name,
  value,
  onChange,
  onUpload,
}: PortfolioEditorProps & { name: string }) {
  if (Array.isArray(value)) {
    return (
      <section className="space-y-3 border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-white/75">
            {formatLabel(name)} <span className="text-white/35">({value.length})</span>
          </h3>
          <button
            className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 text-xs text-white/75 hover:border-[#a6ee68] hover:text-[#a6ee68]"
            onClick={() => onChange([...value, newArrayItem(name, value)])}
            type="button"
          >
            <Plus size={14} /> Add item
          </button>
        </div>
        {value.length === 0 ? (
          <p className="text-xs text-white/40">No items yet.</p>
        ) : (
          <div className="space-y-3">
            {value.map((item, index) => (
              <div
                className="relative border border-white/10 bg-[#111311] p-3 pr-14 sm:p-4 sm:pr-16"
                key={`${name}-${index}`}
              >
                <div className="absolute right-3 top-3 flex flex-col gap-1">
                  <button
                    aria-label={`Move ${formatLabel(name)} item ${index + 1} up`}
                    className="inline-flex h-7 w-7 items-center justify-center border border-white/15 text-white/50 hover:border-[#a6ee68] hover:text-[#a6ee68] disabled:opacity-25"
                    disabled={index === 0}
                    onClick={() =>
                      onChange(value.map((current, itemIndex) => {
                        if (itemIndex === index - 1) return value[index];
                        if (itemIndex === index) return value[index - 1];
                        return current;
                      }))
                    }
                    type="button"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    aria-label={`Move ${formatLabel(name)} item ${index + 1} down`}
                    className="inline-flex h-7 w-7 items-center justify-center border border-white/15 text-white/50 hover:border-[#a6ee68] hover:text-[#a6ee68] disabled:opacity-25"
                    disabled={index === value.length - 1}
                    onClick={() =>
                      onChange(value.map((current, itemIndex) => {
                        if (itemIndex === index + 1) return value[index];
                        if (itemIndex === index) return value[index + 1];
                        return current;
                      }))
                    }
                    type="button"
                  >
                    <ArrowDown size={13} />
                  </button>
                  {(name === 'caseStudies' || name === 'sections') && (
                    <button
                      aria-label={`Duplicate ${formatLabel(name)} item ${index + 1}`}
                      className="inline-flex h-7 w-7 items-center justify-center border border-white/15 text-white/50 hover:border-[#a6ee68] hover:text-[#a6ee68]"
                      onClick={() =>
                        onChange([
                          ...value.slice(0, index + 1),
                          duplicateArrayItem(name, item),
                          ...value.slice(index + 1),
                        ])
                      }
                      type="button"
                    >
                      <Copy size={13} />
                    </button>
                  )}
                  <button
                    aria-label={`Delete ${formatLabel(name)} item ${index + 1}`}
                    className="inline-flex h-7 w-7 items-center justify-center border border-white/15 text-white/50 hover:border-red-400 hover:text-red-300"
                    onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                    type="button"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                {name === 'caseStudies' &&
                  isRecord(item) &&
                  typeof item.slug === 'string' &&
                  item.slug.trim() && (
                  <a
                    href={`/projects/${encodeURIComponent(item.slug)}?preview=true`}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 inline-flex items-center gap-1.5 border border-white/15 px-2.5 py-1.5 text-[10px] uppercase tracking-widest text-white/60 hover:border-[#a6ee68] hover:text-[#a6ee68]"
                  >
                    Preview <ExternalLink size={12} />
                  </a>
                )}
                <EditableField
                  name={`${formatLabel(name)} ${index + 1}`}
                  value={item}
                  onChange={(nextItem) =>
                    onChange(value.map((current, itemIndex) => (itemIndex === index ? nextItem : current)))
                  }
                  onUpload={onUpload}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (isRecord(value)) {
    return (
      <section className="space-y-4 border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-white/75">
          {formatLabel(name)}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(value).map(([key, child]) => (
            <div className={Array.isArray(child) || isRecord(child) ? 'md:col-span-2' : ''} key={key}>
              <EditableField
                name={key}
                value={child}
                onChange={(nextChild) => onChange({ ...value, [key]: nextChild })}
                onUpload={onUpload}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex min-h-10 items-center gap-3 text-sm text-white/70">
        <input
          checked={value}
          className="h-4 w-4 accent-[#a6ee68]"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        {formatLabel(name)}
      </label>
    );
  }

  const textValue = value === null ? '' : String(value);
  const mediaField = isMediaField(name);
  const options = selectOptions[name];

  return (
    <label className="block space-y-1.5 text-xs text-white/60">
      <span className="font-mono uppercase tracking-widest">{formatLabel(name)}</span>
      {options ? (
        <select
          className="block w-full border border-white/15 bg-[#111311] px-3 py-2 text-sm text-white outline-none focus:border-[#a6ee68]"
          onChange={(event) => onChange(event.target.value)}
          value={textValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#111311]">
              {option.label}
            </option>
          ))}
        </select>
      ) : typeof value === 'number' ? (
        <input
          className="block w-full border border-white/15 bg-[#111311] px-3 py-2 text-sm text-white outline-none focus:border-[#a6ee68]"
          onChange={(event) => onChange(Number(event.target.value) || 0)}
          type="number"
          value={value}
        />
      ) : textValue.length > 100 || /description|headline|intro|background|philosophy/i.test(name) ? (
        <textarea
          className="block min-h-24 w-full border border-white/15 bg-[#111311] px-3 py-2 text-sm leading-6 text-white outline-none focus:border-[#a6ee68]"
          onChange={(event) => onChange(event.target.value)}
          value={textValue}
        />
      ) : (
        <input
          className="block w-full border border-white/15 bg-[#111311] px-3 py-2 text-sm text-white outline-none focus:border-[#a6ee68]"
          onChange={(event) => onChange(event.target.value)}
          type="text"
          value={textValue}
        />
      )}
      {mediaField && (
        <span className="flex flex-wrap items-center gap-3 pt-1">
          <span className="min-w-0 flex-1 truncate text-[11px] text-white/35" title={textValue}>
            {textValue || 'Paste a URL or upload a file to R2'}
          </span>
          <span className="relative inline-flex cursor-pointer items-center gap-1.5 border border-white/15 px-3 py-2 text-xs text-white/70 hover:border-[#a6ee68] hover:text-[#a6ee68]">
            <Upload size={13} /> Upload to R2
            <input
              accept="image/avif,image/gif,image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                const uploadedUrl = await onUpload(file);
                if (uploadedUrl) onChange(uploadedUrl);
              }}
              type="file"
            />
          </span>
        </span>
      )}
    </label>
  );
}
