---
title     : Designing with variable components
layout    : default
permalink : /how-tos/draw/designing-with-variable-components
draft     : true
order     : 3302
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/how-tos">How-Tos</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

Gaëtan shows how to draw the word *fontra* in a copperplate style with just one single variable component:

-------
<video src="{{ site.url }}/videos/designing-with-variable-components.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>

-------
Notes:

- create one source with line metrics
- draw with basic shape tool
- break contours
- Gaëtan shows two different ways of closing contours
- make only one single variable component with the name "compo"
- add glyph axes
  - weight_left
  - weight_right
- use the variable component "compo" to create the character "o"
- skew variable component with transformation tools by 30°
- fine-tune "o"
- add new glyph axes 
  - height_left
  - height_right
- align with the help of a guideline
- adjust spacing
- create "a" based on "o"
- add new glyph axes 
  - stem_left
  - stem_right
- add two more points to the contour for the stems
- two different options to slant the added stems
- add stem to "a"
- create character "n"
- add new glyph axes 
  - width_left
  - width_right
- adjust spacing
- create character "r"
- create character "t"
- create character "f"
- add font axis "weight"
- add second "weight" source to each character
- go through the characters and adjust the weight of the stems

-> at the end we have a nice copperplate style variable font with a weight axis made with one single variable font component. 