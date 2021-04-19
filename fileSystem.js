const http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
const port = 5000;

if (!fs.existsSync('./result')) {
  fs.mkdir('./result', (err) => {
    if (err){
      console.log(err)
    }
  }) 
  console.log('Folder created')
} else{
  console.log('File already Exist')
}


const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'contentType': 'text/json' });
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(json => {
        const stringedUrl = JSON.stringify(json)
        fs.writeFile('result/posts.json', stringedUrl, (err) => {
        if (err) {
            console.log('There was an Error Writing to file')
        }
        else{
        console.log("File created and written successfully")
        }
        });
    });  
    res.end('<h1>NodeJs - File System<h1>');
  }).listen(port, () => {
    console.log(`Server created successfully on port ${port}`);
  });