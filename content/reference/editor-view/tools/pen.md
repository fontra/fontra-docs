---
title     : Pen tool
layout    : default
permalink : /reference/editor-view/tools/pen
draft     : true
order     : 4232
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="../tools/">Tools</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

The *Pen tool* <img height="20" src="{{ site.url }}/images/icons/pointeradd.svg"> allows you to draw new bézier contours and add points to existing ones.
Click the icon in the toolbar, or use the short cut.
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips: 
{: .alert-heading}
- The subtool <img height="20" src="{{ site.url }}/images/icons/pointeraddquad.svg"> allows you to draw with quadratic curves.
- Use your own **[custom shortcuts](/reference/menu/fontra/shortcuts)** to quickly switch between the two tools.
{: .mb-0 }
</div>


<table class='table table-hover'>
<tr>
<th width='35%'>Short cut</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>2</td>
<td>Select tool</td>
</tr>
</table>

Actions
-------

<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>click</td>
<td>Adds new point</td>
</tr>
<tr>
<td>⇧ + click</td>
<td>Adds new point (straight line) snapping to 0/45/90 degrees</td>
</tr>
<tr>
<td>click + drag</td>
<td>Adds new point with handle</td>
</tr>
<tr>
<td>click + drag + ⇧</td>
<td>Adds new point with handle snapping to 0/45/90 degrees</td>
</tr>
<tr>
<td>⇧ + e</td>
<td>Toggles <a href="{{ site.url }}/reference/tools/pen#pen-tool-multi-source-editing">multi source editing</a></td>
</tr>
</table>

*Pen tool* introduction
-------
<video src="{{ site.url }}/videos/pen-tool-introduction.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>

*Pen tool* multi source editing
-------
<video src="{{ site.url }}/videos/pen-tool-multi-source-editing.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>


