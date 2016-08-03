nodeca.site
===========

[![Build Status](https://travis-ci.org/nodeca/nodeca.site.svg?branch=master)](https://travis-ci.org/nodeca/nodeca.site)

Custom configuration for nodeca site


Installation
------------

```sh
cd nodeca
npm install nodeca/nodeca.site
```

Add `nodeca.site` to applications list in config.


Rebuild icons
-------------

```sh
make icons
```

__Memo: Quick SVG fix for inkskape:__

- `sed -i 's/\([0-9]\)\-/\1 -/g' file_name`
