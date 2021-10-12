import { open, LOW, HIGH, write, OUTPUT } from 'rpio';
import { Gpio } from './gpio';

export class RelayService {
  readonly relay1: Relay;
  readonly relay2: Relay;
  readonly relay3: Relay;

  constructor() {
    this.relay1 = new Relay(Gpio.Relay1);
    this.relay2 = new Relay(Gpio.Relay2);
    this.relay3 = new Relay(Gpio.Relay3);
  }
}

export type RelayState = 'on' | 'off';

export class Relay {
  private readonly gpio: Gpio;
  private currState: RelayState;

  get state(): RelayState {
    return this.currState;
  }

  constructor(gpio: Gpio) {
    this.gpio = gpio;

    // set initial state
    this.currState = 'off';
    open(gpio, OUTPUT, LOW);
  }

  off(): void {
    this.currState = 'off';
    write(this.gpio, LOW);
  }

  on(): void {
    this.currState = 'on';
    write(this.gpio, HIGH);
  }

  toggle(): void {
    if (this.currState === 'off') {
      this.on();
      return;
    }

    this.off();
  }
}
