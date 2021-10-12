import { AutomationHat } from './automation-hat';
import { LightIndex } from './io/light';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function testLights(ah: AutomationHat) {
  // test all the lights work
  ah.lights.enable();
  ah.lights.enableLights(0b111111111111111111);

  // turn on all lights
  ah.lights.lights[LightIndex.AnalogInput1].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.AnalogInput2].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.AnalogInput3].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput1].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput2].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput3].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput1].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput2].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput3].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay1NO].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay1NC].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay2NO].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay2NC].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay3NO].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay3NC].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Warn].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Comms].on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Power].on();
  ah.lights.updateLights();
  await delay(100);

  // turn off all lights
  ah.lights.lights[LightIndex.AnalogInput1].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.AnalogInput2].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.AnalogInput3].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput1].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput2].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalOutput3].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput1].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput2].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.DigitalInput3].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay1NO].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay1NC].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay2NO].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay2NC].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay3NO].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Relay3NC].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Warn].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Comms].off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.lights[LightIndex.Power].off();
  ah.lights.updateLights();
  await delay(100);

  // blink twice

  ah.lights.lights.forEach((light) => light.on());
  ah.lights.updateLights();
  await delay(200);

  ah.lights.lights.forEach((light) => light.off());
  ah.lights.updateLights();
  await delay(200);

  ah.lights.lights.forEach((light) => light.on());
  ah.lights.updateLights();
  await delay(200);

  ah.lights.lights.forEach((light) => light.off());
  ah.lights.updateLights();
  await delay(200);
}

async function testRelays(ah: AutomationHat) {
  // test all the relays work
  for (let i = 0; i < 2; i++) {
    ah.relays.one.turnOn();
    ah.relays.two.turnOn();
    ah.relays.three.turnOn();
    await delay(500);

    ah.relays.one.turnOff();
    ah.relays.two.turnOff();
    ah.relays.three.turnOff();
    await delay(500);
  }
}

async function main() {
  const ah = new AutomationHat();

  await testLights(ah);
  await testRelays(ah);
}

main();
