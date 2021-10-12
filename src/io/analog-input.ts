export class AnalogInputService {
  readonly input1: AnalogInput;
  readonly input2: AnalogInput;
  readonly input3: AnalogInput;
  readonly input4: AnalogInput;

  constructor() {
    this.input1 = new AnalogInput();
    this.input2 = new AnalogInput();
    this.input3 = new AnalogInput();
    this.input4 = new AnalogInput();
  }
}

class AnalogInput {}
