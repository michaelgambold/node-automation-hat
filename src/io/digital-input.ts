export class DigitalInputService {
  readonly one: DigitalInput;
  readonly two: DigitalInput;
  readonly three: DigitalInput;

  constructor() {
    this.one = new DigitalInput();
    this.two = new DigitalInput();
    this.three = new DigitalInput();
  }
}

class DigitalInput {}
