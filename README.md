![uggo](https://user-images.githubusercontent.com/21694364/53292945-2615d600-3799-11e9-8a6f-f1a29e34bf4d.jpg)
Inspired by the complicated loggers in node, Uggo believes in simple beautiful logs. Minimal setup with feauture rich logging abilities. Out of the box comes with logging to a file, logging to console and logging with timestamp, scope, and message.

## Installing

```
npm install uggo
```

## Getting Started

```javascript
import { Uggo } from "uggo";

const log = new Uggo({ destination: "logs" });

log.info("Request sucesfully processed.");
log.error("Oops something went wrong!");
```

## Instantiating Uggo

```javascript
// Standard
const log = new Uggo({ destination: "logs" }); // [error] 2-6-2019 [13:56:11] Ooops an error occured

// Options
// json -> logs to file in json format
// silent -> log on the console or not.
const log = new Uggo({ destination: "logs", json: true, silent: false });
```

## Examples

```javascript
import { Uggo } from "uggo";

const log = new Uggo({ destination: "logs", silent: false });

async function fetch() {
  try {
    const { data } = await axios.get("/");

    log.info(data.message);
    return data;
  } catch (error) {
    log.error(error.message);
    return false;
  }
}
```
