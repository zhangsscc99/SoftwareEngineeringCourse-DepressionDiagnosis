const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const appPort = process.env.PORT || 3000;

app.use('/libs', express.static('bower_components'));
app.use(express.static('public'));
app.use(bodyParser({
    limit: '1mb'
}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/upload', (req, res) => {
    if(req.body.theFile !== "") {
        console.log("received!!");
        let theFileString = req.body.theFile;
        let theFileName = req.body.name;
        theFileString = theFileString.replace(/data:image\/(png|jpeg);base64,/, "");
        console.log('the file string ' + theFileString);
        fs.writeFileSync('images/' + theFileName, theFileString, {
            'encoding': 'base64'
        });
    } else {
        console.log("!!!!!" + req.body.theFile);
    }
    
    res.send('UPLOADED');
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is up and running on ${appPort} port.`);
});

// "scripts": {
//     /*"start": "nodemon server",*/
//     "start": "node server.js",