---
title     : Transformations
layout    : default
permalink : /reference/editor-view/panels/transformations
draft     : true
order     : 4246
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
![]({{ site.url }}/images/panel-transformations.png){: .img-fluid .py-2 }
</div>
<div class='col-md' markdown='1'>
##### Transformations

Transform a selection of points, contours and/or components.

Origin based on selection
: Specify the transformation origin based on the selection – from top to bottom and/or left to right.

Origin
: Be more precise with a specific x and y position.

<img src='{{ site.url }}/images/icons/arrow-move-right.svg' />
: Move in x and/or y direction. Values: **units**.

<img src='{{ site.url }}/images/icons/resize.svg' />
: Scale in x and/or y direction. Values: **percentage** (100% = no scaling).

<img src='{{ site.url }}/images/icons/rotate.svg' />
: Rotate. Value: **degree** (- = clockwise, + = counter clockwise).

<img height="30" src='{{ site.url }}/images/icons/skew.svg' />
: Skew in x and/or y direction. Value: **degree**.

<img height="30" src='{{ site.url }}/images/icons/flip-horizontal.svg' />
: Flip horizontally.

<img height="30" src='{{ site.url }}/images/icons/flip-vertical.svg' />
: Flip vertically.

- - -

##### Align Objects

Align a selection of points, contours and/or components.

<img src='{{ site.url }}/images/icons/vertical-align-left.svg' /> 
: Align left

<img src='{{ site.url }}/images/icons/vertical-align-center.svg' /> 
: Align center (vertically)

<img src='{{ site.url }}/images/icons/vertical-align-right.svg' /> 
: Align right

<img src='{{ site.url }}/images/icons/horizontal-align-top.svg' /> 
: Align top

<img src='{{ site.url }}/images/icons/horizontal-align-center.svg' /> 
: Align middle (horizontally)

<img src='{{ site.url }}/images/icons/horizontal-align-bottom.svg' /> 
: Align bottom 

- - -

##### Distribute Objects

Distribute a selection of points, contours and/or components.

<img src='{{ site.url }}/images/icons/layout-distribute-vertical.svg' />
: Distribute horizontally

<img src='{{ site.url }}/images/icons/layout-distribute-horizontal.svg' />
: Distribute vertically

Distance of distribution
: The distance will be calcutated, if not set. Otherwise: specify the distance in **units**. 

- - -

##### Path Operations

Keep in mind that path operations work with two groups: the selected and the unselected contours.

<img src='{{ site.url }}/images/icons/layers-union.svg' />
: Remove Overlaps -> removes overlaps of selection only.

<img src='{{ site.url }}/images/icons/layers-subtract.svg' />
: Subtract contours -> subtracts the selected contours from the unselected contours.

<img src='{{ site.url }}/images/icons/layers-intersect-2.svg' />
: Intersect contours

<img src='{{ site.url }}/images/icons/layers-difference.svg' />
: Exclude contours

</div>
</div>


- - -

*Align and distribute objects* introduction
-------
<video src="{{ site.url }}/videos/align-distribute-objects.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>

*Path operations* multi source editing
-------
<video src="{{ site.url }}/videos/path-operations.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>