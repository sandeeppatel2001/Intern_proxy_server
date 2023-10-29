(async () => {
  const mockttp = require("mockttp");
  // Create a proxy server with a self-signed HTTPS CA certificate:
  // const https = await mockttp.generateCACertificate();
  const server = mockttp.getLocal({
    https: {
      keyPath: "./keys/a4.key",
      certPath: "./certificats/a4.pem",
    },
    debug: false,
  });

  const arr = ["github", "wikipedia"];
  server.on("request-initiated", (req) => {
    let host = req.headers.host;
    let cookies = req.headers.cookie;
    let purhost = host.split(".");
    //console.log(req);
    //console.log(purhost);
    //console.log(req);
    if (arr.indexOf(purhost[purhost.length - 2]) + 1) {
      //console.log(host);
      //console.log(cookies);
      server.forAnyRequest().thenPassThrough({
        beforeResponse: (response) => {
          console.log(response.body.buffer.toJSON());
        },
      });
    }
  });

  await server.start();
})();
