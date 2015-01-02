---
layout: post
title: Bootstrap MOSFET Gate Drive

importance: 0

external: [[file, '/doc/half-bridge/paper.pdf']]
short: half-bridge
banner-position: .3
team: 2
specs: [
[code-fork, ['Arduino C']],
[laptop, [Arduino]],
[bolt, ['Power Electronics']],
[floppy-o, [LTSpice]]
]

header: [
"We built and analyzed a power MOSFET gate drive circuit to get a practical angle on the material from our Circuits class.",
'Because of the physics involved, n-type [MOSFETs](http://en.wikipedia.org/wiki/MOSFET) (Metal-Oxide-Semiconductor Field-Effect Transistors) are 2-3x as efficient as their p-type siblings. But n-type MOSFETs cannot pass a strong "high" signal on their own (while pFETs can), so switching circuits generally use both n- and p-type FETs. We explored a circuit that lets an nFET pull high, allowing it to replace a less-efficient pFET. In high power applications, the power dissipation avoided by using only n-type power FETs is worth the complication of a drive circuit. See our [report](/doc/half-bridge/paper.pdf) for details and further explanation.'
]
---
