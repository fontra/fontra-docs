---
title     : Sources
layout    : default
permalink : /reference/menu/font/sources
draft     : true
order     : 4954
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/menu">Menu</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/menu/font">Font</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

This is a list of all font sources of a project. Access it via *Font* -> *Sources* menu. Add a new font source via the *New source...* button. 
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tip: 
{: .alert-heading}
- Alt-key + click the arrow: show/hide all sources information.
{: .mb-0 }
</div>

![]({{ site.url }}/images/font-sources.png){: .img-fluid }

General
-------

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Name</td>
<td>The sources name written out, for example <b>Condensed Bold</b></td>
</tr>
<tr>
<td>Italic Angle</td>
<td>“Italic angle in counter-clockwise degrees from the vertical. Zero for upright text, negative for text that leans to the right (forward).”(Reference <a href='https://learn.microsoft.com/en-us/typography/opentype/spec/post#header' target="_blank">OT spec head table</a>)</td>
</tr>
</table>

Location
-------
The location is a list of all font axes. The specified location must be unique.

Line Metrics
-------

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Ascender</td>
<td>The ascender value + overshoot</td>
</tr>
<tr>
<td>Cap Height</td>
<td>The cap height value + overshoot</td>
</tr>
<tr>
<td>x-Height</td>
<td>The x-Height value + overshoot</td>
</tr>
<tr>
<td>Baseline</td>
<td>The baseline value (should always be 0) + overshoot</td>
</tr>
<tr>
<td>Descender</td>
<td>The Descender value + overshoot</td>
</tr>
</table>


### Links

- [Google Fonts: Axis (in variable fonts)](https://fonts.google.com/knowledge/glossary/axis_in_variable_fonts)
