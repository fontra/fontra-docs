---
title     : Related Glyphs & Characters
layout    : default
permalink : /reference/editor-view/panels/related-glyphs-and-characters
draft     : true
order     : 4248
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="../panels">Panels</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

<div class='row'>
<div class='col-md' markdown='1'>
![]({{ site.url }}/images/panel-related-glyphs-and-characters-dark.png){: .img-fluid .py-2 }
</div>
<div class='col-md' markdown='1'>
This panel shows related glyphs and/or characters for the glyph that is selected in the canvas.

There are multiple categories of relationships that can be shown. If there are no related glyphs or characters to report for a category, the section is not shown. Each section can be collapsed and expanded with the chevron icon.

Alternate glyphs
: ^
  - Looks for glyphs which have the same glyph name, but with a different extension.

Components used by this glyph
: ^
  - The components as defined in the font (based on glyph information)
  - example: onequarter -> one.numerator, four.numerator, fraction

Glyphs using this glyph as a component
: ^
  - These are glyphs within this font which use the selected glyph as a component
  - example: a -> aacute, abreve, aring, adieresis, ...

Character decomposition
: ^
  - Using unicode decomposition information
  - example: onequarter -> one, fraction, four

Characters that decompose with this character
: ^
  - Using unicode decomposition information in reverse
  - example: one -> onesuperior, onequarter, onehalf, ...

</div>
</div>


- - -

*Related Glyphs & Characters Panel* introduction
-------
<video src="{{ site.url }}/videos/related-glyphs-and-characters.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>