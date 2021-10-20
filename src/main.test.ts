import { DigitalOutputService } from './io/digital-output';
import { LightService } from './io/light';
import { RelayService } from './io/relay';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

describe('test lights', () => {
  it('should scroll all lights', async () => {
    const ls = new LightService();
    // test all the lights work
    ls.enable();

    // turn on all lights
    ls.analogInput1.on();
    ls.update();
    await delay(100);

    ls.analogInput2.on();
    ls.update();
    await delay(100);

    ls.analogInput3.on();
    ls.update();
    await delay(100);

    ls.digitalOutput1.on();
    ls.update();
    await delay(100);

    ls.digitalOutput2.on();
    ls.update();
    await delay(100);

    ls.digitalOutput3.on();
    ls.update();
    await delay(100);

    ls.digitalInput1.on();
    ls.update();
    await delay(100);

    ls.digitalInput2.on();
    ls.update();
    await delay(100);

    ls.digitalInput3.on();
    ls.update();
    await delay(100);

    ls.relay1NO.on();
    ls.update();
    await delay(100);

    ls.relay1NC.on();
    ls.update();
    await delay(100);

    ls.relay2NO.on();
    ls.update();
    await delay(100);

    ls.relay2NC.on();
    ls.update();
    await delay(100);

    ls.relay3NO.on();
    ls.update();
    await delay(100);

    ls.relay3NC.on();
    ls.update();
    await delay(100);

    ls.warn.on();
    ls.update();
    await delay(100);

    ls.comms.on();
    ls.update();
    await delay(100);

    ls.power.on();
    ls.update();
    await delay(100);

    // turn off all lights
    ls.analogInput1.off();
    ls.update();
    await delay(100);

    ls.analogInput2.off();
    ls.update();
    await delay(100);

    ls.analogInput3.off();
    ls.update();
    await delay(100);

    ls.digitalOutput1.off();
    ls.update();
    await delay(100);

    ls.digitalOutput2.off();
    ls.update();
    await delay(100);

    ls.digitalOutput3.off();
    ls.update();
    await delay(100);

    ls.digitalInput1.off();
    ls.update();
    await delay(100);

    ls.digitalInput2.off();
    ls.update();
    await delay(100);

    ls.digitalInput3.off();
    ls.update();
    await delay(100);

    ls.relay1NO.off();
    ls.update();
    await delay(100);

    ls.relay1NC.off();
    ls.update();
    await delay(100);

    ls.relay2NO.off();
    ls.update();
    await delay(100);

    ls.relay2NC.off();
    ls.update();
    await delay(100);

    ls.relay3NO.off();
    ls.update();
    await delay(100);

    ls.relay3NC.off();
    ls.update();
    await delay(100);

    ls.warn.off();
    ls.update();
    await delay(100);

    ls.comms.off();
    ls.update();
    await delay(100);

    ls.power.off();
    ls.update();
    await delay(100);
  });
});

describe('test relays', () => {
  it('should test all relays', async () => {
    const ls = new LightService();
    const rs = new RelayService(ls);

    // test all the relays work
    for (let i = 0; i < 2; i++) {
      rs.relay1.on();
      rs.relay2.on();
      rs.relay3.on();
      await delay(500);

      rs.relay1.off();
      rs.relay2.off();
      rs.relay3.off();
      await delay(500);
    }

    rs.disable();
  });
});

describe('test digital outputs', () => {
  it('should toggle digital outputs', async () => {
    const ls = new LightService();
    const dos = new DigitalOutputService(ls);

    dos.output1.high();
    await delay(1000);

    dos.output1.low();
    await delay(1000);

    dos.output2.high();
    await delay(1000);

    dos.output2.low();
    await delay(1000);

    dos.output3.high();
    await delay(1000);

    dos.output3.low();
    await delay(1000);

    dos.output1.high();
    dos.output2.high();
    dos.output3.high();
    await delay(500);

    dos.disable();
  });
});
