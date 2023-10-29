(async (req, res) => {
  let count = 0;
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
  console.log(Request);
  // server
  //   .forGet("/what-action-is-being-taken.html")
  //   .thenReply(200, "your response");
  // await server
  //   .forAnyRequest()
  //   .forHostname("ggg.com")
  //   .thenForwardTo("https://www.google.com");
  server.forAnyRequest().thenPassThrough({
    beforeResponse: (response) => {
      // Here you can access the real response:
      console.log(response.body.text);
      // Values returned here replace parts of the response:
      // if (response.headers["content-type"]?.startsWith("text/html")) {
      //   // E.g. append to all HTML response bodies:
      //   return {
      //     headers: { "content-type": "text/html" },
      //     body: response.body.text + " appended",
      //   };
      // } else {
      console.log(count++);
      // }
    },
  });
  // await server
  //   .forAnyRequest()
  //   .forHostname("github.com")
  //   .thenForwardTo("https://github.com");
  // server.forAnyRequest().thenCallback((request) => {
  //   // This code will run for all requests to Google.com
  //   return {
  //     status: 404,
  //     // Return a JSON response with an incrementing counter:
  //     json: "404 NOT FOUND",
  //   };
  // });
  //console.log(server.https.certPath);
  await server.start();
})();
