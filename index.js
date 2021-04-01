const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');


const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
console.log(PORT)

const db = mysql.createPool({
    "host": "us-cdbr-east-03.cleardb.com",
    "user": "bd0d6da412ce1b",
    "password": "6f9964d1",
    "database": "heroku_332464384e18aee"
});

app.use(cors());
app.use(express.json());

app.get('/hi', function(req, res) {
    res.send('Hello World!');
  });
app.post('/app/insert', (req, res) => {
    
    try {

        const bodyJson = req.body.saveTable;
        console.log(req.body);
        bodyJson.forEach(item => {
            registration = item.registration;
            lastActivity = item.lastActivity;

            registration = registration.split('.').reverse().join('.');
            lastActivity = lastActivity.split('.').reverse().join('.');

            console.log(registration, lastActivity);

            const sqlInsert = 'insert into abdate (reg_date, last_date) value (?, ?)';
            db.query(sqlInsert, [registration, lastActivity]);
            res.status(200).json({ message: 'Успех'})
        });

    } catch {
        res.status(500).json({ message: 'Что-то пошло не так, пропробуйте еще раз'});
    }
});

app.listen(PORT);