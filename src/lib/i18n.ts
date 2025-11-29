export const SUPPORTED_LANGS = ['en', 'es'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export function resolveLang(value?: string | null): Lang {
  if (!value) return DEFAULT_LANG;
  const normalized = value.toLowerCase();
  return SUPPORTED_LANGS.includes(normalized as Lang) ? (normalized as Lang) : DEFAULT_LANG;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function withLangParam(url: string, lang: Lang): string {
  const [pathWithQuery, hash = ''] = url.split('#');
  const [rawPath = '', query = ''] = pathWithQuery.split('?');
  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const segments = normalizedPath.split('/').filter(Boolean);

  if (!segments[0]) {
    segments.unshift(lang);
  } else if (segments[0] === lang) {
    // already prefixed
  } else if (SUPPORTED_LANGS.includes(segments[0] as Lang)) {
    segments[0] = lang;
  } else {
    segments.unshift(lang);
  }

  const langPath = segments.length ? `/${segments.join('/')}` : `/${lang}`;
  const queryString = query ? `?${query}` : '';
  const hashString = hash ? `#${hash}` : '';
  return `${langPath}${queryString}${hashString}`;
}

export function getLangFromAstro(Astro: { url: URL; params?: Record<string, string | undefined> }): Lang {
  if (Astro.params?.lang) {
    return resolveLang(Astro.params.lang);
  }
  return resolveLang(Astro.url.searchParams.get('lang'));
}
