export function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach(cookie => {
    const [name, ...rest] = cookie.split("=");
    const value = rest.join("=").trim();
    cookies[name.trim()] = decodeURIComponent(value);
  });

  return cookies;
}
