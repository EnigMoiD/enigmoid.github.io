---
layout: post
title: Human-Powered Phone Charger

importance: 0

external: [[compass, 'http://pyrois.weebly.com']]
short: poe-pyrois

banner-position: .45
team: 4

header: [
"We built a bike stand that let a user pedal to charge a bank of supercapacitors that could be discharged to charge USB devices.",
"If we had bought an inverter and used a Lead-acid battery, our project wouldn't have had an electrical component. So we decided to do the power conversion ourselves, which meant that I got my first exposure to switching regulators with no formal instruction. Such regulators switch the input power on and off at high frequencies to modulate the output voltage. In the end, most phones recognized our system, which meant we could produce the right output voltage, and our [line regulation](http://en.wikipedia.org/wiki/Line_regulation) was alright. None charged from it because the [load regulation](http://en.wikipedia.org/wiki/Load_regulation) was abysmal. But with all we learned, the project was far from a failure."
]

specs: [
[code-fork, [C]],
[laptop, [MSP430]],
[gear, [200W 24V Motor]],
[bolt, [UltraCaps, Power Electronics]],
[floppy-o, [LTSpice, DipTrace]]
]

images: [
  ['/img/poe-pyrois/banner.jpg', 'The bike with stand and charging circuit attached.'],
  ['/img/poe-pyrois/project.jpg', "The ultracapacitor-powered phone charging circuit I designed (it didn't work)."]
]
---