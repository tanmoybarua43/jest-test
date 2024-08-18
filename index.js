const express = require('express');
const app = express();
const https = require('https');

function allTodo() {
    return [{
        id: 1,
        title: 'Do something',
    }, {
        id: 2,
        title: 'Do something else',
    }, {
        id: 3,
        title: 'Do another thing',
    }];
}

app.get('/', (req, res) => {
    res.send({
        date: new Date(),
        message: 'Greetings from the server!',
    });
});

app.get('/todos', (req, res) => {
    res.send(allTodo());
});

app.get('/todos/:id', (req, res) => {
    const id = Math.abs(req.params.id);
    const todo = allTodo().find(todo => todo.id == id);
    res.send(todo);
});

app.get('/joke', (req, res) => {
    https.get('https://api.chucknorris.io/jokes/random', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            try {
                const joke = JSON.parse(data);
                res.send(joke);
            } catch (error) {
                res.status(500).send({ error: 'Failed to parse joke data' });
            }
        });
    }).on('error', (err) => {
        res.status(500).send({ error: 'Failed to fetch joke' });
    });
  });
  

// Export the app without starting the server
module.exports = app;
