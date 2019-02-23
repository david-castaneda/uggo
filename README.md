![uggo](https://user-images.githubusercontent.com/21694364/53290574-fbfded00-3773-11e9-9acb-e9b3cd2c9905.jpg)
Inspired by the complicated loggers in node,  Uggo believes in  simple beautiful logs. Minimal setup with feauture rich logging abilities.

## Installing
```
npm install uggo
```

## Getting Started
```javascript
import { Uggo } from "uggo";

const log = new Uggo({ destination: "logs" });

log.error("Oops something went wrong!")
```

## Instantiating Uggo
```javascript
// Standard
const log = new Uggo({ destination: "logs" });  // [error] 2-6-2019 [13:56:11] Ooops an error occured

// Options
// json -> logs to file in json format
// silent -> Option to log on the console or not.
const log = new Uggo({ destination: "logs", json:true, silent: false });
```
