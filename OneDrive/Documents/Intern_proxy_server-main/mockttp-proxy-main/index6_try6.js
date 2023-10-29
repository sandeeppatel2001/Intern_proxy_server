const { debug } = require("console");
const { readFile } = require("fs");
const { beforeEach } = require("mocha");
const path = require("path");
const { stringify } = require("querystring");
(async () => {
  const express = require("express");
  const app = express();
  const path = require("path");
  const foruse = path.join(__dirname, "./404page/");
  app.use(express.static(foruse));
  var StringDecoder = require("string_decoder").StringDecoder;
  const mockttp = require("mockttp");
  const request = require("request");
  var decoder = new StringDecoder("utf8");
  // Create a proxy server with a self-signed HTTPS CA certificate:
  // const https = await mockttp.generateCACertificate();
  const server = mockttp.getLocal({
    https: {
      keyPath: "./keys/a4.key",
      certPath: "./certificats/a4.pem",
    },
    debug: false,
  });

  const arr = ["github"];

  // await server.forPost().thenCallback(
  //   (req7) => (
  //     {
  //       statusCode: 200,
  //       // json: await req7.body.getJson(),
  //     },
  //     console.log(req7)
  //   )
  // );
  //await server.forPost().thenReply(200, "post wildcard");
  //await server.forGet("/abc").thenReply(200, "a response");
  server.on("request-initiated", (req, res) => {
    let host = req.headers.host;
    let cookies = req.headers.cookie;
    let purhost = host.split(".");
    //console.log(req);
    let url = req.url;

    //console.log(req);
    // console.log(purhost[purhost.length - 2]);
    //console.log(res);
    // app.post(url, (req2, res2) => {
    //   // console.log(req2);
    //   // console.log(res2);
    // });
    // request({ url: url, json: false }, (error, response) => {
    //   console.log(response.body);
    // });
    let a = arr.indexOf(purhost[purhost.length - 2]);
    //console.log(a);
    if (arr.indexOf(purhost[purhost.length - 2]) >= 0) {
      //console.log("out");
      //console.log(host);
      //console.log(cookies);

      server.forPost().thenCallback((req7) => {
        //console.log(req7);
        console.log(`53542354523452354252353232`, req7.body);
        req7.body
          .getFormData()
          .then((re) => {
            console.log(
              `$&##$#$#$#$#$#$#%%^%$#$^%$&%$$$%$#%$#%$#$&#$%#%$#%$#&$&$&$#$`,
              re
            );
          })
          .catch((ee) => {
            console.log(ee, `SSSSSSSSS643628364328642662`);
          });
      });

      server.forAnyRequest().thenPassThrough({
        beforeResponse: (response) => {
          //response.setEncoding("utf8");
          // let s = Buffer.from("sandeep");
          // console.log(s.toString("utf-8"));
          // console.log("this is s");
          // let g = response.body.buffer;
          //console.log(response);
          response.body.getDecodedBuffer().then((data) => {
            //console.log(data.toString("utf-8"));
            //console.log("decoded");
            //data.filter;
          });
          // response.body.getFormData().then((data2) => {
          //   console.log(data2);
          // });
          //console.log(g.toString("utf-8"));
          //let newbuffer = bufferfrombufferstring(response.body.buffer.buffer);
          //console.log(newbuffer.toJSON());
          //console.log(response.body.buffer.toString("hex"));
          // let getdata = function (data) {
          //   return data.body.getDecodedBuffer().then((token) => {
          //     return token;
          //   });
          // };
          // var textChunk = decoder.write(response);
          // console.log(textChunk);
          // let fuc = getdata(response);
          // //console.log((fuc));
          // fuc.then(function (result) {
          //   // console.log(result); // "Some User token"
          //   // console.log(1);
          // });
        },
      });
    }

    server.forUnmatchedRequest().thenCallback((request) => {
      // This code will run for all requests to Google.com
      return {
        status: 200,
        // Return a JSON response with an incrementing counter:
        json: "4004 Not Found",
      };
    });
  });

  await server.start();
})();
