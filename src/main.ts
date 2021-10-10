import { AutomationHat } from './automation-hat';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const ah = new AutomationHat();

  // test all the lights work

  // test all the relays work
  ah.relays.one.turnOn();
  ah.relays.two.turnOn();
  ah.relays.three.turnOn();
  await delay(500);

  ah.relays.one.turnOff();
  ah.relays.two.turnOff();
  ah.relays.three.turnOff();
  await delay(500);
}

main();
