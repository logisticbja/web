export function blogPageHref(page: number, base = "/blog") {
  return page <= 1 ? base : `${base}/page/${page}`;
}
