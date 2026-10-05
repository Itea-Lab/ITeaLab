'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  // 1. Pass through SVGs untouched
  if (src.endsWith('.svg')) {
    return src;
  }

  // 2. Pass through remote CDN URLs (Aceternity, Unsplash, Cloudinary)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // 3. Local development fallback: bypass /cdn-cgi to avoid local 404s
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  // 4. Production Cloudflare Edge Image Resizing
  const q = quality || 80;
  const cleanSrc = src.replace(/^\//, '');
  return `/cdn-cgi/image/width=${width},quality=${q},format=auto/${cleanSrc}`;
}
