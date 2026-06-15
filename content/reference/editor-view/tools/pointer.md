---
title     : Pointer tool
layout    : default
permalink : /reference/editor-view/tools/pointer
draft     : true
order     : 4231
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="../tools/">Tools</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

The *pointer* tool <img height="20" src="{{ site.url }}/images/icons/pointer.svg">  allows selecting and editing of contours, segments, points, components, etc. Click on the icon in the toolbar, or use the short cuts below. 
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips: 
{: .alert-heading}
- The subtool <img height="20" src="{{ site.url }}/images/icons/pointerscale.svg"> allows you to scale the curve according the move of the ON curve point you are dragging. **Scaling edit tool** does also affect the OFF curve points when you move an ON curve point.
- Use your own **[custom shortcuts](/reference/menu/fontra/shortcuts)**  to quickly switch between the two tools.
{: .mb-0 }
</div>

<table class='table table-hover'>
<tr>
<th width='35%'>Short cut</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>1</td>
<td>Select tool</td>
</tr>
</table>

Actions
-------

#### Glyph selection (preview mode)
<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>click on glyph</td>
<td>Select glyph.</td>
</tr>
<tr>
<td>click on canvas</td>
<td>Deselect glyph.</td>
</tr>
<tr>
<td>double click glyph</td>
<td>Activate/deactivate editing mode.</td>
</tr>
</table>

#### Segment selection
<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>click</td>
<td>Select segment.</td>
</tr>
<tr>
<td>⇧ + click</td>
<td>Add segment to selection.</td>
</tr>
<tr>
<td>click + drag (single segment)</td>
<td>Move the selected segments.</td>
</tr>
<tr>
<td>⇧ + click + drag (single segment)</td>
<td>Move the selected segments with angle constrained to multiples of 45°.</td>
</tr>
</table>

#### Point selection
<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>click + drag</td>
<td>Select all points inside the selection marquee.</td>
</tr>
</table>


#### Component selection
<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>click + drag</td>
<td>Move clicked component</td>
</tr>
<tr>
<td>double click selection</td>
<td>Dialog: Add component(s) to the text string</td>
</tr>
</table>

