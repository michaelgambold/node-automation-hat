import { AutomationHat } from './automation-hat';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const ah = new AutomationHat();

  // test all the lights work

  // test all the relays work
  ah.relays.one.turnOn();
  await delay(100);
  ah.relays.two.turnOn();
  await delay(100);
  ah.relays.three.turnOn();
  await delay(100);

  ah.relays.one.turnOff();
  await delay(100);
  ah.relays.two.turnOff();
  await delay(100);
  ah.relays.three.turnOff();
  await delay(100);
}

main();
