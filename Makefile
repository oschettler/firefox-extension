#
all:
	web-ext run --verbose

zip:
	zip voico-ext LICENSE README.md icons/* manifest.json popup.js popup.html
