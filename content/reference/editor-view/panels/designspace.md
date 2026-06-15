---
title: Designspace
layout: default
permalink: /reference/editor-view/panels/designspace
draft: true
order: 4243
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
![]({{ site.url }}/images/panel-designspace-20240327-dark.png){: .img-fluid .py-2 }
</div>
<div class='col-md' markdown='1'>
##### Font axes

Interactive controls for all variation axes in the designspace

sliders
: Move the knobs to navigate around the font's designspace

labels
: Slider values indicate the current location at that axis

<img src='{{ site.url }}/images/icons/menu-2.svg' /> View options
: Click to set various different view options like "Apply cross-axis mapping"

<img src='{{ site.url }}/images/icons/tool.svg' /> Edit font axes
: Opens the font axes page

<img src='{{ site.url }}/images/icons/refresh.svg' /> Reset font axes
: Click to restore all axes to their default location

---

##### Glyph axes

Interactive controls for all glyph level axes

sliders
: Move the knobs to navigate around the glyph level designspace

<img src='{{ site.url }}/images/icons/tool.svg' /> Edit glyph axes
: Open a pop-up window to adjust glyph axes

<img src='{{ site.url }}/images/icons/refresh.svg' /> Reset glyph axes
: Click to restore all axes to their default location

---

##### Glyph sources

A list of all sources available for the current glyph

Bold
: The glyph source highlighted in bold is the default source

Grey
: A glyph source in grey is a virtual source. It does not exist, yet. It's specifed as a global font source, but the glyph does not have a source specified for that paricicual source. You don't have to create a gylph source for each font source if the design allows it. But if you want to edit it: double-click the name will create a source at this location.

<img src='{{ site.url }}/images/icons/circle-dot.svg' /> on
: Uncheck to remove source from the interpolation for this glyph

<img src='{{ site.url }}/images/icons/bug.svg' /> bug
: Indicates that this source is incompatible for interpolation

<img src='{{ site.url }}/images/icons/eye.svg' /> bg (background)
: Show/hide this source in the background while editing

<img src='{{ site.url }}/images/icons/pencil.svg' /> edit
: Click the pencil icon in the table header for multi-source editing

<img src='{{ site.url }}/images/icons/antenna-bars-4.svg' /> bars
: Displays the influence of this source in the current location

<img src='{{ site.url }}/images/icons/plus.svg' height='20' /> plus
: Add a new source at a new location for the current glyph

<img src='{{ site.url }}/images/icons/minus.svg' height='20' /> minus
: Delete current glyph in the selected source

---

##### Source layers

All layers of a selected glyph source

foreground
: This is the layer which will be taking for the glyph interpolation

background or any other layer name
: All other layers can be seen as background layers. They don't participate into the actual glyph, so they do not have to be compatible and do not break compatibility. These layers are helpful during the design process. Keep an existing outline, make a copy, modify it and compare it -> then decide which outline you want to foreground as the final outline.

</div>
</div>
