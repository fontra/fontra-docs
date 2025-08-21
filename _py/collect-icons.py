import os, json, glob
from urllib.request import urlopen

# directory contents in json form
iconsFontraURL = 'https://api.github.com/repos/fontra/fontra/contents/src/fontra/client/images'
iconsTablerURL = 'https://api.github.com/repos/fontra/fontra/contents/src/fontra/client/tabler-icons'

# target docs folder for icon images
baseFolder = os.path.dirname(os.getcwd())
iconsFolder = os.path.join(baseFolder, 'images', 'icons')

# clear existing files
# for f in glob.glob(f'{iconsFolder}/*.*'):
#     os.remove(f)

# copy icons from repository to icons folder
for URL in [iconsFontraURL, iconsTablerURL]:
    response = urlopen(URL)
    data = json.loads(response.read())
    for item in data:
        dstPath = os.path.join(iconsFolder, item['name'])
        # download from URL
        with urlopen(item['download_url']) as file:
            content = file.read()
        # save to file
        with open(dstPath, 'wb') as download:
            download.write(content)
