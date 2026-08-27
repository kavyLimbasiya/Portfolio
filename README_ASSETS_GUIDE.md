# Portfolio Asset & Media Guide

This guide explains how to store your videos and images for your showcase, which files to replace, and how the media system operates.

---

## 1. Where to Store Videos and Images

Place your local files directly in the `public/` directory so they are served statically at root level:

```
public/
├── assets/
│   └── profile.jpg            <-- Your main profile / about portrait photo
└── media/
    ├── images/
    │   ├── portrait.jpg       <-- High-res portrait for interactive hover lens
    │   ├── project-01.jpg     <-- Showcase project thumbnails / posters
    │   ├── project-02.jpg
    │   └── artwork-01.jpg     <-- Personal sketches / artworks
    ├── videos/
    │   ├── reel.mp4           <-- Motion Reel 4K / Showcase clip
    │   ├── project-01.mp4     <-- Specific project video preview
    │   └── edit-cut.mp4
    └── audio/
        └── ambient.mp3        <-- Optional custom background music
```

---

## 2. Which File to Replace / Edit

The master data file containing all your projects, titles, categories, images, and video links is:

👉 **`/src/data/portfolioData.ts`**

### Example: Connecting a Video and Image to a Showcase Project

Open `/src/data/portfolioData.ts` and modify or add your projects:

```typescript
export const PROJECTS: Project[] = [
  {
    id: 'my-showcase-video',
    number: '01',
    title: 'YOUR PROJECT TITLE',
    category: 'VIDEO DIRECTION', // or MOTION DESIGN, BRAND IDENTITY, etc.
    tag: 'VIDEO DIRECTION',
    year: '2026',
    // 📁 Local file in public/media/images:
    image: '/media/images/my-project-thumbnail.jpg',
    // 🎥 Local file in public/media/videos:
    videoUrl: '/media/videos/my-showcase-video.mp4',
    description: 'A brief description of your concept, client brief, and editorial pacing.',
    client: 'Client or Brand Name',
    deliverables: ['Video Editing', 'Sound Design', 'Color Grading']
  },
  // ...
];
```

---

## 3. Supported Media Formats & Remote URLs

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- **Videos**: `.mp4`, `.webm` (H.264 / AAC or VP9 for universal web playback)
- **Remote URLs**: You can also paste direct external links from Vimeo, Cloudinary, AWS S3, or Google Cloud Storage directly into `image` and `videoUrl`.

---

## 4. Background Song & Video Sync Feature

- **Toggle Switch**: Users can turn the background ambient track ON / OFF at any time using the Navbar audio toggle or the floating audio HUD on the bottom left.
- **Smart Pause & Resume**: When any video begins playing (in the showreel modal or on a project card), the background soundtrack automatically pauses. Once the video is paused, finished, or closed, the background soundtrack automatically resumes smoothly right where it left off!

---

## 5. Interactive Profile Cursor Hover Lens

- Hovering over your portrait photo in the **About** section activates a precision optical scanner reticle that follows your mouse cursor.
- The area under the cursor reveals full-spectrum high-definition color, dynamic focal zoom (`MAG: 1.4X`), coordinate telemetry (`X / Y`), and scanner corner brackets, while the rest of the image remains in high-contrast monochrome studio tone.
