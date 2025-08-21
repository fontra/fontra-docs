---
title     : Glyph Sets
layout    : default
permalink : /reference/font-overview/panels/navigation/glyph-sets
order     : 4112
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/font-overview/panels">Panels</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/font-overview/panels/navigation">Navigation</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>

A "Glyph set" is a collection of glyphs, which is independent from the glyphs that are defined in the font. A glyph can be defined in the glyph set, but not in the font or vice versa. Glyphs in the set that do not exist in the font are represented as "placeholder" glyphs in overview, showing a generic character in gray if the code point exists.

In the left sidebar, there are two sections about glyph sets:
- "Project glyph sets": belong to the font, and are stored with the font data.
- "My glyph sets": belong to the user, and are stored locally in the browser.

The "Project glyph sets" contains one special glyph set "This font's glyphs", that represents the glyphs that exist in the font, and nothing more.

Selecting multiple glyph sets shows the superset of all selected sets.

Glyphs sets are stored purely by references to online resources. A glyph set can reference any publicly visible text file containing glyph names, or a TSV/CSV file, containing code point and/or glyph name columns. Links to Google Docs or Google Sheets are internally converted to .txt or .csv download links, respectively.

We are considering supporting uploading of local files in the future, but for now consider this a pilot, where we encourage people strongly to use (and create) online glyph set resources.

The currently bundled preset glyph sets collections are from Google Fonts, Black Foundry, Adobe and Christoph Koeberlin. We are [open to suggestions](https://github.com/fontra/fontra/discussions/1943) for more preset glyph sets.



To add one or more glyph sets to either section, use the "+" button. This leads to a dialog where you can either activate any of the preset glyph sets, or add a custom glyph set.

![]({{ site.url }}/images/font-overview-preset-glyph-sets-dialog.png){: .img-fluid }


#### Custom glyph sets

To create a custom glyph set, click the "Add custom glyph set" button in the above dialog. This leads to a different dialog, where the user can specify the parameters for a custom glyph set.

We currently support two formats:
- A text file containing white-space separated glyph names
  - Code points are inferred from the glyph name
- A tab-, comma-, or semicolon-separated text file (.tsv or .csv) with at least one column
  - Optionally a header row: the first non-empty, non-comment row
  - A column can be specified by header cell or by zero-based column index
  - The code point column can contain decimal or hexadecimal code points.
  - Hexadecimal code points may be prefixed by 0x or U+
  - If there is no code point, a code point will be inferred from the glyph name
  - If there is no glyph name, a glyph name will be inferred from the code point

Additional info for both formats:
- For now, code point and glyph name "guessing" is done according to the Glyphs app naming convention, and will additionally parse uni1234-style and u12345-style names.
- Both formats support an optional comment character for comment-until-the-end-of-the-line-style comments.