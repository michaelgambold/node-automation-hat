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
  private readonly maxBrightness = 128; // from pimoroni python lib
  private brightness: number;

  // sn3218 command register addresses
  private readonly cmdEnableOutput = 0x00;
  private readonly cmdSetPwmValues = 0x01;
  private readonly cmdEnableLeds = 0x13;
  private readonly cmdUpdate = 0x16;
  private readonly cmdReset = 0x17;

  constructor() {
    this.brightness = this.maxBrightness;

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

  /**
   * Disable all LED lights.
   */
  disable(): void {
    i2cWrite(Buffer.from([this.cmdEnableOutput, 0x00]));
  }

  /**
   * Enable all LED lights. The power LED will be illuminated
   * by default.
   */
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

    // this enables the light driver I think (not leds on or off)
    // this should always be invoked
    i2cWrite(Buffer.from([this.cmdEnableLeds, ...maskArray]));
    i2cWrite(Buffer.from([this.cmdUpdate, 0xff]));
  }

  reset(): void {
    i2cWrite(Buffer.from([this.cmdReset, 0xff]));
  }

  /**
   * Sets the brightness for all leds. Valid values are 0-255
   * @param brightness
   */
  setLedBrightness(brightness: number): void {
    if (brightness === 0) {
      this.brightness = 0;
      return;
    }

    // although the value is entered 0-255 the maximum allowed
    // value is 128. So we must convert this to a rounded percentage value
    const convertedBrightness = Math.round((128 / 255) * brightness);

    // have to have >= to catch round down to 0
    if (convertedBrightness >= 0 && convertedBrightness <= this.maxBrightness) {
      this.brightness = convertedBrightness;
      return;
    }

    throw new Error('Invalid brightness, value must be between 0-255');
  }

  /**
   * Update all LED's state. I.e. turn them on or off.
   */
  update(): void {
    const lightData = this.lights.map((light) => {
      return light.state === 'on' ? this.brightness : 0;
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

  /**
   * Set light's state to off.
   * Note: to see the change invoke LightService.update()
   */
  off(): void {
    this.currState = 'off';
  }

  /**
   * Set lights state to on.
   * Note: to see the change invoke LightService.update()
   */
  on(): void {
    this.currState = 'on';
  }

  /**
   * Toggle lights state. I.e. on => off or off => on.
   * Note: to see the change invoke LightService.update()
   */
  toggle(): void {
    this.currState = this.currState === 'off' ? 'on' : 'off';
  }
}
