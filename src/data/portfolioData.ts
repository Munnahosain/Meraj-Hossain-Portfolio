import { CaseStudy, ArchiveItem, MerajProfile } from '../types';

const LEGACY_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'moe',
    slug: 'mall-of-the-emirates',
    title: 'mall of the\nemirates',
    client: 'MAJID AL FUTTAIM',
    year: '2024',
    category: 'DIGITAL & SPATIAL EXPERIENCE',
    role: 'ART DIRECTION / MOTION & UX/UI DESIGN',
    coverImage: '/assets/site/MALL_OF_THE_EMIRATES.Bj_Dy64E.jpg',
    description:
      'Shaping digital experiences and motion identity across 29 shopping malls in the Middle East. Redefining high-end omnichannel luxury retail, personalized concierge motion graphics, and interactive architectural wayfinding for millions of visitors annually.',
    challenge:
      'Harmonizing physical department store grandeur with modern, fluid, app-driven digital motion without losing the tactile elegance of high luxury.',
    outcome:
      '+38% digital engagement surge, multi-award recognition, and a unified motion design system adopted across Majid Al Futtaim flagship retail destinations.',
    contentMedia: [
      {
        type: 'image',
        src: '/assets/site/MOE_content_01.DjUruEJV.jpg',
        caption: '01. High-Touch Mobile Concierge Experience',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/MOE_content_02.CWJSnQPS.jpg',
        caption: '02. Editorial Typography & Kinetic Micro-Interactions',
        aspect: 'portrait',
      },
      {
        type: 'image',
        src: '/assets/site/MOE_content_03.BAfcVyrw.jpg',
        caption: '03. Architectural Wayfinding & Store Motion Ecosystem',
        aspect: 'portrait',
      },
      {
        type: 'image',
        src: '/assets/site/MOE_content_04.V49PZVTs.jpg',
        caption: '04. Luxury Lifestyle Brand Campaign Imagery',
        aspect: 'wide',
      },
    ],
    scrollGalleryRow1: [
      '/assets/site/MOE_horizontal_scroll_row1_01.l5CIiVIH.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_02.wool-_Ab.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_03.BuMAqEz9.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_04.BNj0T03Q.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_05.B_dqLEI0.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_06.D9hcF9G_.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_07.1SSH3Z0h.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_08.gOywofL1.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_09.DQKovNN9.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_10.g_ajHs1g.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_11.CjlV3lT_.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_12.DJ879BcK.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_13.4BxdXdyu.jpg',
      '/assets/site/MOE_horizontal_scroll_row1_14.DAE0HPMs.jpg',
    ],
    scrollGalleryRow2: [
      '/assets/site/MOE_horizontal_scroll_row2_01.Bh66-zyL.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_02.QBegAeD9.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_03.BlbCAkh1.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_04.dyixkyUX.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_05.B-GH5Zkh.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_06.DqcAGqHu.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_07.BJniVujK.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_08.RX5fs2P7.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_09.BGkZlrOL.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_10.wwqeLCqq.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_11.CNIMjw6K.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_12.DYJ2134D.jpg',
      '/assets/site/MOE_horizontal_scroll_row2_13.CHtiwWwr.jpg',
    ],
  },
  {
    id: 'bestseller',
    slug: 'bestseller',
    title: 'bestseller\n50 festival',
    client: 'BESTSELLER',
    year: '2023',
    category: 'SPATIAL & FESTIVAL IDENTITY',
    role: 'MOTION GRAPHICS & CREATIVE DIRECTION',
    coverImage: '/assets/site/BESTSELLER.BwMYxazI.jpg',
    description:
      '50-year celebration festival and immersive architectural pavilion showcasing progressive kinetic projection mapping, kinetic typography, and physical brand experiences.',
    challenge:
      'Transforming historical castle grounds into a cutting-edge futuristic fashion amphitheater blending projection mapping, light architecture, and stage design.',
    outcome:
      'A legendary celebration event, capturing global press and solidifying forward motion vision.',
    contentMedia: [
      {
        type: 'video',
        src: '/assets/site/B50_Content_01.BmPIMLbC.mp4',
        caption: '01. Castle Façade Kinetic Lighting & Stage Opening',
        aspect: 'landscape',
      },
      {
        type: 'video',
        src: '/assets/site/B50_Content_02.BbYI9roB.mp4',
        caption: '02. Immersive Mirrored Cube Spatial Pavilion',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/B50_Content_06.DSHfxbop.jpg',
        caption: '03. Festival Identity & Field Signage Hierarchy',
        aspect: 'landscape',
      },
      {
        type: 'video',
        src: '/assets/site/B50_Content_03.DQWkXYB1.mp4',
        caption: '04. Ambient Festival Motion & Soundscapes',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/B50_Content_10.D5WB29f2.jpg',
        caption: '05. Monolithic Branding in Natural Nordic Meadows',
        aspect: 'wide',
      },
    ],
  },
  {
    id: 'cphfw',
    slug: 'copenhagen-fashion-week',
    title: 'copenhagen\nfashion week',
    client: 'CIFF / CPHFW',
    year: '2024',
    category: 'BRAND CAMPAIGN & RUNWAY',
    role: 'VIDEO EDITING & RUNWAY GRAPHICS',
    coverImage: '/assets/site/COPENHAGEN_FASHION_WEEK.Cif1zX-w.jpg',
    description:
      'Comprehensive brand identity, runway video editing, printed collateral, and digital presence for Copenhagen International Fashion Fair (CIFF) during Copenhagen Fashion Week.',
    challenge:
      'Establishing a minimal, confident design language that celebrates bold international fashion designers while honoring Nordic minimalism.',
    outcome:
      'Widely praised runway presence, minimalist tactile publications, and architectural showcase booths across the venue.',
    contentMedia: [
      {
        type: 'image',
        src: '/assets/site/1.Cx6OSLGn.jpg',
        caption: '01. Editorial Campaign Shoot — Minimalist Form',
        aspect: 'portrait',
      },
      {
        type: 'video',
        src: '/assets/site/2.BCt0nsxg.mp4',
        caption: '02. Spatial Runway & Industrial Exhibition Hall',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/4.Bbje1YKl.jpg',
        caption: '03. Translucent Acrylic Signage & Raw Pine Pillars',
        aspect: 'portrait',
      },
      {
        type: 'video',
        src: '/assets/site/7.UHkB7aIA.mp4',
        caption: '04. Exhibition Movement & Spatial Journey',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/8.DKpE4iZq.jpg',
        caption: '05. Curated Wardrobe & Garment Displays',
        aspect: 'landscape',
      },
    ],
  },
  {
    id: 'rains',
    slug: 'rains',
    title: 'rains',
    client: 'RAINS DENMARK',
    year: '2023',
    category: 'DIGITAL EXPERIENCE & FILM',
    role: 'VIDEO EDITING & COLOR GRADING',
    coverImage: '/assets/site/RAINS.CPKqRJG-.jpg',
    coverVideo: '/assets/site/RAINS.bsJKHxaJ.mp4',
    coverPoster: '/assets/site/RAINS.CPKqRJG-.jpg',
    description:
      'Cinematic video editing and color grading exploring the boundary between elemental technical weatherproofing and neo-brutalist haute couture.',
    challenge:
      'Conveying sensory tactile wetness, waterproofing performance, and stark cinematic tension through precision video editing and grade.',
    outcome:
      'A viral seasonal campaign driving record international engagement and industry acclaim for avant-garde outerwear motion.',
    contentMedia: [
      {
        type: 'video',
        src: '/assets/site/content03.w8Lq2FOG.mp4',
        caption: '01. Elemental Alpine Wind & Waterproof Testing Reel',
        aspect: 'portrait',
      },
      {
        type: 'video',
        src: '/assets/site/content04.NUIagjws.mp4',
        caption: '02. Balaclava & Monochromatic Technical Layering',
        aspect: 'portrait',
      },
      {
        type: 'image',
        src: '/assets/site/content07.CLaTtGG5.jpg',
        caption: '03. Glacial Landscape Shoot — Raw Elements',
        aspect: 'landscape',
      },
      {
        type: 'video',
        src: '/assets/site/content08.BETwsz8K.mp4',
        caption: '04. Textile Macro-Focus: Matte PU Coating in Rain',
        aspect: 'portrait',
      },
    ],
  },
  {
    id: 'nine',
    slug: 'nine-furniture',
    title: 'nine\nfurniture',
    client: 'NINE FURNITURE',
    year: '2024',
    category: 'OBJECT & PACKAGING DESIGN',
    role: 'BRAND IDENTITY & PACKAGING SYSTEM',
    coverImage: '/assets/site/NINE.6XIRjh36.jpg',
    description:
      'Complete graphic design, packaging system, and provocative brand manifesto for Nine Furniture: "Not everything needs to be beige."',
    challenge:
      'Breaking out of the homogenous beige neutral furniture trend with joyful, sharp, intellectual color confidence.',
    outcome:
      'A distinctive visual brand system that received widespread design press, Milan spotlight, and instant retail traction.',
    contentMedia: [
      {
        type: 'image',
        src: '/assets/site/nine_content_04.DVZ557wX.jpg',
        caption: '01. Poster Manifestos & Architectural Billboards',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/nine_content_05.Cq9pJEqq.jpg',
        caption: '02. Modular Packaging & Raw Kraft Paper Details',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/nine_content_06.CYhJLBzw.jpg',
        caption: '03. Vibrant Mint & Lime Accents on Stone',
        aspect: 'portrait',
      },
      {
        type: 'image',
        src: '/assets/site/nine_content_08.BlWg8_55.jpg',
        caption: '04. Minimalist Industrial Furniture Showcase',
        aspect: 'wide',
      },
    ],
  },
  {
    id: 'louis-vuitton',
    slug: 'louis-vuitton',
    title: 'louis\nvuitton',
    client: 'LOUIS VUITTON',
    year: '2022',
    category: 'LUXURY SPATIAL & MOTION',
    role: 'MOTION GRAPHICS & KINETIC SCREENS',
    coverImage: '/assets/site/LV.DCogZ-7C.jpg',
    coverVideo: '/assets/site/LV.CkZt_03C.mp4',
    coverPoster: '/assets/site/LV.DCogZ-7C.jpg',
    description:
      'Spatial choreography and kinetic screen installations celebrating high-velocity luxury motion, architectural shapes, and poetic visual rhythm.',
    challenge:
      'Orchestrating high-velocity kinetic motion with timeless Parisian heritage and monumental physical exhibition spaces.',
    outcome:
      'An unforgettable sensory motion experience experienced by VIPs, press, and international cultural luminaries.',
    contentMedia: [
      {
        type: 'image',
        src: '/assets/site/lv_content_01.oXNbQ5bo.jpg',
        caption: '01. Monogram Spatial Sculptures & Horizon Reflection',
        aspect: 'landscape',
      },
      {
        type: 'video',
        src: '/assets/site/lv_content_02.CJVrgcFl.mp4',
        caption: '02. Kinetic Screen Sequences & Light Columns',
        aspect: 'landscape',
      },
      {
        type: 'image',
        src: '/assets/site/lv_content_03.DiKVig0E.jpg',
        caption: '03. Monochromatic Leather Craftsmanship',
        aspect: 'square',
      },
      {
        type: 'image',
        src: '/assets/site/lv_content_04.BQITaAI0.jpg',
        caption: '04. Runway Architectural Perspective',
        aspect: 'square',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'micro-electronic-campaign',
    slug: 'micro-electronic-campaign',
    title: 'micro electronic\ncampaign',
    client: 'MICRO ELECTRONIC',
    year: '2025',
    category: 'BRANDING & PRINT',
    role: 'BRANDING / PRINT COLLATERAL',
    coverImage: '/assets/reel-01.jpg',
    description: 'Branding and print collateral for a tech hardware product launch, including campaign posters, social media assets, and product packaging.',
    contentMedia: [
      { type: 'image', src: '/assets/reel-01.jpg', caption: 'Product launch campaign artwork', aspect: 'square' },
    ],
  },
  {
    id: 'adobe-stock-motion-pack',
    slug: 'adobe-stock-motion-pack',
    title: 'adobe stock\nmotion pack',
    client: 'ADOBE STOCK',
    year: '2024',
    category: 'MOTION GRAPHICS',
    role: 'AFTER EFFECTS MOTION TEMPLATES',
    coverImage: '/assets/reel-03.jpg',
    description: 'Custom After Effects motion graphics templates created for stock licensing, including kinetic title templates and lower thirds.',
    contentMedia: [
      { type: 'image', src: '/assets/reel-03.jpg', caption: 'Motion graphics template artwork', aspect: 'square' },
    ],
  },
  {
    id: 'social-reels-series',
    slug: 'social-reels-series',
    title: 'social reels\nseries',
    client: 'SELECTED WORK',
    year: '2025',
    category: 'VIDEO EDITING',
    role: 'SHORT-FORM VIDEO EDITING',
    coverImage: '/assets/reel-05.jpg',
    description: 'Short-form video cuts for digital brands, using dynamic captions, sound design, and speed ramping.',
    contentMedia: [
      { type: 'image', src: '/assets/reel-05.jpg', caption: 'Social campaign creative', aspect: 'square' },
    ],
  },
  {
    id: 'promo-cutdowns',
    slug: 'promo-cutdowns',
    title: 'promo\ncutdowns',
    client: 'SELECTED WORK',
    year: '2024',
    category: 'PROMO & COLOR',
    role: 'VIDEO EDITING / COLOR GRADING',
    coverImage: '/assets/reel-06.jpg',
    description: 'Commercial campaign cutdowns and color grading for web and broadcast delivery.',
    contentMedia: [
      { type: 'image', src: '/assets/reel-06.jpg', caption: 'Commercial campaign creative', aspect: 'square' },
    ],
  },
];

const LEGACY_ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-1',
    number: '01',
    title: 'Kinetic Monolith',
    category: '3D Simulation & Motion',
    year: '2024',
    type: 'video',
    src: '/assets/site/archive_01.D6LkIL8i.mp4',
    poster: '/assets/site/archive_01_poster.DGnZN2Ie.jpg',
  },
  {
    id: 'arch-2',
    number: '02',
    title: 'Editorial Motion Reel',
    category: 'Video Editing & Lookbook',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_02.Dm2AgCPJ.jpg',
  },
  {
    id: 'arch-3',
    number: '03',
    title: 'Digital Platform Motion',
    category: 'UI Motion & Screen Design',
    year: '2024',
    type: 'video',
    src: '/assets/site/archive_03.DRKdGFuF.mp4',
    poster: '/assets/site/archive_03_poster.C3_N2BZz.jpg',
  },
  {
    id: 'arch-4',
    number: '04',
    title: 'Brand Identity Vector Marks',
    category: 'Graphic Design',
    year: '2022',
    type: 'image',
    src: '/assets/site/archive_04.iB60ytpe.jpg',
  },
  {
    id: 'arch-5',
    number: '05',
    title: 'Campaign Visuals & Posters',
    category: 'Advertising & Print',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_05.CcLddY82.jpg',
  },
  {
    id: 'arch-6',
    number: '06',
    title: 'Spatial Kinetic Installation',
    category: 'Exhibition & VFX',
    year: '2023',
    type: 'video',
    src: '/assets/site/archive_06.C5_Zp-eu.mp4',
    poster: '/assets/site/archive_06_poster.Ct8863B4.jpg',
  },
  {
    id: 'arch-7',
    number: '07',
    title: 'Tactile Packaging System',
    category: 'Packaging Design',
    year: '2022',
    type: 'image',
    src: '/assets/site/archive_07.CEWCwpke.jpg',
  },
  {
    id: 'arch-8',
    number: '08',
    title: 'Digital Token 3D Asset',
    category: '3D Modeling & Motion',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_08.DRbqwqDK.jpg',
  },
  {
    id: 'arch-9',
    number: '09',
    title: 'Kinetic Typography Sequence',
    category: 'Motion Graphics',
    year: '2024',
    type: 'video',
    src: '/assets/site/archive_09.DbgvIWZh.mp4',
    poster: '/assets/site/archive_09_poster.Ci1Ikljb.jpg',
  },
  {
    id: 'arch-10',
    number: '10',
    title: 'Sculptural Object Design',
    category: 'Industrial Design',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_10.CKmben8j.jpg',
  },
  {
    id: 'arch-11',
    number: '11',
    title: 'Minimalist Studio Staging',
    category: 'Visual Storytelling',
    year: '2022',
    type: 'image',
    src: '/assets/site/archive_11.Bfwm70R4.jpg',
  },
  {
    id: 'arch-12',
    number: '12',
    title: 'Dark Mode App Screens',
    category: 'Digital UI Graphics',
    year: '2024',
    type: 'image',
    src: '/assets/site/archive_12.8dzgGLTe.jpg',
  },
  {
    id: 'arch-13',
    number: '13',
    title: 'Brutalist Monogram Concept',
    category: 'Brand Identity',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_13.Nz6IokRg.jpg',
  },
  {
    id: 'arch-14',
    number: '14',
    title: 'Environmental Signage',
    category: 'Signage & Print',
    year: '2023',
    type: 'image',
    src: '/assets/site/archive_14.DgHzuvb0.jpg',
  },
  {
    id: 'arch-15',
    number: '15',
    title: 'Experimental Digital Art',
    category: 'Visual Art',
    year: '2024',
    type: 'image',
    src: '/assets/site/archive_15.C_NFX1re.jpg',
  },
  {
    id: 'arch-16',
    number: '16',
    title: 'Atmospheric Brand Reel',
    category: 'Video Editing & Motion',
    year: '2024',
    type: 'video',
    src: '/assets/site/archive_16.CqiVaxxm.mp4',
    poster: '/assets/site/archive_16_poster.CsoMmu0B.jpg',
  },
];

export const ARCHIVE_ITEMS: ArchiveItem[] = CASE_STUDIES.map((project, index) => ({
  id: `archive-${project.id}`,
  number: String(index + 1).padStart(2, '0'),
  title: project.title.replace('\n', ' '),
  category: project.category,
  year: project.year,
  type: 'image',
  src: project.coverImage,
}));

export const MERAJ_PROFILE: MerajProfile = {
  name: 'Meraj Hossain',
  title: 'Graphics Designer | Video Editor | Motion Graphics Designer',
  subtitle: 'Visual Storyteller & Motion Designer',
  headline: 'I craft compelling visual storytelling across motion graphics, video editing, and brand design',
  location: 'Savar, Dhaka, Bangladesh',
  timezoneOffset: 6, // BST UTC+6
  avatarImage: '/assets/meraj-profile.png',
  email: 'munnahosain042@gmail.com',
  phone: '+88013-00294781',
  address: '1216 Nagar Kanda, Savar, Dhaka',
  linkedin: 'https://linkedin.com/in/merajhossain47',
  aboutText: {
    intro:
      'Creative Graphics Designer and Motion Graphics Artist with proven experience in branding, social media design, video editing, and promotional content.',
    background:
      'Skilled in Adobe Creative Suite and passionate about visual storytelling, creative problem solving, and delivering high-quality designs for digital and print media.',
    philosophy:
      'Every frame matters. I strip away the superfluous and elevate visual rhythm, kinetic motion, and color harmony to make stories felt, not just seen.',
  },
  skills: [
    {
      category: 'Core Disciplines',
      items: [
        'Motion Graphics',
        'Video Editing',
        'Graphic Design',
        'Color Grading',
        'Branding Design',
        'Visual Storytelling',
      ],
    },
    {
      category: 'Software & Tools',
      items: [
        'Adobe After Effects',
        'Adobe Premiere Pro',
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Microsoft Office',
      ],
    },
  ],
  experience: [
    {
      role: 'Graphics Designer',
      company: 'Micro Electronic, Dhaka',
      period: '2025 – Present',
      description: [
        'Design promotional materials for marketing campaigns.',
        'Create social media creatives and print designs.',
        'Develop branding and advertising materials.',
      ],
    },
    {
      role: 'Contributor',
      company: 'Adobe Stock',
      period: '2023 – Present',
      description: [
        'Create and upload motion graphics templates.',
        'Design stock assets for global clients.',
        'Produce high-quality visual content.',
      ],
    },
    {
      role: 'Computer Operator',
      company: 'KBS Network, Savar',
      period: '2022 – 2025',
      description: [
        'Managed office documentation.',
        'Supported media and promotional projects.',
        'Assisted in technical and administrative tasks.',
      ],
    },
  ],
  education: [
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Kondia High School & College',
      year: '2024',
    },
    {
      degree: 'Maulana (Quran Analyze)',
      institution: 'Jamia Islamia Arabia, Savar',
      year: '2020',
    },
    {
      degree: 'Hafiz (Quran Memorization)',
      institution: 'Nurul Quran Al-Islamia Academy',
      year: '2014',
    },
  ],
  values: [
    {
      number: '01',
      title: 'Craft & Precision',
      description:
        'Deep mastery of keyframing, typography pacing, and color grading. Every cut, transition, and pixel is tuned to create lasting impact.',
    },
    {
      number: '02',
      title: 'Visual Storytelling',
      description:
        'Motion design exists to tell an unmistakable story. Bringing ideas and brands to life through dynamic energy and emotion.',
    },
    {
      number: '03',
      title: 'Continuous Evolution',
      description:
        'Pushing boundaries with cutting-edge motion trends, visual effects, and modern digital art aesthetics.',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Observe & Concept',
      sub: 'Clear Foundation',
      description:
        'Deep understanding of the brief, audience context, and core narrative before touching the timeline.',
    },
    {
      step: '02',
      title: 'Storyboard & Styleframe',
      sub: 'Defined Territories',
      description:
        'Designing visual styleframes, motion boards, and color palettes for seamless client alignment.',
    },
    {
      step: '03',
      title: 'Motion & Animation',
      sub: 'Dynamic Execution',
      description:
        'Breathing life into vector assets with fluid easing curves, 3D layer depth, and kinetic rhythm in After Effects.',
    },
    {
      step: '04',
      title: 'Color Grade & Sound Sync',
      sub: 'Sensory Polish',
      description:
        'Fine-tuning exposure, cinematic LUTs, and syncing beats to deliver broadcast-level punch.',
    },
    {
      step: '05',
      title: 'Delivery & Multi-Format',
      sub: 'Production Ready',
      description:
        'Exporting pristine high-res deliverables optimized for social feeds, digital billboards, and broadcast.',
    },
  ],
  clients: [
    'Micro Electronic',
    'Adobe Stock',
    'KBS Network',
    'Commercial Video Campaigns',
    'Motion Graphics Templates',
    'Brand Identity Systems',
  ],
};
