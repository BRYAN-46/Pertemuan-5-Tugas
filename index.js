const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 8081; // kamu bisa ubah ke 8081, 1234, dll

const server = http.createServer((req, res) => {
  // jika file yang diminta adalah root "/", tampilkan index.html
  let filePath = req.url === "/" ? "./index.html" : `.${req.url}`;

  // ambil ekstensi file
  const ext = path.extname(filePath);
  let contentType = "text/html";

  // tentukan tipe konten (agar gambar muncul)
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "application/javascript";
      break;
  }

  // baca file dari sistem
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - File Not Found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
