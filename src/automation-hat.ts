import { DigitalInputService } from './io/digital-input';
import { DigitalOutputService } from './io/digital-output';
import { LightService } from './io/light';
import { RelayService } from './io/relay';

export class AutomationHat {
  readonly digitalInputs: DigitalInputService;
  readonly digitalOutputs: DigitalOutputService;
  readonly lights: LightService;
  readonly relays: RelayService;

  constructor() {
    this.lights = new LightService();
    this.digitalInputs = new DigitalInputService();
    this.digitalOutputs = new DigitalOutputService();
    this.relays = new RelayService(this.lights);
  }
}
