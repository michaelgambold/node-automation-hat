import { open, LOW, HIGH, write, OUTPUT } from 'rpio';
import { Gpio } from './gpio';
import { Light, LightService } from './light';

export class RelayService {
  readonly relay1: Relay;
  readonly relay2: Relay;
  readonly relay3: Relay;

  private readonly lightService: LightService;

  constructor(lightService: LightService) {
    this.lightService = lightService;

    this.relay1 = new Relay(
      Gpio.Relay1,
      lightService,
      lightService.relay1NC,
      lightService.relay1NO
    );
    this.relay2 = new Relay(
      Gpio.Relay2,
      lightService,
      lightService.relay2NC,
      lightService.relay2NO
    );
    this.relay3 = new Relay(
      Gpio.Relay3,
      lightService,
      lightService.relay3NC,
      lightService.relay3NO
    );
  }

  disable(): void {
    this.relay1.off();
    this.relay2.off();
    this.relay3.off();

    this.lightService.relay1NC.off();
    this.lightService.relay1NO.off();

    this.lightService.relay2NC.off();
    this.lightService.relay2NO.off();

    this.lightService.relay3NC.off();
    this.lightService.relay3NO.off();

    this.lightService.update();
  }

  enable(): void {
    this.lightService.relay1NC.on();
    this.lightService.relay2NC.on();
    this.lightService.relay3NC.on();
  }
}

export type RelayState = 'on' | 'off';

export class Relay {
  private currState: RelayState;
  private readonly gpio: Gpio;
  private readonly lightNC: Light;
  private readonly lightNO: Light;
  private readonly lightService: LightService;

  get state(): RelayState {
    return this.currState;
  }

  constructor(
    gpio: Gpio,
    lightService: LightService,
    lightNC: Light,
    lightNO: Light
  ) {
    this.gpio = gpio;
    this.lightService = lightService;
    this.lightNC = lightNC;
    this.lightNO = lightNO;

    // set initial state
    this.currState = 'off';
    open(gpio, OUTPUT, LOW);
    this.off();
  }

  off(): void {
    this.currState = 'off';
    write(this.gpio, LOW);

    this.lightNC.on();
    this.lightNO.off();
    this.lightService.update();
  }

  on(): void {
    this.currState = 'on';
    write(this.gpio, HIGH);

    this.lightNC.off();
    this.lightNO.on();
    this.lightService.update();
  }

  toggle(): void {
    if (this.currState === 'off') {
      this.on();
      return;
    }
    this.off();
  }
}
