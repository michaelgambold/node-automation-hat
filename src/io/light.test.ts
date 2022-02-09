import rpio from 'rpio';
import { LightState, LightService } from './light';

describe('test lights', () => {
  let service: LightService;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    service = new LightService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have lights defined', () => {
    expect(service.power).toBeDefined();
    expect(service.warn).toBeDefined();
    expect(service.comms).toBeDefined();

    expect(service.digitalInput1).toBeDefined();
    expect(service.digitalInput2).toBeDefined();
    expect(service.digitalInput3).toBeDefined();

    expect(service.digitalOutput1).toBeDefined();
    expect(service.digitalOutput2).toBeDefined();
    expect(service.digitalOutput3).toBeDefined();

    expect(service.relay1NC).toBeDefined();
    expect(service.relay1NO).toBeDefined();
    expect(service.relay2NO).toBeDefined();
    expect(service.relay2NO).toBeDefined();
    expect(service.relay3NO).toBeDefined();
    expect(service.relay3NO).toBeDefined();
  });

  it('should have a known default state', () => {
    expect(service.power.state).toEqual<LightState>('off');
    expect(service.warn.state).toEqual<LightState>('off');
    expect(service.comms.state).toEqual<LightState>('off');

    expect(service.digitalInput1.state).toEqual<LightState>('off');
    expect(service.digitalInput2.state).toEqual<LightState>('off');
    expect(service.digitalInput3.state).toEqual<LightState>('off');

    expect(service.digitalOutput1.state).toEqual<LightState>('off');
    expect(service.digitalOutput2.state).toEqual<LightState>('off');
    expect(service.digitalOutput3.state).toEqual<LightState>('off');

    expect(service.relay1NC.state).toEqual<LightState>('off');
    expect(service.relay1NO.state).toEqual<LightState>('off');
    expect(service.relay2NC.state).toEqual<LightState>('off');
    expect(service.relay2NO.state).toEqual<LightState>('off');
    expect(service.relay3NC.state).toEqual<LightState>('off');
    expect(service.relay3NO.state).toEqual<LightState>('off');
  });

  it('should turn on all lights', () => {
    service.power.on();
    service.comms.on();
    service.warn.on();

    service.digitalInput1.on();
    service.digitalInput2.on();
    service.digitalInput3.on();

    service.digitalOutput1.on();
    service.digitalOutput2.on();
    service.digitalOutput3.on();

    service.relay1NC.on();
    service.relay1NO.on();
    service.relay2NC.on();
    service.relay2NO.on();
    service.relay3NC.on();
    service.relay3NO.on();

    expect(service.power.state).toEqual<LightState>('on');
    expect(service.warn.state).toEqual<LightState>('on');
    expect(service.comms.state).toEqual<LightState>('on');

    expect(service.digitalInput1.state).toEqual<LightState>('on');
    expect(service.digitalInput2.state).toEqual<LightState>('on');
    expect(service.digitalInput3.state).toEqual<LightState>('on');

    expect(service.digitalOutput1.state).toEqual<LightState>('on');
    expect(service.digitalOutput2.state).toEqual<LightState>('on');
    expect(service.digitalOutput3.state).toEqual<LightState>('on');

    expect(service.relay1NC.state).toEqual<LightState>('on');
    expect(service.relay1NO.state).toEqual<LightState>('on');
    expect(service.relay2NC.state).toEqual<LightState>('on');
    expect(service.relay2NO.state).toEqual<LightState>('on');
    expect(service.relay3NC.state).toEqual<LightState>('on');
    expect(service.relay3NO.state).toEqual<LightState>('on');
  });

  it('should allow overriding the brightness', () => {
    service.setLedBrightness(0);
    service.setLedBrightness(128);
    service.setLedBrightness(255);
  });

  it('should throw errors for invalid brightness levels', () => {
    const errorMsg = 'Invalid brightness, value must be between 0-255';

    expect(() => service.setLedBrightness(-1)).toThrowError(errorMsg);
    expect(() => service.setLedBrightness(256)).toThrowError(errorMsg);
  });
});
