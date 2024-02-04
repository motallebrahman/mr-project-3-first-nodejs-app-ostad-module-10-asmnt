const http=require('http');
const fs=require('fs');
const multer = require('multer');

// Using Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('uploadfile');


const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url == '/upload') {
        upload(req, res, (err)=> {
            if (err) {
                return res.end('File upload failed');
            } else {
                res.end('File upload success');
            }
        })
        }
    if (req.method === 'GET' && req.url == '/upload') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="uploadfile" />
        <button type="submit">Upload</button>
      </form>
    `);
    }


    if(req.url=='/'){
    res.end('This is Home Page')
    }

    else if(req.url=='/about'){
        res.end('This is About Page')
    }

    else if(req.url=='/contact'){
        res.end('This is Contact Page')
    }

    else if(req.url=='/file-write'){
        fs.writeFile('demo.txt','Hello world',(err)=>{
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('File Write Failed')
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File Write Success')
            }
        })
    }

});

server.listen(5500);
console.log('Server is Running')

