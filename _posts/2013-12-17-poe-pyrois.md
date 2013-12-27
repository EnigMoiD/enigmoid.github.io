---
layout: post
title: Bike-Charged Supercapacitors
external: [compass, pyrois.weebly.com]
short: poe-pyrois
team: 4

shade: 'dark'
header: [[For Principles of Engineering we wanted to harness the energy of a human pedaling a bike.],['And we wanted to be efficient about it, so we wanted to manage the power storage ourselves. We also wanted to charge USB devices from whatever energy storage unit we ended up using. None of us knew anything about what building this would involve, so it took us about a month to realize that we wanted to charge a bank of supercapacitors and build a 5V switching regulator.']]

specs: [
[code, C],
[desktop, MSP430],
[gear, ~300W 24V Motor (Generator)],
[bolt, Four 400-Farad 2.7V Supercapacitors],
[pencil, PCB]]
---

## Why Supercapacitors?
We originally wanted to charge Li-Ion batteries because of their high energy-to-weight ratio (this is a bike-portable system), but we decided against them because capacitors are much easier to charge with a widely varying input voltage. They're also really cool. We didn't realize the necessity of load balancing circuitry until the end, so we just kept the supply voltage well below the rating of the entire bank. That came down to just keeping the bike below a certain gear, and made the bank _really_ easy to charge, if not slightly more dangerous.