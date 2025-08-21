---
title: Axes
layout: default
permalink: /reference/menu/font/axes
draft: true
order: 4952
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/menu">Menu</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/menu/font">Font</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>

Fontra's approach is _variable-first_, therefore it's most likey that you will add at least one font axis. The most common one is probably _Weight_. Add a new axis via the _New axis..._ button.
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips: 
{: .alert-heading}
- Before you create a new axis we recommend to have a look at **[Designspace](/explanations/designspace/)**, first.
- Change the order of the axes via *drag and drop*.
- create **[axis values](#axis-values)** for each style
{: .mb-0 }
</div>

![]({{ site.url }}/images/font-axes.png){: .img-fluid }

## Names

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Name<a href="#marker_1">¹</a></td>
<td>The axis name identifies the axis</td>
</tr>
<tr>
<td>OT tag</td>
<td>The axis tag <b>must be 4 characters</b> long. <a href='https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg#registered-axis-tags' target="_blank">Registered OT tags</a>. Non-registered tags must be written in all uppercase.</td>
</tr>
<tr>
<td>UI Name<a href="#marker_1">¹</a></td>
<td>UI Name is <b>the Label how it will be visible</b> to the end user</td>
</tr>
</table>

<span id='marker_1'>¹Note: **Name** and **UI Name** are often the same.</span>
{% comment %}
For more please see: https://github.com/fontra/fontra-docs/pull/77#issuecomment-2518494551
{% endcomment %}

## Range

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Axis Type</td>
<td>Either <b>Continuous<a href="#marker_2">²</a></b> or <b>Discrete<a href="#marker_3">³</a></b></td>
</tr>
</table>

## <span id='marker_2'>²Range: Axis type _Continuous_</span>

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Minimum</td>
<td>the minimum value of the axis (for example: <b>100 for Thin</b> in a Weight axis)</td>
</tr>
<tr>
<td>Default</td>
<td>the default value of the axis (for example: <b>400 for Regular</b> in a Weight axis)</td>
</tr>
<tr>
<td>Maximum</td>
<td>the maximum value of the axis (for example: <b>900 for Black</b> in a Weight axis)</td>
</tr>
</table>

## <span id='marker_3'>³Range: Axis type _Discrete_</span>

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Values</td>
<td>a list of values for the axis (for example: <b>0 for Upright</b> and <b>1 for Italic</b> for Italic axis)</td>
</tr>
<tr>
<td>Default</td>
<td>the default value of the axis (for example: <b>0 for Upright</b> in the Italic axis)</td>
</tr>
</table>

## Mapping graph

The mapping graph visualizes the axis mapping.

## Mapping list

It's about remapping values -> specify a new mapping of the axis values (also known as avar-mapping or non-linear interpolation). Add a new mapping with the plus-button or remove a mapping with the minus-button.

**Example** Let's say, we have a set-up of _Weight axis from 0 to 1000_ with these values:

- Light: 0
- Regular: 250
- Medium: 400
- Bold: 750
- ExtraBold: 1000

In this case we need a remapping to:

- Light: 200
- Regular: 400
- Medium: 500
- Bold: 700
- ExtraBold: 800

Within the axes panel, this non-linear interpolation would look like this:

![]({{ site.url }}/images/font-axes-mapping-example.png){: .img-fluid }

## Axis Values

Add a new axis value with plus-button or remove it via minus-button (keyword: STAT table, [Example by Microsoft](https://learn.microsoft.com/en-us/typography/opentype/spec/stat#example-4-a-weightwidth-variable-font)).<br>
**NOTE** Fontra currently has no direct way to define fvar instances. However, Fontra's own export will create fvar instances based on axis value labels. So if you have a single weight axis, and add some labels (for example Thin/100, Regular/400, Medium/600 Bold/700), then the export will make fvar instances on those locations. If you have multiple axes, it will make all combinations. For example, if you define Regular/Medium/Bold for weight, and Condensed/Normal/Wide for width, it will create 9 fvar instances.

<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Name</td>
<td>The name of a specifed style (for example <b>Regular</b>)</td>
</tr>
<tr>
<td>Value</td>
<td>The value of a style (for example <b>400</b> for Regular)</td>
</tr>
<tr>
<td>Min</td>
<td>The minumum value of a style (for example <b>350</b> for Regular)</td>
</tr>
<tr>
<td>Max</td>
<td>The maximum value of a style (for example <b>450</b> for Regular)</td>
</tr>
<tr>
<td>Linked</td>
<td>The linked value of a style (for example <b>700</b> for Regular, so it's <b>linked with Bold</b>)</td>
</tr>
<tr>
<td>Elidable</td>
<td>A checkbox which shows that the name should not be displayed (<b>Upright might be an elidable</b> name in the Italic axis)</td>
</tr>
</table>

**Example**:

![]({{ site.url }}/images/font-axes-axis-values-example.png){: .img-fluid }

### Links

- [Google Fonts: Axis (in variable fonts)](https://fonts.google.com/knowledge/glossary/axis_in_variable_fonts)
- [OT Spec: avar table](https://learn.microsoft.com/en-us/typography/opentype/spec/avar)
- [OT Spec: STAT table](https://learn.microsoft.com/en-us/typography/opentype/spec/stat)
