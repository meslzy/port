# Port (✨)

> port controller and finder for nodejs

---

<div align="center">

![stars](https://badgen.net/github/stars/meslzy/port/)
![forks](https://badgen.net/github/forks/meslzy/port)
![issues](https://badgen.net/github/issues/meslzy/port)

</div>

---

## Getting Started (✅)

- ### Installation (⏬)
	- `npm i @meslzy/port --save`

---

### Usage  (📙)

```ts
import * as port from "@meslzy/port";

port.isPortAvailable(5000).then((available) => {
  console.log(available); // true | false
});

port.findAvailablePorts().then((ports) => {
  console.log(ports); // available from 0 to 65535
});

port.findAvailablePorts({min: 5000, max: 8000}).then((ports) => {
  console.log(ports); // available from 5000 to 8000
});

port.findAvailablePorts({min: 5000, max: 8000, limit: 100}).then((ports) => {
  console.log(ports); // first 1000 available from 5000 to 8000
});


port.findAvailablePorts({min: 5000, max: 8000, limit: 100, exclude: [5000, 5001]}).then((ports) => {
  console.log(ports); // first 1000 available from 5000 to 8000 (5000, 5001) will not return
});

// get 1 available port [10ms time] from 3000, 5000
port.findAvailablePorts({min: 3000, max: 5000, limit: 1}).then((ports) => {
  console.log(ports); // first port available from 3000 to 5000
});

```

---

## The End (💘)
