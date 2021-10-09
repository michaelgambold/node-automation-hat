export class DigitalOutputService {
  readonly one: DigitalOutput;
  readonly two: DigitalOutput;
  readonly three: DigitalOutput;

  constructor() {
    this.one = new DigitalOutput();
    this.two = new DigitalOutput();
    this.three = new DigitalOutput();
  }
}

class DigitalOutput {}
