SRC := $(shell find . -name '*-full.jpg')
TAR := $(addprefix ./,$(notdir $(SRC:-full.jpg=.jpg)))

all: $(TAR)

%.jpg : ./img/**/%-full.jpg
	python convert-img.py