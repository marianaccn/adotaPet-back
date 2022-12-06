import app from './app';

app.listen(process.env.SERVER_PORT || 5252);
console.log(`Service running on port: ${process.env.SERVER_PORT || 5252}`);
