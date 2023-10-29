(async () => {
  //ADD REQUIRE MODULE
  const express = require("express");
  const app = express();
  var StringDecoder = require("string_decoder").StringDecoder;
  const mockttp = require("mockttp");
  const request = require("request");
  var decoder = new StringDecoder("utf8");
  //IMPORT KEY AND PEM FILE
  const server = mockttp.getLocal({
    https: {
      keyPath: "./keys/a4.key",
      certPath: "./certificats/a4.pem",
    },
    debug: false,
  });
  // TAKE WHITELIST SITE IN A ARRAY
  const arr = ["github", "wikipedia"];
  //WHEN SERVER START THEN HANDLE DIFFERENT PART
  server.on("request-initiated", (req) => {
    let host = req.headers.host;
    let cookies = req.headers.cookie;
    //SPLIT URL BY (.)
    let purhost = host.split(".");
    // console.log(purhost[purhost.length - 2]);
    // console.log(req);
    //STORE URL IN A VERIABLE
    let url = req.url;
    //FETCH  THE URL AND GET BODY DATA
    // request({ url: url, json: false }, (error, response) => {
    //   console.log(response.body);
    // });
    //TAKE URL SECOND LAST PART INDEX
    const a = arr.indexOf(purhost[purhost.length - 2]);
    //console.log(a);
    //TAKE URL SECOND LAST PART AND MATCH WITH WHITELIST SITE
    // URL SECOND LAST PART SHOULD PRESENT IN ARRAY THEN IT'S GOING TO OPEN
    //IF URL SECOND LAST PART PRESENT IN ARRAY THEN THERE INDEX SHOULD BE GREATER THAN OR EQUAL TO ZERO
    if (arr.indexOf(purhost[purhost.length - 2]) >= 0) {
      server.forAnyRequest().thenPassThrough({
        beforeResponse: (response) => {
          //response.setEncoding("utf8");
          // let s = Buffer.from("sandeep");
          // console.log(s.toString("utf-8"));
          console.log("status=", response.statusCode);
          console.log("hostname=", host);
          console.log("cookiies=", cookies);
          // let g = response.body.buffer;
          // console.log(response);
          response.body.getDecodedBuffer().then((data) => {
            console.log(data.toString("utf-8"));
            //console.log("decoded");
          });
          //console.log(g.toString("utf-8"));
          //let newbuffer = bufferfrombufferstring(response.body.buffer.buffer);
          //console.log(newbuffer.toJSON());
          //console.log(response.body.buffer.toString("hex"));
          // let getdata = function (data) {
          //   return data.body.getDecodedBuffer().then((token) => {
          //     return token;
          //   });
        },
      });
    }
    server.forUnmatchedRequest().thenCallback((request) => {
      // This code will run for all requests to Google.com
      return {
        status: 404,
        // Return a JSON response with an incrementing counter:
        json: "404 Not Found",
      };
    });
  });

  await server.start();
})();
