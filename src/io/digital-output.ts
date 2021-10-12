export class DigitalOutputService {
  readonly output1: DigitalOutput;
  readonly output2: DigitalOutput;
  readonly output3: DigitalOutput;

  constructor() {
    this.output1 = new DigitalOutput();
    this.output2 = new DigitalOutput();
    this.output3 = new DigitalOutput();
  }
}

class DigitalOutput {}
