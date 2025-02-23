export class AnalogInputService {
  readonly input1: AnalogInput;
  readonly input2: AnalogInput;
  readonly input3: AnalogInput;
  readonly input4: AnalogInput;

  constructor() {
    this.input1 = new AnalogInput(25.85);
    this.input2 = new AnalogInput(25.85);
    this.input3 = new AnalogInput(25.85);
    this.input4 = new AnalogInput(3.3);
  }
}

class AnalogInput {
  private readonly maxVoltage: number;

  constructor(maxVoltage: number) {
    this.maxVoltage = maxVoltage;
  }
}
