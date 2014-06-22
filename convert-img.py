import sys, os, re
from subprocess import call

def resizeBanner(f, d):
	resize(f, d, "900", "/banner.jpg")

def resizeProject(f, d):
	resize(f, d, "360", "/project.jpg")

def resize(filename, dirname, width, new_name):
	call(["convert", dirname+"/"+filename, "-resize", width, dirname+new_name])

for dirname, dirnames, filenames in os.walk("."):
	for filename in filenames:
		if re.search(r"banner-full.jpg", filename):
			resizeBanner(filename, dirname)
		if re.search(r"project-full.jpg", filename):
			resizeProject(filename, dirname)