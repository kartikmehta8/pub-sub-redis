const express = require('express');
const redis = require('redis');

const app = express();
const publisher = redis.createClient({ host: '127.0.0.1', port: 6379, no_ready_check: true, auth_pass: ''});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.status(200).json({ client: `Publisher: ${PORT}` });
});

app.get('/publish', (req, res) => {
    const randomNumber = Math.round(Math.random() * 1000);
    const testObject = {
        id: randomNumber,
        message: `Message of ID ${randomNumber}`
    }

    publisher.publish('testPublish', JSON.stringify(testObject));
    res.status(200).json({ message: 'Message published' });
});

app.listen(PORT, () => {
    console.log(`Publisher listening on port ${PORT}`);
});