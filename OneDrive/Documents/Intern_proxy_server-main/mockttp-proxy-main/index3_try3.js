(async (req, res) => {
  const mockttp = require("mockttp");
  console.log(req);
  // Create a proxy server with a self-signed HTTPS CA certificate:
  const https = await mockttp.generateCACertificate();
  const server = mockttp.getLocal({ https });
  console.log(https.cert);
  console.log(https.key);
  // Proxy all example.com traffic through as normal, untouched:
  //   await server.forAnyRequest().forHost("example.com").thenPassThrough();
  let counter = 0;
  server
    .forAnyRequest()
    .forHostname("google.com")
    .thenCallback((request) => {
      // This code will run for all requests to Google.com
      return {
        status: 200,
        // Return a JSON response with an incrementing counter:
        json: { counterValue: request },
      };
    });

  // Or wrap targets, transforming real requests & responses:
  server
    .forAnyRequest()
    .forHostname("example.com")
    .thenPassThrough({
      beforeResponse: (response) => {
        // Here you can access the real response:
        console.log(
          `Got ${response.statusCode} response with body: ${response.body.text}`
        );

        // Values returned here replace parts of the response:
        if (response.headers["content-type"]?.startsWith("text/html")) {
          // E.g. append to all HTML response bodies:
          return {
            headers: { "content-type": "text/html" },
            body: response.body.text + " appended",
          };
        }
      },
    });
  // Make all GET requests to google.com time out:
  // await server.forGet("google.com").thenTimeout();
  //   Redirect any github requests to wikipedia.org:
  await server
    .forAnyRequest()
    .forHost("github.com")
    .thenForwardTo("https://www.github.com");
  await server
    .forAnyRequest()
    .forHost("youtube.com")
    .thenForwardTo("https://www.wikipedia.org");

  // Intercept /api?userId=123 on any host, serve the response from a file:
  server
    .forGet("/api")
    .withQuery({ userId: 123 })
    .thenFromFile(200, "/path/to/a/file");
  //   await server.forAnyRequest().thenPassThrough();
  //   await server.forAnyRequest().thenReply(200, "404 NOT FOUND")
  //   await server.post().thenCloseConnection();
  await server.forGet("/").thenReply(200, "it'sandeep");
  await server.start();
  const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);

  if (process.argv[2] === "chrome") {
    // Launch an intercepted Chrome using this proxy:
    const launchChrome = require("./launch-chrome");
    launchChrome("https://example.com", server, caFingerprint);
  } else {
    // Print out the server details for manual configuration:
    console.log(`Server running on port ${server.port}`);
    console.log(`CA cert fingerprint ${caFingerprint}`);
  }
})(); // (All run in an async wrapper, so we can easily use top-level await)
