---
layout: post
title: An FPGA Piano
external: [[github, github.com/mdelrosa/cafinalproject],[compass, 'wikis.olin.edu/ca/doku.php?id=projects:fpga_piano']]
short: blinkenlights
banner-type: jpg
team: 5

header: ['Our FPGA breakout had 8 switches and a clock speed jumper. So we turned it into a 3 octave piano.','Two of those octaves were kind of by accident. It was only after we had programmed the FPGA and wired up the speaker that we realized we could change the octave of the notes by moving the clock multiplier jumper on the FPGA breakout board.']

specs: [
[code, Verilog],
[desktop, Xilink Spartan-3]]
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

Unofrtunately, because of difficulties with the FPGA synthesis/programming software we were using, we weren't able to implement the lookup table on the FPGA. No player piano for us.