import sys, os, re
from subprocess import call

def resizeBanner(filename, dirname):
	call(["convert", dirname+"/"+filename, "-resize", "900", dirname+"/banner.jpg"])

for dirname, dirnames, filenames in os.walk("."):
	for filename in filenames:
		if re.search(r"banner-full.jpg", filename):
			resizeBanner(filename, dirname)