---
title     : Cross-axis mapping
layout    : default
permalink : /reference/menu/font/cross-axis-mapping
draft     : true
order     : 4953
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

This panel allows you to add, modify or remove cross-axis mappings (also known as avar2 mappings). Use the *New cross-axis mapping* button for creating a new cross-axis mapping. Every mapping has an input and output location. Not all axes need to participate in a mapping – you can handle this with the checkbox next to an axis. It is most likey that your font project does not need such a cross-axis mapping, therefore only specify a mapping if you know what you do.
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tip: 
{: .alert-heading}
- Alt-key + click the arrow: show/hide all card information.
{: .mb-0 }
</div>

![]({{ site.url }}/images/font-cross-axis-mapping.png){: .img-fluid }


<table class='table table-hover'>
<tr>
<th width='35%'>Entry</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>Group Description</td>
<td>optional, string</td>
</tr>
<tr>
<td>Description</td>
<td>“optional, string. the description of this mappings group” (Reference: <a href='https://github.com/fonttools/fonttools/blob/main/Doc/source/designspaceLib/xml.rst#mappings-element' target="_blank">mappings-element</a>)</td>
</tr>
</table>


### Links

- [Proposal for representing avar2 mappings in designspace documents](https://github.com/harfbuzz/boring-expansion-spec/blob/main/avar2-in-designspace.md)
- [fonttools: mappings-element](https://github.com/fonttools/fonttools/blob/main/Doc/source/designspaceLib/xml.rst#mappings-element)
- [fonttools: mappings example](https://github.com/fonttools/fonttools/blob/main/Doc/source/designspaceLib/xml.rst#34example-of-all-mappings-elements-together)
