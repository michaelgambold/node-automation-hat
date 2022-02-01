export type DeviceType = 'ADS1015' | 'ADS1115';

// ported from Pimoroni ADS1015 lib
// https://github.com/pimoroni/ads1015-python/blob/master/library/ads1015/__init__.py
export class Ads1x15 {
  private readonly ic2DefaultAddress = 0x48; // Default i2c address for Pimoroni breakout
  private readonly ic2AlternateAddress = 0x49; // Default alternate i2c address for Pimoroni breakout

  private readonly ic2AddressAddrGnd = 0x48; // Address when ADDR pin is connected to Ground
  private readonly ic2AddressAddrVdd = 0x49; // Address when ADDR pin is connected to VDD
  private readonly ic2AddressAddrSda = 0x50; // Address when ADDR pin is connected to SDA. Device datasheet recommends using this address last (sec 8.5.1.1)
  private readonly ic2AddressAddrScl = 0x41; // Address when ADDR pin is connected to SCL

  private readonly ic2Addresses = [
    this.ic2DefaultAddress,
    this.ic2AlternateAddress,
    this.ic2AddressAddrGnd,
    this.ic2AddressAddrGnd,
    this.ic2AddressAddrVdd,
    this.ic2AddressAddrSda,
    this.ic2AddressAddrScl,
  ];
}
