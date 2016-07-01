### Generating logo.svg

```sh
svgo -i ./logo_nodeca_SVG.svg -o ../static/logo.svg -p 1
```

### Generating snippet.jpg

```sh
convert -resize 640x640 ./logo_rcopen_SVG.svg ../static/snippet.jpg
```

### Generating favicons

Use https://realfavicongenerator.net/ with the following options:

Favicon for iOS - Web Clip
 - [x] Add a solid, plain background to fill the transparent regions.

Favicon for Android Chrome
 - Main settings
   - [x] Add a solid, plain background to fill the transparent regions.
   - App name: Nodeca
 - Options
   - [x] Browser. In this mode, when the user clicks the link, Android Chrome behaves as if the page was opened like any regular web site. 

Windows Metro
 - Use this color: #4a7fb5
 - [x] Use a white silhouette version of the favicon. Works well with pictures with significant transparent regions.

Safari Pinned Tab
 - [x] Use a silhouette of the original image. Works well with pictures with significant transparent regions.

Favicon Generator Options
 - Compression
   - [x] Very high quality, very low compression factor (Expected compression rate: 34%)
