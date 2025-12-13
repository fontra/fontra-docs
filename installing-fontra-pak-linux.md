---
title     : Installing Fontra Pak on Linux
layout    : default
permalink : /how-tos/installation/installing-fontra-pak-linux/
draft     : true
order     : 1102
---


<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/how-tos">How-Tos</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>

Linux users can [build Fontra Pak from the source](https://github.com/fontra/fontra-pak/blob/main/README.md) or, if they are on the x86_64 platform, choose from these three options:
* Download [pre-compiled FontraPakUbuntu.tgz](https://github.com/fontra/fontra-pak/releases/latest)
    1. Extract the .tgz with `tar xvf FontraPakUbuntu.tgz`
    2. You will get the "fontrapak" file. Make it executable with `chmod +x fontrapak`
    3. Next add it to your $PATH, or just execute with `./fontrapak` 
    → Having fontra in your path lets you start fontra with any launcher or directly from your terminal. <br/>
    This solution works on linux Debian based systems. Let us know if you have any issues. 
    Also, keep in mind that this way won't allow for automatic update. You will have to repeat those step. 
* Install snap package as per [these instructions](https://snapcraft.io/fontrapak)
* Install the [flatpak version](https://github.com/fontra/fontra-flatpak/)
