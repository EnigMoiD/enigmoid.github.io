---
layout: post
title: FPGA Piano

importance: 1

external: [[compass, 'http://wikis.olin.edu/ca/doku.php?id=projects:fpga_piano'],[github, 'http://github.com/mdelrosa/cafinalproject']]
short: blinkenlights
banner-position: .3

team: 5

header: [
"We used a semester of Computer Architecture to turn an FPGA into a piano.",
"An [FPGA](http://en.wikipedia.org/wiki/FPGA) (Field-Programmable Gate Array) is, as the name suggests, a large collection of logic gates that can be reconfigured on the fly. FPGAs are used in applications that require extremely low latency, as once they are programmed, they essentially _are_ the specified digital circuit. Our application did not require low latency, but writing the [Verilog HDL](http://en.wikipedia.org/wiki/Verilog) (hardware description language) code to divide the clock down to audible frequencies and interfacing with the onboard switches and LEDs was still a valuable exercise in FPGA development."
]

specs: [
[code-fork, [Verilog]],
[laptop, [Xilinx Spartan-3]]
]
---

## Chords!

Like a piano, our instrument let you play multiple notes at once. (Unlike a piano, a note kept playing at full volume until you turned off its corresponding switch.) Each note had its own output pin, and we wired them together and amplified the resulting signal with an op amp.

## The Music

We generated the waveforms right on the FPGA, so they were square waves. This meant that individual notes weren't very musical, and certain chords sounded plain awful. With more time we might have implemented some analog filters to improve the sound quality and blending.

## Songs

We also came up with a system that would have allowed the FPGA to automatically play built-in songs. The lookup table held which "keys" of the piano were held down, in song order. We were pleased with this schema because:

1. It was simple and easily implemented. (the most important thing)
1. Encoded songs could have chords.
1. Notes of arbitrary length could be encoded by just repeating notes.

Unfortunately, because of difficulties with the FPGA synthesis/programming software we were using, we weren't able to implement the lookup table on the FPGA. No player piano for us.