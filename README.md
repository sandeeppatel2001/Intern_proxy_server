# mockttp-proxy-demo

A tiny demo, showing how to build your own scriptable HTTPS-intercepting proxy with Mockttp

## How to use this

- Clone the repo.
- Run `npm install` inside the repo.
- Run `node index7_final.js` to start the proxy and an intercepted Chrome window.

You can also run `npm start` to start the server directly,

## Some suggested rules

Try replacing [the existing rule](https://github.com/sandeeppatel2001/demo_proxy_rule/blob/main/demo_rule.js) with:

```javascript
// Proxy all example.com traffic through as normal, untouched:
server.anyRequest().forHost("example.com").thenPassThrough();

// Make all GET requests to google.com time out:
server.get("google.com").thenTimeout();
