---
layout: post
title: nMOS Half Bridge and Driver

importance: 0

external: [[file, '/doc/half-bridge/paper.pdf']]
short: half-bridge
banner-position: .3
team: 2
specs: [
[code, ['Arduino C']],
[laptop, [Arduino]],
[bolt, ['Power Electronics']],
[floppy-o, [LTSpice]]
]

header: ['We studied one of the few circuits that engineers still make out of discrete transistors.', "Modern integrated circuits provide complex systems with thousands of transistors on individual dies. Today, it's really only economical for an engineer to build a circuit from scratch when it needs to handle power. We chose the n-channel MOSFET half bridge because it's a subcircuit present in almost every high power, high efficiency switching circuit. It allowed us to apply what we had learned in our Circuits class while answering a question we found interesting: how do we generate a voltage above the supply rails?"]
---
