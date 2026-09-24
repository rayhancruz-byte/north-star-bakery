# North Star Bakery — Touchstone 3

This project continues the four HTML pages from Touchstone Task 2. It adds one external stylesheet, a mobile-first Flexbox layout, and a media query at 48rem (768px with default browser settings).

## Files

- `index.html`: welcome, featured cookies, storefront, and visiting information.
- `products.html`: bread, pastries, cakes, prices, and Signature Loaf figure.
- `about.html`: bakery story, sourcing, team, and supplied welcome audio.
- `contact.html`: labeled inquiry/preorder form and visiting information.
- `styles.css`: all visual and responsive rules.
- `media/`: supplied Sophia Bakery assets. Keep these filenames unchanged.

## Run the preview in Codespaces

1. Upload the entire folder contents to your public GitHub repository. `index.html`, `styles.css`, and `media/` must be at the same level.
2. Open the repository in GitHub Codespaces.
3. In the terminal run `python3 -m http.server 8000`.
4. Open the forwarded port 8000 in the browser. If sharing a preview is required, set that port's visibility to Public and copy its forwarded URL. The Codespace must remain running for that URL to work.
5. Paste the repository URL and preview URL into the Word template. Verify the repository in an incognito window.

## Design

Four CSS colors: cream #FFF8F0, brown #6B3E26, peach #D88C5A, charcoal #2F2A26. Typography: Georgia for headings and Arial for body text, navigation, and form controls. Font stacks include generic fallbacks.

Peach is an accent, not small text on cream. The current navigation item has an underline, and keyboard focus is visible. Form controls use explicit labels, legends, and native required/email/date validation.

## Project scope

This is an HTML/CSS course prototype. The form has native browser validation but no email or order-processing backend; submitting reloads the page with form fields in the URL. Do not enter real customer information. Connect a secure server-side handler before a real launch. Address, hours, prices, and story are illustrative assignment content.

## Media source

Sophia Learning's Client Scenarios page: https://app.sophia.org/tutorials/client-scenarios
Provided Bakery ZIP: https://app.sophia.org/download/attachment/66378-Bakery_c.zip

The source ZIP uses `_c.png` and `_c.mp3` filenames; HTML references have been corrected to match those actual files. Unused video was omitted because the required welcome audio is included.

## Verification

All four pages were checked in Chromium at 390px and 1280px widths. No horizontal overflow was found; all images loaded; layouts changed from column to row; empty required fields failed validation and a completed sample inquiry passed. All relative page, stylesheet, and media paths resolve to included files. The repository and shared preview still need to be created.
