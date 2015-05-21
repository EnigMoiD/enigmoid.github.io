SRC := $(shell find ./img -name '*-full.jpg')
TAR := $(SRC:-full.jpg=.jpg)
css := stylesheets/style.css stylesheets/pygments.css

all: img $(css)

img: $(TAR)

%.jpg: %-full.jpg
	python convert-img.py $^

stylesheets/%.css: stylus/%.styl
	stylus $^ -o stylesheets