import sys, os, re
from subprocess import call

def resize(filename, dirname, width):
	call(["convert", dirname+"/"+filename, "-resize", width, dirname+"/banner.jpg"])

for dirname, dirnames, filenames in os.walk("."):
	for filename in filenames:
		if re.search(r"banner-full.jpg", filename):
			resize(filename, dirname, 900)
		if re.search(r"project-full.jpg", filename):
			resize(filename, dirname, 360)