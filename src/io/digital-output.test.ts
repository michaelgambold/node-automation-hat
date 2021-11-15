import rpio from 'rpio';
import { DigitalOutputService, DigitalOutputState } from './digital-output';
import { LightService } from './light';

describe('test digital outputs', () => {
  let service: DigitalOutputService;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    service = new DigitalOutputService(new LightService());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have outputs defined', () => {
    expect(service.output1).toBeDefined();
    expect(service.output2).toBeDefined();
    expect(service.output3).toBeDefined();
  });

  it('should have a known default state', () => {
    expect(service.output1.state).toEqual<DigitalOutputState>('low');
    expect(service.output2.state).toEqual<DigitalOutputState>('low');
    expect(service.output3.state).toEqual<DigitalOutputState>('low');
  });

  it('should be able to set outputs high', () => {
    service.output1.high();
    service.output2.high();
    service.output3.high();

    expect(service.output1.state).toEqual<DigitalOutputState>('high');
    expect(service.output2.state).toEqual<DigitalOutputState>('high');
    expect(service.output3.state).toEqual<DigitalOutputState>('high');
  });

  it('should be able to toggle outputs', () => {
    expect(service.output1.state).toEqual<DigitalOutputState>('low');

    service.output1.high();

    expect(service.output1.state).toEqual<DigitalOutputState>('high');

    service.output1.low();

    expect(service.output1.state).toEqual<DigitalOutputState>('low');
  });

  it('should be able to disable service', () => {
    service.output1.high();
    service.output2.high();
    service.output3.high();

    service.disable();

    expect(service.output1.state).toEqual<DigitalOutputState>('low');
    expect(service.output2.state).toEqual<DigitalOutputState>('low');
    expect(service.output3.state).toEqual<DigitalOutputState>('low');
  });
});
