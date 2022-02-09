import delay from 'delay';
import { AutomationHat } from '../src/main';

describe('test automation hub', () => {
  jest.setTimeout(10_000);

  let automationHat: AutomationHat;

  beforeEach(() => {
    automationHat = new AutomationHat();
    automationHat.lights.enable();
    automationHat.relays.disable();
  });

  afterEach(() => {
    automationHat.digitalOutputs.disable();
    automationHat.lights.disable();
    automationHat.relays.disable();
  });

  it('automation hat should be defined', () => {
    expect(automationHat).toBeDefined();
  });

  it('should turn on all lights', async () => {
    automationHat.lights.setLedBrightness(50);

    automationHat.lights.analogInput1.on();
    automationHat.lights.analogInput2.on();
    automationHat.lights.analogInput3.on();
    automationHat.lights.comms.on();
    automationHat.lights.digitalInput1.on();
    automationHat.lights.digitalInput2.on();
    automationHat.lights.digitalInput3.on();
    automationHat.lights.digitalOutput1.on();
    automationHat.lights.digitalOutput2.on();
    automationHat.lights.digitalOutput3.on();
    automationHat.lights.power.on();
    automationHat.lights.relay1NC.on();
    automationHat.lights.relay1NO.on();
    automationHat.lights.relay2NC.on();
    automationHat.lights.relay2NO.on();
    automationHat.lights.relay3NC.on();
    automationHat.lights.relay3NO.on();
    automationHat.lights.warn.on();

    automationHat.lights.update();

    await delay(1000);
  });

  it('should be able to change led brightness', async () => {
    automationHat.lights.warn.on();

    let brightness = 128;

    while (brightness > 0) {
      automationHat.lights.setLedBrightness(--brightness);
      automationHat.lights.update();
      await delay(10);
    }

    await delay(1000);
  });

  it('should change all relays', async () => {
    automationHat.lights.enable();
    automationHat.relays.enable();

    automationHat.relays.relay1.on();
    await delay(250);

    automationHat.relays.relay2.on();
    await delay(250);

    automationHat.relays.relay3.on();
    await delay(250);

    await delay(1000);
  });
});
