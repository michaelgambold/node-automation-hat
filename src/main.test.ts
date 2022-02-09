import rpio from 'rpio';
import { AutomationHat } from './main';

describe('test automation hat', () => {
  let automationHat: AutomationHat;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    automationHat = new AutomationHat();
  });

  it('automation hat should be defined', () => {
    expect(automationHat).toBeDefined();
  });

  it('services should be defined', () => {
    expect(automationHat.digitalInputs).toBeDefined();
    expect(automationHat.digitalOutputs).toBeDefined();
    expect(automationHat.lights).toBeDefined();
    expect(automationHat.relays).toBeDefined();
  });
});
