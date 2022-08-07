const express = require("express");
const path = require("path");
//const notesData = require('./db/db.json');
const fs = require("fs");
const PORT = 3000;

const app = express();

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//GET method to retrive data from .json file
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/style", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"))
);

app.get("/script", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    res.send(data);
  });
});

//POST method to save data on json file
app.post("/api/notes", (req, res) => {
  let content = [];
      let noteData = JSON.parse(fs.readFileSync("./db/db.json"))
     /////

console.log(noteData)      
       noteData.push(JSON.stringify(req.body));
console.log(noteData)
       console.log(JSON.stringify(req.body))
       fs.writeFileSync("./db/db.json",JSON.stringify(noteData));
      }
  );


// //DELETE method to delete a particular data from .json file
// app.delete('/api/notes/', (req, res) => {
//   fs.readFile('./db/db.json', 'utf-8',(err,data)=>{
//    if(err){
//      console.error(err);
//      return;
//    }
//    console.log(data)
//    res.send(data);
//   });
//   });

// app.get('/api/ts', (req, res) => res.json(notesData));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
