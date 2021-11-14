import { INPUT, open, read } from 'rpio';
import { Gpio } from './gpio';
import { Light, LightService } from './light';

export class DigitalInputService {
  readonly input1: DigitalInput;
  readonly input2: DigitalInput;
  readonly input3: DigitalInput;

  constructor(lightService: LightService) {
    this.input1 = new DigitalInput(
      Gpio.DigitalInput1,
      lightService,
      lightService.digitalInput1
    );
    this.input2 = new DigitalInput(
      Gpio.DigitalInput2,
      lightService,
      lightService.digitalInput2
    );
    this.input3 = new DigitalInput(
      Gpio.DigitalInput3,
      lightService,
      lightService.digitalInput3
    );
  }

  read(): void {
    this.input1.read();
    this.input2.read();
    this.input3.read();
  }
}

export type DigitalInputState = 'high' | 'low';

class DigitalInput {
  get state(): DigitalInputState {
    return this.currState;
  }

  private currState: DigitalInputState;
  private readonly gpio: Gpio;
  private readonly light: Light;
  private readonly lightService: LightService;

  constructor(gpio: Gpio, lightService: LightService, light: Light) {
    this.gpio = gpio;
    this.lightService = lightService;
    this.light = light;

    // set initial state
    this.currState = 'low';
    open(Gpio.DigitalInput1, INPUT);
  }

  read(): void {
    const value = read(this.gpio);

    if (value) {
      this.currState = 'high';
      this.light.on();
      return;
    } else {
      this.currState = 'low';
      this.light.off();
    }

    this.lightService.update();
  }
}
