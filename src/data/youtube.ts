import { PUBLIC_ENV } from '../config/publicEnv';

export type YouTubeCategory =
  | 'All'
  | '3D Animation'
  | 'Cybersecurity'
  | 'Linux'
  | 'Database Tutorials';

export interface YouTubeShowcaseVideo {
  id: string;
  youtubeId: string;
  title: string;
  originalTitle?: string;
  category: Exclude<YouTubeCategory, 'All'>;
  description: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  featured?: boolean;
  featuredNote?: string;
}

/**
 * Maintainable, data-driven YouTube video showcase.
 * To add future videos, append a new entry below with its YouTube video ID—no UI redesign required.
 */
export const YOUTUBE_CHANNEL_URL = PUBLIC_ENV.youtubeUrl;

export const YOUTUBE_CATEGORIES: YouTubeCategory[] = [
  'All',
  '3D Animation',
  'Cybersecurity',
  'Linux',
  'Database Tutorials',
];

export const YOUTUBE_SHOWCASE_VIDEOS: YouTubeShowcaseVideo[] = [
  {
    id: 'blender-3d-animation',
    youtubeId: 'o4-yHdBj5II',
    title: 'Blender 3D Animation — Four Months Behind One Minute',
    originalTitle: 'Visualizing the Internet: How your devices actually communicate v.2',
    category: '3D Animation',
    description:
      'A Blender animation project that took approximately four months to complete. The finished video is around one minute long, reflecting the many stages of modeling, lighting, animating, and refining a 3D piece—a personal look at my creative side and interest in visual storytelling.',
    watchUrl: 'https://youtu.be/o4-yHdBj5II',
    embedUrl: 'https://www.youtube-nocookie.com/embed/o4-yHdBj5II?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/o4-yHdBj5II/hqdefault.jpg',
    featured: true,
    featuredNote: 'Creative Highlight · ~4 Months of Blender Production Behind ~1 Minute',
  },
  {
    id: 'john-the-ripper-demo',
    youtubeId: 'JQ5HfuUe6pg',
    title: 'John the Ripper Password Cracking Demonstration',
    originalTitle: 'How they break PDF passwords',
    category: 'Cybersecurity',
    description:
      'An introductory educational demonstration exploring John the Ripper and how password-cracking tools work. Shared purely as cybersecurity learning content to highlight password security and why strong password practices matter.',
    watchUrl: 'https://youtu.be/JQ5HfuUe6pg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/JQ5HfuUe6pg?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/JQ5HfuUe6pg/hqdefault.jpg',
  },
  {
    id: 'intro-kali-linux',
    youtubeId: 'ZTe_zz4czzg',
    title: 'Introduction to Kali Linux',
    originalTitle: 'Kali Linux: The Hacker’s Swiss Army Knife',
    category: 'Linux',
    description:
      'A beginner-friendly educational awareness video introducing Kali Linux, explaining what it is, and covering its role in cybersecurity learning and authorized security testing.',
    watchUrl: 'https://youtu.be/ZTe_zz4czzg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/ZTe_zz4czzg?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/ZTe_zz4czzg/hqdefault.jpg',
  },
  {
    id: 'mysql-primary-keys',
    youtubeId: 'SOe3XJszoKc',
    title: 'How To Use Primary Keys In MySQL Workbench',
    category: 'Database Tutorials',
    description:
      'Beginner MySQL Workbench tutorial introducing primary keys and how relational tables uniquely identify and protect records.',
    watchUrl: 'https://www.youtube.com/watch?v=SOe3XJszoKc',
    embedUrl: 'https://www.youtube-nocookie.com/embed/SOe3XJszoKc?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/SOe3XJszoKc/hqdefault.jpg',
  },
  {
    id: 'mysql-commit-rollback',
    youtubeId: 'TO9nwUG8cFA',
    title: 'How To Use Commit, Rollback And Autocommit in MySQL Workbench',
    category: 'Database Tutorials',
    description:
      'Step-by-step MySQL Workbench walkthrough explaining transactions, autocommit behaviour, and safely rolling back database changes.',
    watchUrl: 'https://www.youtube.com/watch?v=TO9nwUG8cFA',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TO9nwUG8cFA?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/TO9nwUG8cFA/hqdefault.jpg',
  },
  {
    id: 'mysql-delete-statement',
    youtubeId: 'mHTPVD2xers',
    title: 'How To Use The Delete Statement in MySQL Workbench',
    category: 'Database Tutorials',
    description:
      'Beginner database guide showing how the SQL DELETE statement works in MySQL Workbench and how to remove targeted rows carefully.',
    watchUrl: 'https://www.youtube.com/watch?v=mHTPVD2xers',
    embedUrl: 'https://www.youtube-nocookie.com/embed/mHTPVD2xers?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/mHTPVD2xers/hqdefault.jpg',
  },
];
