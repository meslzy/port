# Port (✨)

> Find available ports

---

<div align="center">

![stars](https://badgen.net/github/stars/meslzy/port/)
![forks](https://badgen.net/github/forks/meslzy/port)
![issues](https://badgen.net/github/issues/meslzy/port)

</div>

---

## Getting Started (✅)

- ### Installation (⏬)

```bash
npm install @meslzy/port
```

---

### Usage  (📙)

```ts
import {isPortAvailable, getAvailablePorts, getAvailablePort} from "@meslzy/port";

isPortAvailable(3000).then((available) => {
  console.log(available); // true | false
});

interface AvailablePortsOptions {
  /**
   * Minimum port number
   * @default 1023
   **/
  min?: number;
  /**
   * Maximum port number
   * @default 65535
   **/
  max?: number;
  /**
   * Maximum number of ports to return
   **/
  limit?: number;
  /**
   * Ports to include
   **/
  include?: number[];
  /**
   * Ports to exclude
   **/
  exclude?: number[];
}

getAvailablePorts(AvailablePortsOptions).then((ports) => {
  console.log(ports); // available from 1023 to 65535
});

interface AvailablePortOptions {
  /**
   * Minimum port number
   * @default 1023
   **/
  min?: number;
  /**
   * Maximum port number
   * @default 65535
   **/
  max?: number;
  /**
   * Ports to include
   **/
  include?: number[];
  /**
   * Ports to exclude
   **/
  exclude?: number[];
}

getAvailablePort(AvailablePortOptions).then((port) => {
  console.log(port); // available from 1023 to 65535
});
```

---

## The End (💘)
