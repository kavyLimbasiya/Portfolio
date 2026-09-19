/**
 * Resolves an asset path to work both locally and in production with Vite's base path (e.g. /Portfolio/).
 */
export function getAssetUrl(path?: string): string {
  if (!path) return '';

  // Leave absolute remote URLs (http/https/data/blob) intact
  if (/^(https?:|data:|blob:|\/\/)/i.test(path)) {
    return path;
  }

  // Strip leading slash(es)
  const cleanPath = path.replace(/^\/+/, '');

  // Base URL from Vite configuration (defaults to '/')
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  // Avoid double-prefixing if the path already starts with the base URL
  if (path.startsWith(normalizedBase)) {
    return path;
  }

  return `${normalizedBase}${cleanPath}`;
}
