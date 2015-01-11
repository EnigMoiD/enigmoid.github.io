---
layout: post
title: GPU Image Filter

importance: 0

short: posterize
banner-position: .3
team: 3
specs: [
[code-fork, ['C', 'C++', 'CUDA', 'OpenCV']]
]

external: [[github, 'https://github.com/madisonmay/posterize']]

header: [
'We used a GPU parallel programming library to implement a "posterize" image filter.',
"We used NVIDIA's [CUDA](http://en.wikipedia.org/wiki/CUDA) to interface with the NVIDIA [GPU](http://en.wikipedia.org/wiki/GPU)s (graphics processing units) in our laptops. GPUs are comprised of hundreds to thousands of simple, slow CPUs -- enough processors that running one thread per pixel is common to the point of being the norm. Writing the filter was an exercise in C++ in addition to CUDA and parallel programming -- we used OpenCV to read the images and filter a webcam feed in real time. The filter produced the image in the banner from the image in the project description box. We tuned the parameters to get images that we thought looked nice."
]
---
