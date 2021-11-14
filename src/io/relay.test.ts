import rpio from 'rpio';
import { LightService } from './light';
import { RelayService, RelayState } from './relay';

describe('test relays', () => {
  let service: RelayService;

  beforeAll(() => {
    rpio.init({
      gpiomem: false,
      mock: 'raspi-3',
    });
  });

  beforeEach(() => {
    service = new RelayService(new LightService());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have inputs defined', () => {
    expect(service.relay1).toBeDefined();
    expect(service.relay2).toBeDefined();
    expect(service.relay3).toBeDefined();
  });

  it('should have a known default state', () => {
    expect(service.relay1.state).toEqual<RelayState>('off');
    expect(service.relay2.state).toEqual<RelayState>('off');
    expect(service.relay3.state).toEqual<RelayState>('off');
  });

  it('should be able to turn on relays', () => {
    service.relay1.on();
    service.relay2.on();
    service.relay3.on();

    expect(service.relay1.state).toEqual<RelayState>('on');
    expect(service.relay2.state).toEqual<RelayState>('on');
    expect(service.relay3.state).toEqual<RelayState>('on');
  });

  it('should be able to toggle relay', () => {
    expect(service.relay1.state).toEqual<RelayState>('off');

    service.relay1.toggle();

    expect(service.relay1.state).toEqual<RelayState>('on');

    service.relay1.toggle();

    expect(service.relay1.state).toEqual<RelayState>('off');
  });

  it('should be able to be disabled', () => {
    service.disable();

    expect(service.relay1.state).toEqual<RelayState>('off');
    expect(service.relay2.state).toEqual<RelayState>('off');
    expect(service.relay3.state).toEqual<RelayState>('off');
  });

  it('should be able to be enabled', () => {
    service.enable();

    expect(service.relay1.state).toEqual<RelayState>('off');
    expect(service.relay2.state).toEqual<RelayState>('off');
    expect(service.relay3.state).toEqual<RelayState>('off');
  });
});
