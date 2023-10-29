(async (req, res) => {
  const mockttp = require("mockttp");
  //console.log(req);
  // Create a proxy server with a self-signed HTTPS CA certificate:
  const https = await mockttp.generateCACertificate();
  const server = mockttp.getLocal({ https });
  console.log(https.cert);
  console.log(https.key);
  // Inject 'Hello world' responses for all requests
  //   await server.forAnyRequest().thenReply(200, "it's Sandeep");
  //   await server.start();
  // Proxy all example.com traffic through as normal, untouched:
  await server.forAnyRequest().forHost("example.com").thenPassThrough();

  // Make all GET requests to google.com time out:
  //   await server.get("google.com").thenTimeout();
  await server.forGet("ggg.com").thenReply("ads;jssksdkkksjdnd");
  //   Redirect any github requests to wikipedia.org:
  await server
    .forAnyRequest()
    .forHost("wikipedia.org")
    .thenForwardTo("https://www.wikipedia.org");
  await server.forAnyRequest().forHost("youtube.com").thenPassThrough();

  // Intercept /api?userId=123 on any host, serve the response from a file:
  server
    .forGet("/api")
    .withQuery({ userId: 123 })
    .thenFromFile(200, "/path/to/a/file");
  await server.forAnyRequest().thenPassThrough();
  //   await server.forAnyRequest().thenReply(200, "404 NOT FOUND")
  //   await server.post().thenCloseConnection();
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
