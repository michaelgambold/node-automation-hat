import { open, LOW, HIGH, write } from 'rpio';
import { Gpio } from './gpio';

export class RelayService {
  readonly one: Relay;
  readonly two: Relay;
  readonly three: Relay;

  constructor() {
    this.one = new Relay(Gpio.Relay1);
    this.two = new Relay(Gpio.Relay2);
    this.three = new Relay(Gpio.Relay3);
  }
}

export class Relay {
  private readonly gpio: Gpio;

  constructor(gpio: Gpio) {
    this.gpio = gpio;

    // set initial state
    open(gpio, LOW);
  }

  turnOff() {
    write(this.gpio, LOW);
  }

  turnOn() {
    write(this.gpio, HIGH);
  }
}
