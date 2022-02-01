import { Light, LightService } from './light';

// max voltage each input can read
const maxVoltages = {
  input1: 25.85,
  input2: 25.85,
  input3: 25.85,
  input4: 3.3,
};
export class AnalogInputService {
  readonly input1: AnalogInput;
  readonly input2: AnalogInput;
  readonly input3: AnalogInput;
  readonly input4: AnalogInput;

  constructor(lightService: LightService) {
    this.input1 = new AnalogInput(
      maxVoltages.input1,
      lightService,
      lightService.analogInput1
    );
    this.input2 = new AnalogInput(
      maxVoltages.input2,
      lightService,
      lightService.analogInput2
    );
    this.input3 = new AnalogInput(
      maxVoltages.input3,
      lightService,
      lightService.analogInput3
    );
    this.input4 = new AnalogInput(maxVoltages.input4);
  }

  read(): void {
    this.input1.read();
    this.input2.read();
    this.input3.read();
    this.input4.read();
  }
}

export type AnalogInputState = 'high' | 'low';

class AnalogInput {
  get state(): AnalogInputState {
    return this.currState;
  }

  private currState: AnalogInputState;
  private readonly light: Light | undefined;
  private readonly lightService: LightService | undefined;
  private readonly maxVoltage: number;

  constructor(maxVoltage: number, lightService?: LightService, light?: Light) {
    this.maxVoltage = maxVoltage;
    this.lightService = lightService;
    this.light = light;

    // set initial state
    this.currState = 'low';
  }

  /* 
    analog._add(one=AnalogInput(0, 25.85, 0))
    analog._add(two=AnalogInput(1, 25.85, 1))
    analog._add(three=AnalogInput(2, 25.85, 2))
    analog._add(four=AnalogInput(3, 3.3, None))
  */

  read(): void {
    this.currState = this.currState === 'low' ? 'high' : 'low';
  }
}
