export class AnalogInputService {
  readonly one: AnalogInput;
  readonly two: AnalogInput;
  readonly three: AnalogInput;
  readonly four: AnalogInput;

  constructor() {
    this.one = new AnalogInput();
    this.two = new AnalogInput();
    this.three = new AnalogInput();
    this.four = new AnalogInput();
  }
}

class AnalogInput {}
