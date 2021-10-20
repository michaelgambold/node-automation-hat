import { Light, LightService } from './light';

export class DigitalOutputService {
  readonly output1: DigitalOutput;
  readonly output2: DigitalOutput;
  readonly output3: DigitalOutput;

  private readonly lightService: LightService;

  constructor(lightService: LightService) {
    this.lightService = lightService;

    this.output1 = new DigitalOutput(lightService, lightService.digitalOutput1);
    this.output2 = new DigitalOutput(lightService, lightService.digitalOutput2);
    this.output3 = new DigitalOutput(lightService, lightService.digitalOutput3);
  }

  disable(): void {
    this.output1.low();
    this.output2.low();
    this.output2.low();
  }
}

type DigitalOutputState = 'high' | 'low';

class DigitalOutput {
  private readonly light: Light;
  private readonly lightService: LightService;
  private currState: DigitalOutputState;

  get state(): DigitalOutputState {
    return this.currState;
  }

  constructor(lightService: LightService, light: Light) {
    this.light = light;
    this.lightService = lightService;

    this.currState = 'low';
  }

  high(): void {
    this.currState = 'high';
    this.light.on();
    this.lightService.update();
  }

  low(): void {
    this.currState = 'low';
    this.light.off();
    this.lightService.update();
  }
}
