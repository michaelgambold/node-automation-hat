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
  ah.lights.analogInput1.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.analogInput2.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.analogInput3.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput1.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput2.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput3.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput1.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput2.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput3.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay1NO.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay1NC.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay2NO.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay2NC.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay3NO.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay3NC.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.warn.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.comms.on();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.power.on();
  ah.lights.updateLights();
  await delay(100);

  // turn off all lights
  ah.lights.analogInput1.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.analogInput2.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.analogInput3.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput1.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput2.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalOutput3.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput1.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput2.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.digitalInput3.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay1NO.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay1NC.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay2NO.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay2NC.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay3NO.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.relay3NC.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.warn.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.comms.off();
  ah.lights.updateLights();
  await delay(100);

  ah.lights.power.off();
  ah.lights.updateLights();
  await delay(100);
}

async function testRelays(ah: AutomationHat) {
  // test all the relays work
  for (let i = 0; i < 2; i++) {
    ah.relays.relay1.on();
    ah.relays.relay2.on();
    ah.relays.relay3.on();
    await delay(500);

    ah.relays.relay1.off();
    ah.relays.relay2.off();
    ah.relays.relay3.off();
    await delay(500);
  }
}

async function main() {
  const ah = new AutomationHat();

  await testLights(ah);
  await testRelays(ah);
}

main();
