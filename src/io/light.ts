import { i2cBegin, i2cSetBaudRate, i2cSetSlaveAddress, i2cWrite } from 'rpio';

enum LightIndex {
  AnalogInput1 = 0,
  AnalogInput2 = 1,
  AnalogInput3 = 2,
  // AnalogInput4 = null, // has no light

  DigitalInput1 = 14,
  DigitalInput2 = 13,
  DigitalInput3 = 12,

  DigitalOutput1 = 3,
  DigitalOutput2 = 4,
  DigitalOutput3 = 5,

  // NO = Normally Open, NC = Normally Closed
  Relay1NO = 6,
  Relay1NC = 7,
  Relay2NO = 8,
  Relay2NC = 9,
  Relay3NO = 10,
  Relay3NC = 11,

  Power = 17,
  Comms = 16,
  Warn = 15,
}

export class LightService {
  readonly analogInput1: Light;
  readonly analogInput2: Light;
  readonly analogInput3: Light;

  readonly digitalInput1: Light;
  readonly digitalInput2: Light;
  readonly digitalInput3: Light;

  readonly digitalOutput1: Light;
  readonly digitalOutput2: Light;
  readonly digitalOutput3: Light;

  // NO = Normally Open, NC = Normally Closed
  readonly relay1NO: Light;
  readonly relay1NC: Light;
  readonly relay2NO: Light;
  readonly relay2NC: Light;
  readonly relay3NO: Light;
  readonly relay3NC: Light;

  readonly power: Light;
  readonly comms: Light;
  readonly warn: Light;

  private readonly lights: Light[];
  private readonly maxBrightness = 128;

  // sn3218 command register addresses
  private readonly cmdEnableOutput = 0x00;
  private readonly cmdSetPwmValues = 0x01;
  private readonly cmdEnableLeds = 0x13;
  private readonly cmdUpdate = 0x16;
  private readonly cmdReset = 0x17;

  constructor() {
    i2cBegin();
    i2cSetSlaveAddress(0x54); // sn3218 fixed address
    i2cSetBaudRate(400_000); // sn3218 fixed baud rate

    this.enableLights();
    this.lights = [];

    // lights are controlled through SN3218 so only have 18 channels
    for (let i = 0; i < 18; i++) {
      this.lights[i] = new Light(i);
    }

    this.analogInput1 = this.lights[LightIndex.AnalogInput1];
    this.analogInput2 = this.lights[LightIndex.AnalogInput2];
    this.analogInput3 = this.lights[LightIndex.AnalogInput3];

    this.digitalInput1 = this.lights[LightIndex.DigitalInput1];
    this.digitalInput2 = this.lights[LightIndex.DigitalInput2];
    this.digitalInput3 = this.lights[LightIndex.DigitalInput3];

    this.digitalOutput1 = this.lights[LightIndex.DigitalOutput1];
    this.digitalOutput2 = this.lights[LightIndex.DigitalOutput2];
    this.digitalOutput3 = this.lights[LightIndex.DigitalOutput3];

    // NO = Normally Open, NC = Normally Closed
    this.relay1NO = this.lights[LightIndex.Relay1NO];
    this.relay1NC = this.lights[LightIndex.Relay1NC];
    this.relay2NO = this.lights[LightIndex.Relay2NO];
    this.relay2NC = this.lights[LightIndex.Relay2NC];
    this.relay3NO = this.lights[LightIndex.Relay3NO];
    this.relay3NC = this.lights[LightIndex.Relay3NC];

    this.power = this.lights[LightIndex.Power];
    this.comms = this.lights[LightIndex.Comms];
    this.warn = this.lights[LightIndex.Warn];
  }

  reset(): void {
    i2cWrite(Buffer.from([this.cmdReset, 0xff]));
  }

  disable(): void {
    i2cWrite(Buffer.from([this.cmdEnableOutput, 0x00]));
  }

  enable(): void {
    i2cWrite(Buffer.from([this.cmdEnableOutput, 0x01]));
    this.power.on();
    this.update();
  }

  private enableLights(): void {
    // create bit mask and bit shift this into 6 bit chunks?
    const enableMask = 0b111111111111111111;
    const maskArray = [
      enableMask & 0x3f,
      (enableMask >> 6) & 0x3f,
      (enableMask >> 12) & 0x3f,
    ];

    i2cWrite(Buffer.from([this.cmdEnableLeds, ...maskArray]));
    i2cWrite(Buffer.from([this.cmdUpdate, 0xff]));
  }

  update(): void {
    const lightData = this.lights.map((light) => {
      return light.state === 'on' ? this.maxBrightness : 0;
    });

    i2cWrite(Buffer.from([this.cmdSetPwmValues, ...lightData]));
    i2cWrite(Buffer.from([this.cmdUpdate, 0xff]));
  }
}

export type LightState = 'on' | 'off';

export class Light {
  get state(): LightState {
    return this.currState;
  }

  private currState: LightState;
  readonly lightIndex: LightIndex;

  constructor(lightIndex: LightIndex) {
    this.lightIndex = lightIndex;
    this.currState = 'off';
  }

  off(): void {
    this.currState = 'off';
  }

  on(): void {
    this.currState = 'on';
  }

  toggle(): void {
    this.currState = this.currState === 'off' ? 'on' : 'off';
  }
}
