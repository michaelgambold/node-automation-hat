import { i2cBegin, i2cSetBaudRate, i2cSetSlaveAddress, i2cWrite } from 'rpio';

export enum LightIndex {
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
  readonly lights: Light[];

  private readonly maxBrightness = 128;

  // sn3218 command register addresses
  private readonly cmdEnableOutput = 0x00;
  private readonly cmdSetPwmValues = 0x01;
  private readonly cmdEnableLeds = 0x13;
  // private readonly cmdEnableLeds7to12 = 0x14;
  // private readonly cmdEnableLeds13to18 = 0x15;
  private readonly cmdUpdate = 0x16;
  private readonly cmdReset = 0x17;

  constructor() {
    i2cBegin();
    i2cSetSlaveAddress(0x54);
    i2cSetBaudRate(400_000);

    this.lights = [];

    // lights are controlled through SN3218 so only have 18 channels
    for (let i = 0; i < 18; i++) {
      this.lights[i] = new Light(i);
    }
  }

  reset(): void {
    i2cWrite(Buffer.from([this.cmdReset, 0xff]));
  }

  disable(): void {
    i2cWrite(Buffer.from([this.cmdEnableOutput, 0x00]));
  }

  enable(): void {
    const status = i2cWrite(Buffer.from([this.cmdEnableOutput, 0x01]));
    console.log(status);
  }

  enableLights(enableMask: number): void {
    // i don't know wtf this is
    const maskArray = [
      enableMask & 0x3f,
      (enableMask >> 6) & 0x3f,
      (enableMask >> 12) & 0x3f,
    ];

    i2cWrite(Buffer.from([this.cmdEnableLeds, ...maskArray]));
    i2cWrite(Buffer.from([this.cmdUpdate, 0xff]));
  }

  updateLights(): void {
    const lightData = this.lights.map((light) => {
      return light.isOn ? this.maxBrightness : 0;
    });

    i2cWrite(Buffer.from([this.cmdSetPwmValues, ...lightData]));
    i2cWrite(Buffer.from([this.cmdUpdate, 0xff]));
  }
}

export class Light {
  isOn: boolean;

  readonly lightIndex: LightIndex;

  constructor(lightIndex: LightIndex) {
    this.lightIndex = lightIndex;
    this.isOn = false;
  }

  off(): void {
    this.isOn = false;
  }

  on(): void {
    this.isOn = true;
  }

  toggle(): void {
    this.isOn = !this.isOn;
  }
}
