---
layout: post
title: Bike-Charged Supercapacitors
external: [[compass, pyrois.weebly.com]]
short: poe-pyrois

banner-position: .45
team: 4

header: [For Principles of Engineering we wanted to harness the energy of a human pedaling a bike.,'And we wanted to be efficient about it, so we wanted to manage the power storage ourselves. We also wanted to charge USB devices from whatever energy storage unit we ended up using. None of us knew anything about what building this would involve, so it took us about a month to realize that we wanted to charge a bank of supercapacitors and build a 5V switching regulator.']

specs: [
[code, C],
[desktop, MSP430],
[gear, 200W+ 24V Motor],
[bolt, Four 400F 2.7V SuperCaps]]
---

## Why Supercapacitors?
We originally wanted to charge Li-Ion batteries because of their high energy-to-weight ratio (this is a bike-portable system), but we decided against them because capacitors are much easier to charge with a widely varying input voltage. They're also really cool. We didn't realize the necessity of load balancing circuitry until the end, so we just kept the supply voltage well below the rating of the entire bank. That came down to just keeping the bike below a certain gear, and made the bank _really_ easy to charge, if not slightly more dangerous.

## The Buck Converter
Our final system had a single buck converter controlled by the MSP430. A buck converter consists of a switch (the MOSFET), a diode, and an inductor and capacitor arranged as a low pass LC filter.

![The most interesting part of the system](/img/poe-pyrois/buck.png)

## Regulation Through Control
{% highlight c %}
diff = actual - 740; // Compute the difference between set and actual
if (diff > 0 && CCR1 < period) // CCR1 should never be greater than the PWM period
	CCR1++;	// If output is too high, increase the duty cycle
			// (this is inverted because of how we're switching the FET)
else if (CCR1 > 1) // CCR1 should never be negative
	CCR1--; // If output is too low, decrease the duty cycle
{% endhighlight %}