# Property photographs

Add only photographs supplied for Ojubanire Villa to this directory. Image paths are managed in `src/data/siteConfig.ts`, so there is no need to edit the page components when replacing or adding photos.

- Save the supplied living-room hero photograph as `public/images/hero.jpg`. It is already configured as the hero image.
- Set `images.about.src` for the main site photography.
- Set each location's `image` only after that photograph has been confirmed for Phase 1 or Phase 2.
- Add gallery entries to `gallery` with a local `src`, descriptive `alt` text, and an optional caption. Add a `location` only when the phase is known.
- Set `seo.openGraphImage` to a share image if one is supplied.
- Keep `whatsappNumber` blank until a WhatsApp-enabled business number is verified. Use an international number with country code when configuring it.

Example folders can be created as needed:

```text
public/images/
  phase-1/
  phase-2/
  gallery/
```