# node-automation-hat

Node.js project to support Pimoroni Automation Hat (https://shop.pimoroni.com/products/automation-hat)

Supported functionality:

- Led lights
- Relays
- Digital Output
- Digital Input

Currently not supported

- Analog Input

## Installing

Simply run `npm i node-automation-hat`

## How to Use

You can simply create an instance of the `AutomationHat` class. This will allow you access to all the underlying functionality.

However if you only need one part you can create instances of the following services:

- `LightService`
- `RelayService`
- `DigitalInputService`
- `DigitalOutputService`
- `AnalogInputService` (NOTE: Analog Input Service has not been completed)

## Development

Find a bug or want to contribute, simply clone this repository and submit a pull request.
