const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Working !");
})

app.get('/files', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('notes', {files});
    })
    
})

app.post('/files/create', (req, res) => {
    let {title, content} = req.body;
    fs.writeFile(`./files/${title.split(' ').join('')}.txt`, content, (err) => {
        res.redirect('/files');
    })
})

app.get('/files/:fileName', (req, res) => {
    let {fileName} = req.params;
    fs.readFile(`./files/${fileName}`, 'utf-8', (err, data) => {
        res.render('file', {fileName, content: data});
    })
})

app.get('/files/edit/:fileName', (req, res) => {
    let {fileName} = req.params;
    
    res.render("edit", {fileName});
})


app.post('/files/edit', (req, res) => {
    let {previousName, newName} = req.body;
    
    fs.rename(`./files/${previousName}`, `./files/${newName}`, (err) => {
        res.redirect('/files');
    })
    
})





app.listen(3000, () => {
    console.log('Server started on port 3000');
});
