export interface ProfileConfig {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  portraitImage?: string;
  scannerImage?: string;
  socials: {
    github: string;
    instagram: string;
    linkedin: string;
  };
}

export interface AudioTrackConfig {
  title: string;
  artist: string;
  url: string;
}

export const PROFILE_CONFIG: ProfileConfig = {
  name: 'LIMBASIYA KAVY',
  tagline: 'GRAPHIC DESIGNER & VIDEO EDITOR',
  bio: 'LIMBASIYA KAVY — I build uncompromised visual systems and kinetic motion narratives for brands that refuse to blend in.',
  email: 'kavylimbasiya78@gmail.com',
  phone: '+91 70960 49000',
  location: 'India, Gujarat, Rajkot',
  portraitImage: '/assets/images/myimage.jpg',
  scannerImage: '/assets/images/spiderman.jpg',
  socials: {
    github: 'https://github.com/kavyLimbasiya',
    instagram: 'https://www.instagram.com/kavy_0269?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
    linkedin: 'https://www.linkedin.com/in/kavy-limbasiya-a48b923b1/',
  },
};

export const AUDIO_CONFIG: AudioTrackConfig = {
  title: 'Do I Clench my Fists ?',
  artist: 'ridgeclub',
  url: 'assets/audio/main.mp3',
};

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  image?: string;
  description: string;
  client?: string;
  deliverables?: string[];
  videoUrl?: string;
  isReel?: boolean;
  featured?: boolean;
}

export interface ToolItem {
  id: string;
  number: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  dotColor: string;
  iconType?: 'capcut' | 'photoshop' | 'aftereffects' | 'custom';
  iconImage?: string;
  image?: string;
}

export interface Certificate {
  id: string;
  number: string;
  title: string;
  issuer: string;
  credentialId: string;
  year: string;
  image: string;
  skills: string[];
  verificationUrl?: string;
}

export interface PersonalWork {
  id: string;
  title: string;
  medium: string;
  size: string;
  image: string;
  description: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: 'video' | 'still' | 'motion' | '3d';
  tag: string;
  year: string;
  thumbnail?: string;
  mediaUrl: string;
  isVideo: boolean;
  duration?: string;
  resolution?: string;
  software?: string[];
  client?: string;
  description: string;
  aspectRatio?: 'tall' | 'wide' | 'square' | 'standard' | 'portrait';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'demon-slayer-edit',
    number: '01',
    title: 'Demon Slayer Edit',
    category: 'ANIME EDIT',
    tag: 'ANIME EDIT',
    year: '2025',
    isReel: true,
    image: '/assets/images/videos/16.mp4',
    videoUrl: '/assets/images/videos/16.mp4',
    description: 'Demon Slayer Edit',
    deliverables: ['Anime Edit']
  },
  {
    id: 'car-edit',
    number: '02',
    title: 'Car Edit',
    category: 'CAR EDIT',
    tag: 'CAR EDIT',
    year: '2026',
    isReel: true,
    image: '/assets/images/videos/17.mp4',
    videoUrl: '/assets/images/videos/17.mp4',
    description: 'Car Edit',
    deliverables: ['Car Edit']
  },
  {
    id: 'aesthetic-poster',
    number: '03',
    title: 'AESTHETIC POSTER',
    category: 'AESTHETIC POSTER',
    tag: 'AESTHETIC POSTER',
    year: '2026',
    isReel: false,
    image: '/assets/images/posters/20.jpg',
    description: 'Aesthetic Poster',
    deliverables: ['Aesthetic Poster']
  },
  {
    id: 'red-eye',
    number: '04',
    title: 'RED EYE',
    category: 'POSTER',
    tag: 'POSTER',
    year: '2025',
    isReel: false,
    image: '/assets/images/posters/16.jpg',
    description: 'Red Eye',
    deliverables: ['Red Eye']
  },
  {
    id: 'car-edit2',
    number: '05',
    title: 'CAR EDIT 2.0',
    category: 'CAR EDIT',
    tag: 'CAR EDIT',
    year: '2025',
    isReel: true,
    image: 'assets/images/videos/14.mp4',
    videoUrl: 'assets/images/videos/14.mp4',
    description: 'Car Edit 2.0',
    deliverables: ['Car Edit 2.0']
  },
  {
    id: '3 in one frame',
    number: '06',
    title: '3 IN ONE FRAME',
    category: '3 IN ONE FRAME',
    tag: '3 IN ONE FRAME',
    year: '2025',
    isReel: false,
    image: '/assets/images/posters/17.jpg',
    description: '3 Spider Man In One Frame',
    deliverables: ['3 In One Frame']
  },
  {
    id: 'cartoon-edit',
    number: '07',
    title: 'CARTOON EDIT',
    category: 'CARTOON EDIT',
    tag: 'CARTOON EDIT',
    year: '2024',
    isReel: true,
    image: 'assets/images/videos/9.mp4',
    videoUrl: 'assets/images/videos/9.mp4',
    description: 'Cartoon Edit',
    client: 'Cartoon Edit',
    deliverables: ['Cartoon Edit']
  }
];

export const TOOLKIT_ITEMS: ToolItem[] = [
  {
    id: 'capcut',
    number: 'T/01',
    name: 'CAPCUT',
    role: 'MOBILE VIDEO EDITING',
    description: 'I create my edited videos using CapCut on mobile. It helps me turn simple clips into engaging content with smooth transitions, effects, music syncing, and creative storytelling. I enjoy experimenting with different styles to make each video unique and eye-catching.',
    tags: ['VIDEO EDITING', 'EDITING', 'EFFECTS', 'STORYTELLING'],
    dotColor: '#ff0000',
    iconType: 'capcut',
    iconImage: '/assets/images/capcut.png'
  },
  {
    id: 'photoshop',
    number: 'T/02',
    name: 'ADOBE PHOTOSHOP',
    role: 'POSTER & VISUAL DESIGN',
    description: 'I design posters and creative visuals using Adobe Photoshop. From color grading to detailed editing and layout design, I love transforming ideas into clean, professional, and visually appealing artwork.',
    tags: ['POSTERS', 'COLOR GRADING', 'LAYOUT', 'RETOUCH'],
    dotColor: '#ff0000',
    iconType: 'photoshop',
    iconImage: '/assets/images/photoshop.png'
  },
  {
    id: 'aftereffects',
    number: 'T/03',
    name: 'AFTER EFFECTS',
    role: 'MOTION GRAPHICS (LEARNING)',
    description: "I'm currently learning Adobe After Effects to level up my motion graphics skills. I'm exploring animations, transitions, and visual effects to create more dynamic and cinematic content in the future.",
    tags: ['ANIMATION', 'MOTION', 'LEARNING'],
    dotColor: '#ff0000',
    iconType: 'aftereffects',
    iconImage: '/assets/images/after-effects.png'
  }
];

export const FEATURED_PROJECT: Project = {
  id: 'featured-project-01',
  number: 'P/01',
  title: 'NOIRYX',
  category: 'PC WALLPAPER SITE',
  tag: 'BRAND CAMPAIGN',
  year: '2025',
  image: '/assets/images/Noiryx.jpg',
  description: 'Noiryx is a sleek wallpaper platform designed to deliver high-quality, aesthetic backgrounds. It offers a curated collection of images across different styles, allowing users to personalize their screens with visually stunning and modern wallpapers.',
  featured: true
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-01',
    number: 'C/01',
    title: 'DIGI POSTER PRESENTATION',
    issuer: 'ATMIYA UNIVERSITY',
    credentialId: '',
    year: '2024',
    image: '/assets/images/Certificate/1.jpg',
    skills: ['DIGITAL', 'POSTER', 'PRESENTATION', 'Grid Theory'],
  },
  {
    id: 'cert-02',
    number: 'C/02',
    title: 'DIGITAL POSTER & LOGO DESIGN',
    issuer: 'ATMIYA UNIVERSITY',
    credentialId: '',
    year: '2024',
    image: '/assets/images/Certificate/2.png',
    skills: ['DIGITAL', 'POSTER', 'LOGO', 'DESIGN'],
  },
  {
    id: 'cert-03',
    number: 'C/03',
    title: 'DML STATEMENTS',
    issuer: 'GREATE LEARNING',
    credentialId: '',
    year: '2024',
    image: '/assets/images/Certificate/3.jpg',
    skills: ['DML', 'STATEMENT'],
  },
  {
    id: 'cert-04',
    number: 'C/04',
    title: 'C++ TUTORIAL',
    issuer: 'GREATE LEARNING',
    credentialId: '',
    year: '2024',
    image: '/assets/images/Certificate/4.jpg',
    skills: ['C++', 'TUTORIAL'],
  },
  {
    id: 'cert-05',
    number: 'C/05',
    title: 'DATABASE MANAGEMENT SYSTEM',
    issuer: 'GREATE LEARNING',
    credentialId: '',
    year: '2025',
    image: '/assets/images/Certificate/5.jpg',
    skills: ['DATABASE', 'MANAGEMENT', 'SYSTEM'],
  },
  {
    id: 'cert-06',
    number: 'C/06',
    title: 'CODE CARNIVAL',
    issuer: 'ADSC',
    credentialId: '',
    year: '2025',
    image: '/assets/images/Certificate/6.png',
    skills: ['CODE CARNIVAL', '36 HOURS', 'HACKATHON'],
  }
];

export const PERSONAL_WORKS: PersonalWork[] = [
  {
    id: 'sketch-01',
    title: 'ALL GOD IN ONE FRAME',
    medium: 'Pen Only',
    size: 'Normal Book',
    image: '/assets/images/drawing/1.jpg',
    description: 's'
  },
  {
    id: 'doodle-series',
    title: 'BERSERK Character',
    medium: 'Pen Only',
    size: 'Normal Book',
    image: '/assets/images/drawing/2.jpg',
    description: ''
  },
  {
    id: 'line-study',
    title: 'Castle',
    medium: 'Pen Only',
    size: 'Normal Book',
    image: '/assets/images/drawing/3.webp',
    description: ''
  },
  {
    id: 'texture-04',
    title: 'Blue Lock Anime Panel',
    medium: 'Pen Only',
    size: 'Normal Book',
    image: '/assets/images/drawing/4.webp',
    description: ''
  },
  {
    id: 'sketch-05',
    title: 'Ganesha God',
    medium: 'Pen Only',
    size: 'Normal Book',
    image: '/assets/images/drawing/5.webp',
    description: ''
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's01',
    number: 'S/01',
    title: 'MOTION & VIDEO EDITING',
    description: 'Narrative editing, colour grading and motion design for launch films, campaign reels, music videos and social cut-downs.',
    skills: ['EDIT + GRADE', 'MOTION TITLES', 'SOUND DESIGN', 'MASTER + CUT-DOWNS']
  },
  {
    id: 's03',
    number: 'S/03',
    title: 'EDITORIAL & PRINT',
    description: 'Typography systems, publications, exhibition collateral, vinyl records and large format street art posters with tactile production specs.',
    skills: ['BOOK DESIGN', 'POSTER SERIES', 'FOIL & EMBOSS SPECS', 'GRID ARCHITECTURE']
  },
  {
    id: 's04',
    number: 'S/04',
    title: 'ART DIRECTION',
    description: 'Holistic visual direction, moodboarding, shoot styling, camera pacing guidelines and bespoke brand identity ecosystems.',
    skills: ['CREATIVE STRATEGY', 'SHOOT DIRECTION', 'BRAND GUIDELINES', 'VISUAL DNA']
  }
];

export const RULES = [
  {
    number: '01',
    title: 'CLARITY OVER CLEVER',
    body: 'Every frame earns its place. I strip the noise until only the idea remains — then make that idea impossible to ignore.'
  },
  {
    number: '02',
    title: 'RHYTHM IS EVERYTHING',
    body: 'Editing is music. Cuts land on the beat, typography breathes, and motion carries weight. Timing is the whole craft.'
  },
  {
    number: '03',
    title: 'MAKE IT MOVE',
    body: 'Static is a starting point, never the destination. If it can move, it should — with intent, not decoration.'
  }
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Blue Lock Isagi Edit',
    category: 'video',
    tag: 'EDIT , CAPCUT',
    year: '2024',
    mediaUrl: 'assets/images/videos/1.mp4',
    isVideo: true,
    duration: '0:18',
    software: ['CapCut Pro'],
    description: 'First Capcut Edit'
  },
  {
    id: '2',
    title: '1st Poster Edit',
    category: 'still',
    tag: 'Poster',
    year: '2024',
    mediaUrl: 'assets/images/posters/1.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Make my favorite F1 team poster'
  },
  {
    id: '3',
    title: 'Blue Lock Nagi Edit',
    category: 'video',
    tag: 'EDIT , CAPCUT',
    year: '2024',
    mediaUrl: 'assets/images/videos/2.mp4',
    isVideo: true,
    duration: '0:18',
    software: ['CapCut Pro'],
    description: 'Second Capcut Edit'
  },
  {
    id: '4',
    title: 'Aesthetic Cool POster',
    category: 'still',
    tag: 'Poster , mobile',
    year: '2024',
    mediaUrl: 'assets/images/posters/2.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Trying to make Cool Aesthetic Poster'
  },
  {
    id: '5',
    title: 'Blue Lock bachira Edit',
    category: 'video',
    tag: 'Edit , Video',
    year: '2024',
    mediaUrl: 'assets/images/videos/3.mp4',
    isVideo: true,
    duration: '0:19',
    software: ['Capcut Pro'],
    description: 'Meguru Bachira 9/11 Edit'
  },
  {
    id: '6',
    title: 'Blue Lock Yukimiya Edit',
    category: 'video',
    tag: 'Edit , Video',
    year: '2024',
    mediaUrl: 'assets/images/videos/4.mp4',
    isVideo: true,
    duration: '0:24',
    software: ['CapCut Pro'],
    description: 'Blue Lock Yukimiya Kenyu Edit'
  },
  {
    id: '7',
    title: 'ESCAPE',
    category: 'still',
    tag: 'GRAPHICS DESIGNING',
    year: '2024',
    mediaUrl: 'assets/images/posters/3.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Life is short. enjoy life.'
  },
  {
    id: '8',
    title: 'MICHAL JACKSON',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/4.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Make Poster of KING OF POP'
  },
  {
    id: '9',
    title: 'PORSCHE RWB',
    category: 'video',
    tag: 'EDITING , CAPCUT',
    year: '2024',
    mediaUrl: 'assets/images/videos/5.mp4',
    isVideo: true,
    duration: '0:43',
    software: ['CapCut Pro'],
    description: 'Making edit of my favorite RWB\'s Porsche'
  },
  {
    id: '10',
    title: 'THIS IS ART',
    category: 'still',
    tag: 'GRAPHIC DESIGNING',
    year: '2024',
    mediaUrl: 'assets/images/posters/5.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'This is Art'
  },
  {
    id: '11',
    title: 'Blue Lock Nagi Edit 2.0',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2026',
    mediaUrl: 'assets/images/videos/6.mp4',
    isVideo: true,
    duration: '0:32',
    software: ['CapCut Pro'],
    description: 'My Favorite BL Character Edit'
  },
  {
    id: '12',
    title: 'THIS IS FUTURE',
    category: 'still',
    tag: 'GRAPHIC DESIGNING',
    year: '2024',
    mediaUrl: 'assets/images/posters/6.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'This is Future'
  },
  {
    id: '13',
    title: 'Minecraft Chicken Jokey',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2024',
    mediaUrl: 'assets/images/videos/7.mp4',
    isVideo: true,
    duration: '0:19',
    software: ['CapCut Pro'],
    description: 'Little Funniest Video Edit'
  },
  {
    id: '14',
    title: 'Michelangelo David',
    category: 'still',
    tag: 'GRAPHIC DESIGNING',
    year: '2024',
    mediaUrl: 'assets/images/posters/7.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Michelangelo David. Power of Money'
  },
  {
    id: '15',
    title: 'BL Isagi Edit 2.0',
    category: 'video',
    tag: 'EDITING',
    year: '2024',
    mediaUrl: 'assets/images/videos/8.mp4',
    isVideo: true,
    duration: '0:38',
    software: ['CapCut Pro'],
    description: 'Anime Edit with new Style.'
  },
  {
    id: '16',
    title: 'Beauty of Queen',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/8.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Beauty of Queen'
  },
  {
    id: '17',
    title: 'DORA VS MASHA EDIT',
    category: 'video',
    tag: 'EDITING',
    year: '2024',
    mediaUrl: 'assets/images/videos/9.mp4',
    isVideo: true,
    duration: '0:36',
    software: ['CapCut Pro'],
    description: 'DORA VS MASHA EDIT BUT ANIME STYLE.'
  },
  {
    id: '18',
    title: 'Old style Soilder',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/9.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Old Style edit'
  },
  {
    id: '19',
    title: 'Car Edit with Hard shake',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2025',
    mediaUrl: 'assets/images/videos/10.mp4',
    isVideo: true,
    duration: '0:30',
    software: ['CapCut Pro'],
    description: 'My Favorite Car Edit with Hard shake.'
  },
  {
    id: '20',
    title: 'Astronaut',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/10.png',
    isVideo: false,
    software: ['Picsart'],
    description: 'Astronaut is chilling'
  },
  {
    id: '21',
    title: '67 Car Edit',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2025',
    mediaUrl: 'assets/images/videos/11.mp4',
    isVideo: true,
    duration: '0:17',
    software: ['CapCut Pro'],
    description: '67 Kid Edit'
  },
  {
    id: '22',
    title: 'Chase Youe Dream',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/11.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Motivational Poster. Chase Your Dream'
  },
  {
    id: '23',
    title: 'In to Deep',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/12.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'In to Deep'
  },
  {
    id: '24',
    title: '3rd Car Edit During Hackathon',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2025',
    mediaUrl: 'assets/images/videos/12.mp4',
    isVideo: true,
    duration: '0:23',
    software: ['CapCut Pro'],
    description: '3rd Car Edit During 48 Hour Hackathon'
  },
  {
    id: '25',
    title: 'Nature Poster',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/13.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Nature is Beautiful'
  },
  {
    id: '26',
    title: '12 Car Edit in One',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2025',
    mediaUrl: 'assets/images/videos/13.mp4',
    isVideo: true,
    duration: '0:27',
    software: ['CapCut Pro'],
    description: '12 Car Edit in One Video'
  },
  {
    id: '27',
    title: 'Time is Art. Art is Beauty',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2024',
    mediaUrl: 'assets/images/posters/14.jpg',
    isVideo: false,
    software: ['Picsart'],
    description: 'Time is Art. Art is Beauty'
  },
  {
    id: '28',
    title: 'Make Edit by my own Idea',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2025',
    mediaUrl: 'assets/images/videos/14.mp4',
    isVideo: true,
    duration: '0:39',
    software: ['CapCut Pro'],
    description: 'Make Edit by my own Idea'
  },
  {
    id: '29',
    title: 'Make my 1st Photoshop Poster',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2025',
    mediaUrl: 'assets/images/posters/15.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: 'My 1st Photoshop Poster'
  },
  {
    id: '30',
    title: 'Y2K style Poster',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2026',
    mediaUrl: 'assets/images/posters/16.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: 'Y2K style Poster'
  },
  {
    id: '31',
    title: 'Simo Hayha - The white Death Edit',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2026',
    mediaUrl: 'assets/images/videos/15.mp4',
    isVideo: true,
    duration: '0:40',
    software: ['CapCut Pro'],
    description: 'Simo Hayha known as The white Death Edit'
  },
  {
    id: '32',
    title: 'All 3 Spider man version in one frame',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2026',
    mediaUrl: 'assets/images/posters/17.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: 'All 3 Spider man version in one frame'
  },
  {
    id: '33',
    title: 'Demon Slayer edit',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2026',
    mediaUrl: 'assets/images/videos/16.mp4',
    isVideo: true,
    duration: '0:50',
    software: ['CapCut Pro'],
    description: 'Demon Slayer edit with trending BGM'
  },
  {
    id: '34',
    title: 'Snow Board Dare Devil',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2026',
    mediaUrl: 'assets/images/posters/18.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: 'Dare Devil is Snow Boarding.'
  },
  {
    id: '35',
    title: 'Smiley Mclaren Edit',
    category: 'video',
    tag: 'VIDEO EDITING',
    year: '2026',
    mediaUrl: 'assets/images/videos/17.mp4',
    isVideo: true,
    duration: '0:26',
    software: ['CapCut Pro'],
    description: 'Smiley Mclaren Edit'
  },
  {
    id: '36',
    title: 'F1 Driver Max verstappen Poster',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2026',
    mediaUrl: 'assets/images/posters/19.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: 'Max verstappen Poster'
  },
  {
    id: '37',
    title: '1st After Edffect Motion Video',
    category: 'video',
    tag: 'MOTION EDITING',
    year: '2026',
    mediaUrl: 'assets/images/videos/18.mp4',
    isVideo: true,
    duration: '0:34',
    software: ['After Effects'],
    description: 'This is my 1st After Effects Motion Editing.'
  },
  {
    id: '38',
    title: 'Man made 3 Machine in one frame',
    category: 'still',
    tag: 'GRAPHIC DESIGN',
    year: '2026',
    mediaUrl: 'assets/images/posters/20.jpg',
    isVideo: false,
    software: ['Photoshop'],
    description: '3 Machine in one frame'
  }
];
