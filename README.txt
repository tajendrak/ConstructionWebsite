HOW TO ADD PRODUCT PHOTOS
==========================

Each product card and the detail/cart views look for an image at:

    images/<PRODUCT-ID>.jpg

For example, the Traction Elevator TR-100 (id: ELV-TR-100) looks for:

    images/ELV-TR-100.jpg

Full list of expected filenames (from script.js -> PRODUCTS):

  images/ELV-TR-100.jpg     Traction Elevator TR-100
  images/ELV-MRL-80.jpg     Machine-Room-Less MRL-80
  images/ELV-FR-2000.jpg    Freight Elevator FR-2000
  images/ELV-CAP-60.jpg     Capsule Elevator CAP-60
  images/FAN-IND-24.jpg     Industrial Drum Fan IND-24
  images/FAN-EXH-10.jpg     Wall Exhaust Fan EXH-10
  images/FAN-CEIL-56.jpg    Commercial Ceiling Fan CEIL-56
  images/FAN-PED-18.jpg     Pedestal Fan PED-18
  images/AC-SPL-12.jpg      Split AC Unit SPL-12
  images/AC-VRF-48.jpg      VRF System VRF-48
  images/AC-DUC-60.jpg      Ducted Central AC DUC-60
  images/AC-CAS-24.jpg      Cassette AC CAS-24
  images/LIT-HB-150.jpg     LED High-Bay HB-150
  images/LIT-TSK-20.jpg     Task Lamp TSK-20
  images/LIT-ACC-10.jpg     Accent Spotlight ACC-10
  images/LIT-DEC-PN.jpg     Decorative Pendant DEC-PN
  images/SWB-DB-100.jpg     Distribution Board DB-100
  images/SWB-MCB-32.jpg     MCB Module MCB-32
  images/SWB-MET-1P.jpg     Metering Module MET-1P
  images/SWB-ISO-63.jpg     Isolator Switch ISO-63

Just drop a .jpg with the matching filename into this folder and it will
show up automatically on the product card, the detail modal, and the cart
drawer — no code changes needed.

If a file is missing, the site automatically falls back to a simple SVG
icon instead of showing a broken image (see the `iconElement()` function
and the `onerror` attribute on each <img> tag in script.js), so the site
never looks broken even before you've added real photos.

Note: product photos weren't auto-generated or scraped from the web for
you here on purpose -- stock photography is copyrighted, and using it in
a real deliverable/site without a license is a real risk. Use your own
photos, your supplier's press-kit images (check their usage terms first),
or a licensed stock source (e.g. Unsplash for editorial-style shots where
the license allows it) instead.
