const express = require('express');
const redis = require('redis');

const app = express();
const subscriber = redis.createClient({ host: '127.0.0.1', port: 6379, no_ready_check: true, auth_pass: '' });
const testObjects = [];

subscriber.on('message', (channel, message) => {
    testObjects.push(JSON.parse(message));
});

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.status(200).json({ client: `Subscriber: ${PORT}` });
});

app.get('/subscribe', (req, res) => {
    subscriber.subscribe('testPublish');
    res.status(200).json({ testObjects });
});

app.listen(PORT, () => {
    console.log(`Subscriber listening on port ${PORT}`);
});