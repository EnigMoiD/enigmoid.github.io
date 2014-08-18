---
layout: post
title: Image Filter on the GPU

importance: 0

short: posterize
banner-position: .3
team: 3
specs: [
[code, ['C', 'C++', 'CUDA', 'OpenCV']]
]

header: ['We wrote a parallel program that reduces the color space of an image and smooths the edges.', 'It produces a nice "posterize" effect that generates images like the one in the banner from images like the one in the description. To write this program, we had to break the problem into simple, serial processes that could be performed on individual pixels of an image.']
---
