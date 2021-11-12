import rpio from 'rpio';
import { DigitalInputService, DigitalInputState } from './digital-input';
import { LightService } from './light';

describe('test digital inputs', () => {
  let service: DigitalInputService;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    service = new DigitalInputService(new LightService());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have inputs defined', () => {
    expect(service.input1).toBeDefined();
    expect(service.input2).toBeDefined();
    expect(service.input3).toBeDefined();
  });

  it('should have a known default state', () => {
    expect(service.input1.state).toEqual<DigitalInputState>('low');
    expect(service.input2.state).toEqual<DigitalInputState>('low');
    expect(service.input3.state).toEqual<DigitalInputState>('low');
  });

  it('should be able to read inputs state', () => {
    service.read();
  });
});
