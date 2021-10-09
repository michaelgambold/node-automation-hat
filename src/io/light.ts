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
  private readonly lights: Light[];
  private readonly lightCount = 18;

  constructor() {
    this.lights = [];

    // lights are controlled through SN3218 so only have 18 channels
    for (let i = 0; i < 18; i++) {
      this.lights[i] = new Light(i);
    }
  }
}

export class Light {
  readonly lightIndex: LightIndex;

  constructor(lightIndex: LightIndex) {
    this.lightIndex = lightIndex;
  }
}
