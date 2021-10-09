export class RelayService {
  readonly one: Relay;
  readonly two: Relay;
  readonly three: Relay;

  constructor() {
    this.one = new Relay();
    this.two = new Relay();
    this.three = new Relay();
  }
}

export class Relay {}
