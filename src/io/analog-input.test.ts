import rpio from 'rpio';
import { AnalogInputService } from './analog-input';

describe('test analog inputs', () => {
  let service: AnalogInputService;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    service = new AnalogInputService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have inputs defined', () => {
    expect(service.input1).toBeDefined();
    expect(service.input2).toBeDefined();
    expect(service.input3).toBeDefined();
    expect(service.input4).toBeDefined();
  });
});
