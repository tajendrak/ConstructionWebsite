PRODUCT IMAGES
================

Every product now has a real image already included in this folder —
20 original flat-style illustrations (SVG), one per SKU, color-matched to
the site's bright blue/violet/orange/pink palette. Nothing else to set up;
they're referenced directly by script.js and will just work.

Filenames match the product IDs from script.js -> PRODUCTS, e.g.:

  images/ELV-TR-100.svg   Traction Elevator TR-100
  images/FAN-IND-24.svg   Industrial Drum Fan IND-24
  images/AC-SPL-12.svg    Split AC Unit SPL-12
  images/LIT-HB-150.svg   LED High-Bay HB-150
  images/SWB-DB-100.svg   Distribution Board DB-100
  ...and so on for all 20 SKUs.

WANT TO USE REAL PHOTOS INSTEAD?
---------------------------------
Just drop a same-named file into this folder using a raster format instead,
e.g. images/ELV-TR-100.jpg, and update the matching <img src="..."> path
in script.js (search for "images/${p.id}" -- there are 3 places: the product
grid, the detail modal, and the cart drawer) to use .jpg instead of .svg.

Note: real product photos weren't scraped from the web for you on purpose --
stock photography is copyrighted, and using it in a real deliverable/site
without a license is a real risk. Use your own photos, your supplier's
press-kit images (check usage terms first), or a licensed stock source.

FALLBACK BEHAVIOR
------------------
If an image file ever goes missing, the site automatically falls back to a
simple SVG line icon instead of showing a broken image (see the
iconElement() function and the onerror attribute on each <img> tag in
script.js), so the site never looks broken.
