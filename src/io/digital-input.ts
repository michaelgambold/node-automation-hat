export class DigitalInputService {
  readonly input1: DigitalInput;
  readonly input2: DigitalInput;
  readonly input3: DigitalInput;

  constructor() {
    this.input1 = new DigitalInput();
    this.input2 = new DigitalInput();
    this.input3 = new DigitalInput();
  }
}

type DigitalInputState = 'high' | 'low';

class DigitalInput {
  get state(): DigitalInputState {
    return this.currState;
  }

  private currState: DigitalInputState;

  constructor() {
    this.currState = 'low';
  }
}
