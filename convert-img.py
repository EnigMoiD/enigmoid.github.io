import sys, os
from subprocess import call

def resizeBanner(f, d):
	return resize(f, d, "900", "banner.jpg")

def resizeProject(f, d):
	return resize(f, d, "360", "project.jpg")

def resize(filename, dirname, width, newname):
	path = os.path.join(dirname, filename)
	newpath = os.path.join(dirname, newname)
	call(["convert", path, "-resize", width, newpath])
	return path, newpath

def colorize(dir, path):
	call(["convert", path, "-grayscale", "rec709luma", "+level-colors", "'#000000','#2B3E53'", os.path.join(dir, "blue.jpg")])

def resizefiles():
	for dirname, dirnames, filenames in os.walk("./img"):
		for filename in filenames:
			if "banner-full.jpg" in filename:
				path, newpath = resizeBanner(filename, dirname)
			if "project-full.jpg" in filename:
				resizeProject(filename, dirname)

def colorizefiles():
	for dirname, dirnames, filenames in os.walk("./img"):
		for filename in filenames:
			if "banner.jpg" in filename:
				colorize(dirname, os.path.join(dirname, filename))

### main

resizefiles()
colorizefiles()