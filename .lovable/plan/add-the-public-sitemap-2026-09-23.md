# Add the public sitemap

## Build
- Add explicit sitemap inclusion decisions to the two public pages and exclude the shared root and sitemap endpoint itself.
- Add a router-derived `/sitemap.xml` using `https://dentalpaymenttech.com` so future public static pages can be included through their route setting.
- Reference the sitemap from the existing `robots.txt` without changing its crawler permissions.

## Verify
- Confirm the sitemap returns valid XML containing `/` and `/practicepay` only.
- Confirm the latest preview build remains healthy, then mark the SEO finding ready for rescan.
