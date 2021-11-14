import { HIGH, LOW, open, OUTPUT, write } from 'rpio';
import { Gpio } from './gpio';
import { Light, LightService } from './light';

export class DigitalOutputService {
  readonly output1: DigitalOutput;
  readonly output2: DigitalOutput;
  readonly output3: DigitalOutput;

  constructor(lightService: LightService) {
    this.output1 = new DigitalOutput(
      Gpio.DigitalOutput1,
      lightService,
      lightService.digitalOutput1
    );
    this.output2 = new DigitalOutput(
      Gpio.DigitalOutput2,
      lightService,
      lightService.digitalOutput2
    );
    this.output3 = new DigitalOutput(
      Gpio.DigitalOutput3,
      lightService,
      lightService.digitalOutput3
    );
  }

  disable(): void {
    this.output1.low();
    this.output2.low();
    this.output3.low();
  }
}

export type DigitalOutputState = 'high' | 'low';

class DigitalOutput {
  private readonly gpio: Gpio;
  private readonly light: Light;
  private readonly lightService: LightService;
  private currState: DigitalOutputState;

  get state(): DigitalOutputState {
    return this.currState;
  }

  constructor(gpio: Gpio, lightService: LightService, light: Light) {
    this.gpio = gpio;
    this.lightService = lightService;
    this.light = light;

    // set initial state
    this.currState = 'low';
    open(gpio, OUTPUT, LOW);
    this.low();
  }

  high(): void {
    this.currState = 'high';
    write(this.gpio, HIGH);
    this.light.on();
    this.lightService.update();
  }

  low(): void {
    this.currState = 'low';
    write(this.gpio, LOW);
    this.light.off();
    this.lightService.update();
  }
}
