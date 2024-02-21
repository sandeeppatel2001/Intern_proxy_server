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

// Redirect any github requests to wikipedia.org:
server
  .anyRequest()
  .forHost("github.com")
  .thenForwardTo("https://www.wikipedia.org");

// Intercept /api?userId=123 on any host, serve the response from a file:
server
  .get("/api")
  .withQuery({ userId: 123 })
  .thenFromFile(200, "/path/to/a/file");

// Forcibly close any connection if a POST request is sent:
server.post().thenCloseConnection();
```
```
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA6K0KuoN1GtBfEbh/C0JQsS6CWE509irwMrGqeRPnE8g90Gkz
nuu6YgnUYjW82P1KTrhV9/Eut+5gHb6W1gxz4ivQR70nFgkfuLieNoR+unT31N6s
B/wYde2eWUNOq7/Yl6bfictHQJVI13hMzeH9u0OkhT0/B0PvatWKJT3Z0RjYtNkd
iE29Y5N58FYi6lYVvljyB9CAcFuSPSgMXFYzB0avwOc7NmccPwE3XZPG3Mow7RY9
FkEdlWY8L5D1g4Gsi5OTqXb+7w5ElSpLGBYl8CDEMooHaYtXH+myuFOshdnbhp9X
hwPYnNL7Xrl+ohUanaep81HOMr6aAzrKakpO6QIDAQABAoIBAGWexfPF3Ex0u0DT
EnGJahKoXHdS9NRa1oNdgzXUUnUaXJz8hXYgQEv3PRITpEIlBeIxsiJS7POaIdJ7
3gboc2hReGsMmtiN7ZPQ1hC7d1naIi+PfRUTrl87A5C6y85JQMCjOjhFVv5G9QRe
XzUAQcAa/+zNXgy/R/6h+u7e/5XJbfijWVGFfYNDE3Lb2xgHT8CGY1iFC4joO4pE
6VZ5sYk0yE+R6eVEEDWIociVW+oilhiyZgWzyLcLFPlLC6vNBeWtJzrqu3WgIXkS
uZMmDFu5g8+KpBtLY7Pw9Wu8EmYwTgAKPtbWK9s0yEheeLCJjyZXI5eHgHK3fzLC
s3OvY/0CgYEA+/Tfy9AxHmws5SV4iq9goLGNxWiKgkCtlezvPm5tQFdd5UfCsKVE
r/sHYyrAJ4SVDL4Enq2MG6/12lHHdkfHCYvPq7D2i0bNKenN+ev/UyoF5cMWqnvs
UciBAfvSOEuynuwKTsXgcbdhVAWcDxhY52YAmCeK5RAJ8PfH5tgr0wMCgYEA7Gj0
zY6WUdiDJoYzbeQg0/RnCkByeGCtGJ2+QltkNAOThkXtnzCakge0ZRiVh5yx9bDw
KY5/IDn10xC9dXoY6FyDOZnEzmqSe8MWPr+/JGXDS3gqtxeANZTmpwRiD1RFoFMi
7feET7Xdqg6GgfHEkwZej/FwUQQ5vJpGLTzk/KMCgYAOcJ5S4/+sqq54A4nBCQQU
sZhac/9cL7DDIu0jOtjwExHCjjZOQWqKW2y09kJFAYg5TrqdDX02KQOCG6W+1aZG
mcixIlc+7DPd7xRq+meLsKDd5ixqYOfOWBtsra4Co/P8v7JniVevrL7bPecPxmlx
+ZqXHc0MC7tGIC1IwaLhWQKBgHL3q61XXTTaRRV0CAi1+1z4Ky/qHYD7CtLAy6i7
hyRgZNrUoPVcjp7bjlfnt7gmdMjVzkV3Xc1PQoPtTSWXRguiCdL2O6ZiX3A+dE/5
sbvCnVHTU3qMvDXSfsTUNdfclKueIot1ZmvZNr4fqDwDViRl4ZDAym0rz+QvZldT
mMxfAoGBAPqAw3STxhac/SI6Q/YfJ96wpZYP6dUCSIVmwzDQVOHlZ4vbEMyjg1+M
n1rzPR5C/oIut01br85w/yJnpWFsbW1U2zzEP5Y7D53SZZ67qidZgk5stJoEuE4X
G8pH8Dd49lkrQm2sBXPLtv7ddhFHHWLamtYTeGgLaJ2QgB6FHuy2
-----END RSA PRIVATE KEY-----
```
This defines a few different rules for specific requests. Try viewing Google.com for example (it'll timeout) or visiting GitHub (it'll give you Wikipedia instead).

This only works for the specific traffic that's matched. If you'd like to proxy most traffic as normal, so the internet basically works but only one or two things are changed, then:

- Define your specific rules, as above
- Include a `.always()` specifier on each one (e.g. `server.get("google.com").always().thenReply(200, "hi")`)
- Add one last rule at the end which says:
  ```javascript
  server.anyRequest().thenPassThrough();
  ```

This ensures that your specific rules always take precedence if they match, and any requests which don't match them get proxied untouched, and work as normal.


```javascript
// Proxy all example.com traffic through as normal, untouched:
server.anyRequest().forHost("example.com").thenPassThrough();

// Make all GET requests to google.com time out:
server.get("google.com").thenTimeout();
