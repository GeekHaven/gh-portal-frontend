/**
 * Returns the base URL for API calls directly to the backend server.
 */
export function getApiBase(): string {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.geekhaven.in';
  return backendUrl.replace(/\/+$/, '');
}


export function normalizeEventName(name?: string): string {
  let clean = (name || '').trim();
  while (clean.includes('%')) {
    try {
      const decoded = decodeURIComponent(clean);
      if (decoded === clean) break;
      clean = decoded;
    } catch {
      break;
    }
  }
  return clean.trim();
}

