const LANDING_ORIGIN = "https://tweet-stream-landing-page.pages.dev";
const DOCUMENTS = new Set(["/", "/privacy", "/tos", "/contact"]);

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    // Pages is the source for the documents and their static assets. Methods
    // that could change data always go straight to the existing API origin.
    if (
      (request.method !== "GET" && request.method !== "HEAD") ||
      (!DOCUMENTS.has(incoming.pathname) &&
        !incoming.pathname.startsWith("/assets/") &&
        !incoming.pathname.startsWith("/brand/") &&
        !["/favicon.svg", "/site.webmanifest", "/robots.txt", "/sitemap.xml"].some(
          (path) => incoming.pathname === path,
        ))
    ) {
      return fetch(request);
    }

    const path = DOCUMENTS.has(incoming.pathname) && incoming.pathname !== "/"
      ? `${incoming.pathname}/`
      : incoming.pathname;
    const target = new URL(`${path}${incoming.search}`, LANDING_ORIGIN);
    return fetch(new Request(target, request));
  },
};
