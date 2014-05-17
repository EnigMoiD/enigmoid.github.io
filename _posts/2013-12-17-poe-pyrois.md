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
Our final system had a single buck converter controlled by the MSP430.

The buck converter creates a square wave from the input voltage by switching it on and off with the MOSFET. The LC filter then smooths the output voltage to a level proportional to the duty cycle of the square wave.

![The most interesting part of the system](/img/poe-pyrois/buck.png)

## Regulation Through Control
The MSP430 outputs the PWM signal that switches the MOSFET. Below is the control code we wrote for the MSP430.

{% highlight c linenos %}
err = actual - 740;
if (err > 0 && CCR1 < period)
	CCR1++; // The PWM duty cycle

else if (CCR1 > 1)
	CCR1--;
{% endhighlight %}

On line 1, the error is calculated by subtracting the desired voltage from the actual voltage. The ADC uses a reference voltage of 3.3V, and outputs its reading on a 0-1023 scale. This means that we couldn't measure voltages above 3.3V, and explains why we measured the output with a balanced voltage divider. When the output is 5V, the ADC will read 2.5V. Thus 740 is about 75% of 1023 (empirically tuned) just as 2.5V is about 75% of 3.3V.

We want the square wave to have a lower duty cycle when the input voltage is higher, so why does our code _increase_ the PWM duty cycle when the output voltage is too high? We do this because our circuit topology is such that the MOSFET is "on" (closed circuit) when the PWM is low and "off" when the PWM is high. Thus a lower PWM duty cycle will correspond to a higher square wave duty cycle.