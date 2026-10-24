# Asset organization and maintenance

I keep only browser-ready media under `public`:

| Directory                     | Contents                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| `public/branding`             | Digital Horizon Systems outlined SVG masters, transparent PNG and matte JPG variants.      |
| `public/images/logos`         | Partner, client, and site logos; SVG where available, lossless WebP for raster logos.      |
| `public/images/editorial`     | Shared 1600 by 1067 WebP photography for blog articles and replacement case studies.       |
| `public/images/portfolio`     | WebP video preview thumbnails.                                                             |
| `public/images/case-studies`  | Retained industry photos and integration-test fixture, optimized WebP with source credits. |
| `public/images/about`         | About-page photography.                                                                    |
| `public/images/placeholders`  | Placeholder images.                                                                        |
| `public/images/illustrations` | Other SVG illustrations.                                                                   |
| `public/icons`                | PNG icons referenced by page metadata.                                                     |
| `public/videos/portfolio`     | Six optimized MP4 portfolio previews.                                                      |

`development-plans/assets-manifest.json` records every old path, new path, original and optimized byte count, and SHA-256 hash. No asset was discarded as unused during the initial migration; later replacements remove superseded files after reference checks. All literal source references, including CSS and metadata, were migrated with their files.

## Initial optimization results (historical)

| Assets              | Before     | After     |
| ------------------- | ---------- | --------- |
| 91 images and icons | 41.49 MiB  | 3.94 MiB  |
| 6 portfolio videos  | 95.08 MiB  | 10.68 MiB |
| Total               | 136.57 MiB | 14.62 MiB |

The initial 97-asset migration made the checked-out public directory **89.3% smaller**. The visual refresh adds six case-study photos and three locally served partner logos: that historical inventory was **106 assets / 15.25 MiB**, still below 20 MiB. After the rebrand and editorial replacements, that stage contained **112 assets / 14.83 MiB**. The service/content refresh now has **75 assets / 13.97 MiB**, after adding ten high-resolution shared editorial photos, removing 44 superseded images and retiring three hardware-vendor logos. See [visual refresh](visual-refresh.md) and [current editorial photo credits](service-content-refresh.md).

The [Digital Horizon Systems rebrand record](digital-horizon-rebrand.md) documents current logo exports, replaced editorial photography and source credits. Run `npm run assets:brand` to regenerate brand exports; the general archive optimizer preserves generated brand entries.

## Encoding choices

- General photography and thumbnails: WebP quality 82, maximum 1600 by 1600 pixels, aspect ratio preserved, no enlargement, metadata removed. The shared editorial library uses researched high-resolution sources cropped to 1600 by 1067 at quality 84; source dimensions were checked before encoding.
- Raster logos: lossless WebP, maximum 1200 by 1200 pixels, transparency and aspect ratio preserved. Resizing is deliberate; the encoded pixels are lossless after resizing.
- SVG files remain SVG. PNG application icons retain their format.
- Videos: H.264 MP4, maximum width 1280 pixels, 30 fps, CRF 26, yuv420p, and AAC audio at 96 kbps. Full video durations and audio are retained. `faststart` places MP4 metadata at the beginning for progressive playback. These are website previews; the former local original archive was removed at the project owner's request.

The site already uses thumbnails for portfolio videos and mounts playback on hover. I retained that behavior. Compression is intentionally lossy for photos and videos; use the original archive if a future design needs more detail.

## Original files

The migration initially preserved and verified source assets in `.local/asset-originals`. After all 97 optimized asset hashes and references passed verification, that archive was removed at the project owner's request, freeing 143,200,132 bytes (136.57 MiB). Only optimized assets remain in the working tree. The manifest retains historical source hashes and sizes as provenance; these records are not copies of the files.

Re-encoding requires a separately supplied external source archive using the manifest's original directory layout, FFmpeg on `PATH`, and installed npm dependencies:

```powershell
npm.cmd run assets:optimize -- C:\path\to\external-originals
npm.cmd run assets:check
```

The optimizer no longer creates a local original archive. It requires an explicit source directory, verifies source hashes, and stops if the original sources are absent or different. Fresh clones already contain the optimized assets and need neither FFmpeg nor originals to run, build, or check the project.

The six case-study additions use manifest-specific encoding: 1200 × 800 WebP, quality 78, effort 6, cover crop; cybersecurity is cropped toward the bottom to retain its laptop screen. New external entries retain a relative archive path in `source`, plus `sourceUrl`, `downloadUrl` and original/output hashes. The optimizer honors optional per-asset `encoding` settings. Downloaded sources were processed in memory; originals were not added to the repository.

For new media, encode it using the settings above, place it in its appropriate directory, and add a reviewed manifest entry with original/output paths, byte counts, and SHA-256 hashes. Preserve the original in the separate archive. Update source URLs, then run `npm run assets:check`. Existing manifest entries are immutable source records; review their hashes explicitly when replacing original media.

The check enforces a 20 MiB total budget, a 5 MiB per-file budget, registered public files, exact output hashes, and valid literal local media URLs in source. It catches storage regressions and broken asset paths. Runtime-generated URLs still need browser verification.

## GitHub transfers and Git history

These changes reduce the checked-out `public` directory, deployment uploads, and source archives after the change is committed. Older large files still exist in Git history, so a full clone can continue downloading those objects. I have not rewritten repository history.

For a smaller initial Git download, use a shallow clone (`git clone --depth 1 <repository-url>`) or a filtered clone (`git clone --filter=blob:none <repository-url>`). A future coordinated Git history cleanup can remove old blobs permanently, but changes commit IDs and requires separate planning with everyone using the repository.

The optimized preview assets are small enough to remain self-contained in Git. If the video library grows, move video delivery to object storage/CDN and keep only posters and stable URLs in this repository. Git LFS stores pointer files in Git but adds a separate download and hosting requirement, so it is unnecessary for the current optimized previews.

Studio-uploaded images are optimized and stored in PostgreSQL, outside the repository inventory. See [editorial media storage](editorial-studio.md#media). About images now use new descriptive filenames to bypass stale cached URLs; the replaced files are removed.
