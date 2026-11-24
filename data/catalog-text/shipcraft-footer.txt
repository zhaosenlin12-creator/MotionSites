# Prompt: Shipcraft CTA and footer

Build a single-file **closing CTA plus footer section** for a fictional app builder, **Shipcraft**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is near-black and warm:
- a tilted 3D editor panel glowing amber on the right
- a glossy amber-glass CTA button
- a four-part footer
- two white marble sculpture hands reaching toward each other, lit with an amber rim light
- a giant thin amber-brown "Shipcraft" wordmark sinking off the bottom edge

## Media (transparent PNGs)

- **Editor panel:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5bc1d856-0342-40d4-b7ca-c490ac20624a.png` (912×700). A perspective-tilted dark glass editor with a "Widget Tree" column, where "Home Screen" is selected in amber, and a "Code" column with amber, peach, lilac and teal syntax. It has a glowing amber top edge and fades out at the bottom and left.
- **Left hand:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4c029f38-d0a0-46d1-9ebc-3edcdaa11fc1.png` (582×290).
- **Right hand:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7eba3f06-a99e-44b8-bd46-7ccfaf6b2363.png` (558×328).
- **Hands:** both are polished white Carrara marble with grey veins and a warm amber rim light, reaching in from the left and right edges.
- **Motion:** no video. Only the UI animates.

## Type and colour

- **Font:** Google Sans Flex (variable) for everything.
- **Colours:**
  - background `#0D0D0D`, headline white
  - text greys `#ADADAD`, `#7D7D7D` and `#717171`
  - amber accent `#F0A24C`, social icons `#E0A165`
  - wordmark `#5A3418`
- **Pill:** a dark `#1D1510` pill with an amber hairline and a sparkle icon.
- **Buttons:** glossy amber-glass. The CTA goes from a `#2C241D` to `#7A5832` gradient, with lit white and amber rims and a soft amber halo. The newsletter key has a warm metal gradient.

## Layout (787×753 reference artboard at 900px and wider; `--u` = container width / 787)

- **CTA band:**
  - pill "Ship Your Idea", then "Your next app / starts now."
  - "Describe it, shape it in the canvas or code, ship it to the App Store, Play Store, or web. No install, no credit card."
  - "Get started now"
  - the editor panel bleeding off the top-right
- **Footer:**
  - **Brand:** an original amber sail mark and "shipcraft", the blurb "Shipcraft keeps every surface in sync, / so you never rebuild from scratch.", and LinkedIn, Instagram and YouTube outline icons.
  - **Columns:** Product (Preview, Features, How it works, Developers), Resources (Blog, Documentation, Videos, Community), Company (Contact, Privacy, Terms of Service).
  - **Newsletter:** "Subscribe to our newsletter", a glass email field with placeholder "jane@shipcraft.example" and an arrow key, and "Unsubscribe anytime".
  - **Bottom:** "©2026 / Shipcraft / Build a real app, fast." centred between the reaching hands, with the giant "Shipcraft" wordmark at the bottom.

## Motion (UI)

- **Entrance:** a CSS sequence.
  - The pill fades, then the headline lines rise.
  - The paragraph, button and editor (scale/tilt in) follow, then the footer columns.
- **Reduced motion:** none.

## Narrower screens

- **Below 900px:** a single column with the editor under the CTA.
- **Footer columns:** wrap.
- **Hands and wordmark:** scale to the bottom of the section.

## Acceptance check (1440×1440)

- The amber-lit editor panel tilts on the right of the headline.
- The marble hands reach toward each other over "©2026 Shipcraft".
- The amber-brown "Shipcraft" wordmark sits at the bottom.
- **Content:** no real brands; the placeholder email is a .example address.