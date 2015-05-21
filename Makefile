SRC := $(shell find ./img -name '*-full.jpg')
TAR := $(SRC:-full.jpg=.jpg)
css := stylesheets/style.css

all: img $(css)

img: $(TAR)

%.jpg: %-full.jpg
	python convert-img.py

$(css): stylus/*.styl
	stylus stylus/style.styl -o stylesheets