# Automation Hat

Node.js project to support Pimoroni Automation Hat (https://shop.pimoroni.com/products/automation-hat)

The node version support and the corresponding version of this library are listed in the table below.

| Automation Hat Version | Supported Node Versions |
| ---------------------- | ----------------------- |
| 1                      | 14, 15, 16, 17, 18, 19  |
| 2.0                    | 16, 17, 18, 19          |
| 2.1                    | 16, 17, 18,19, 20       |

Supported functionality:

- Led lights
- Relays
- Digital Output
- Digital Input

Currently not supported

- Analog Input

## Installing

Simply run

```
npm i automation-hat
```

## How to Use

### Automation Hat

To simply use the whole library create an instance of the `AutomationHat` class.
This class has all other functionality of the Automation Hat already configured but disabled (except for the led lights).

```
const automationHat = new AutomationHat();
```

To enable modules you simple call the `.SERVICE.enable()` method. Services are disabled by default to save the LEDs life when not in use (eg `no` led for the relays) and in the name of general performance.

However if you only need one part of the Automation Hat you can create instances of the following services:

- `LightService`
- `RelayService`
- `DigitalInputService`
- `DigitalOutputService`
- `AnalogInputService` (NOTE: Analog Input Service has not been completed)

> **_WARN:_** When creating instances of the services yourself ensure that you only
> create singleton (one of each) instances. Creating multiple `LightService` for example
> may have unknown behaviour or errors. You have been warned!

### Light Service

The `LightService` looks after all the led lights.
There is a property for each led light on the Automation Hat (e.g. `LightService.power` for the power led).

You can create an instance of the light service like this

```
const lightService = new LightService()
```

Each light has the following properties:

| Property | Description   |
| -------- | ------------- |
| state    | `on` or `off` |

Each light has the following methods:

| Method   | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| off()    | Turn a light off                                                                          |
| on()     | Turn a light on                                                                           |
| toggle() | Toggle a light (off -> on, on -> off)                                                     |
| update() | Update the state of all lights. Light state will not change unless this method is called! |

### Relay Service

The `RelayService` looks after all the relays.
There is a property for each relay. For example `RelayService.relay1`.

To create an instance of the relay service you have to pass in an instance of the `LightService`.

```
const lightService = new LightService();
const relayService = new RelayService(lightService);
```

The `RelayService` has the following methods:

Each light has the following methods:

| Method    | Description                                       |
| --------- | ------------------------------------------------- |
| disable() | Disables relay control and turns off relay lights |
| enable()  | Enables relay control. Defaults to NC/`off`       |

Each relay has the following properties:

| Property | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| state    | `on` or `off`. `on` is NO (Normally Open) and `off` if NC (Normally Closed) |

Each relay has the following methods:

| Method   | Description                           |
| -------- | ------------------------------------- |
| off()    | Turn a relay off (i.e. NC)            |
| on()     | Turn a relay on (i.e. NO)             |
| toggle() | Toggle a relay (off -> on, on -> off) |

### Digital Input Service

The `DigitalInputService` looks after all the digital inputs.
There is a property for each digital input. For example `DigitalInputService.input1`.

To create an instance of the digital input service you have to pass in an instance of the `LightService`.

```
const lightService = new LightService();
const digitalInputService = new DigitalInputService(lightService);
```

The `DigitalInputService` has the following methods:

| Method | Description                                      |
| ------ | ------------------------------------------------ |
| read() | read all digital inputs value and set it's state |

Each digital input has the following properties:

| Property | Description     |
| -------- | --------------- |
| state    | `low` or `high` |

Each digal input has the following methods:

| Method | Description                                       |
| ------ | ------------------------------------------------- |
| read() | Read the digital input's value and set it's state |

### Digital Output Service

The `DigitalOutputService` looks after all the digital outputs.
There is a property for each digital output. For example `DigitalOutputService.output1`.

To create an instance of the digital output service you have to pass in an instance of the `LightService`.

```
const lightService = new LightService();
const digitalOutputService = new DigitalOutputService(lightService);
```

The `DigitalOutputService` has the following methods:

| Method    | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| disable() | Disables digital output control and sets all the outputs to `low` |
| enable()  | Enables digital output control. Defaults to `low`                 |

Each digital output has the following properties:

| Property | Description     |
| -------- | --------------- |
| state    | `low` or `high` |

Each digital output has the following methods:

| Method   | Description                                        |
| -------- | -------------------------------------------------- |
| high()   | Set a digital ouput `high`                         |
| low()    | Set a digital ouput `low`                          |
| toggle() | Toggle a digital ouptut (low -> high, high -> low) |

### Analog Input Service

> **_NOTE:_** The analog input service has not been implemented.
> However this is the general thought/direction and may yet have breaking changes

The `AnalogInputService` looks after all the analog inputs.
There is a property for each analog input. For example `AnalogInputService.input1`.

To create an instance of the analog input service you have to pass in an instance of the `LightService`.

```
const lightService = new LightService();
const analogInputService = new AnalogInputService(lightService);
```

The `AnalogInputService` has the following methods:

| Method    | Description                                                     |
| --------- | --------------------------------------------------------------- |
| disable() | Disables analog input reading and turns off analog input lights |
| enable()  | Enables analog input reading                                    |

<!-- Each analog input has the following properties:

| Property | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| state    | `on` or `off`. `on` is NO (Normally Open) and `off` if NC (Normally Closed) |

Each analog input  has the following methods:

| Method   | Description                           |
| -------- | ------------------------------------- |
| off()    | Turn a relay off (i.e. NC)            |
| on()     | Turn a relay on (i.e. NO)             |
| toggle() | Toggle a relay (off -> on, on -> off) | -->

## Development

Find a bug or want to contribute, simply clone this repository and submit a pull request.
