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
---

<!-- It was a beautiful regex. I tried. -->
<!-- specs: \[(\n)?(\[(\w.*?,) (\w.*?)\],?(\n)?)* -->

## Why Supercapacitors?
We originally wanted to charge Li-Ion batteries because of their high energy-to-weight ratio (this is a bike-portable system), but we decided against them because capacitors are much easier to charge with an unpredictable input voltage. We didn't realize the necessity of load balancing circuitry until the end, so we just kept the supply voltage well below the rating of the entire series bank. That came down to just keeping the bike below a certain gear, and made the bank _really_ easy to charge, if not slightly more dangerous.

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

I've learned a lot about MOSFET drive since working on this project, and I know now that this is _not_ a good way to drive a high-side switch. I explored some more appropriate drive circuitry in my [bootstrap MOSFET gate drive project](/projects/2014/05/12/half-bridge.html).