export function blogPageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}
