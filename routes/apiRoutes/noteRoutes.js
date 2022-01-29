const router = require('express').Router();
const fs = require('fs');
let database = require('../../db/db.json');


router.get('/notes', (req, res) => {
    database = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
    res.json(database);
});

router.post('/notes', (req, res) => {
    // sets id to the next index in array
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 800)
    }

    database.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(database));
    res.json(database);
});

router.delete('/notes/:id', (req, res) => {
    let notesToKeep = [];

    for (var i = 0; i < database.length; i++) {
        if (database[i].id != req.params.id) {
            notesToKeep.push(database[i]);
        }
    }

    database = notesToKeep;

    fs.writeFileSync('db/db.json', JSON.stringify(database), function (err, res) {
        if (err) {
            throw err;
        }
    });

    res.json(database);
});

module.exports = router;