const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/is-auth');
const cors = require('./middleware/cors');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(isAuth);
app.use(cors);

app.post('/upload', (req, res, next) => {
    if (!req.isAuth) {
        const error = new Error('Unauthenticated!');
        error.status = 401;
        throw error;
    }

    if (!req.file) {
        return res.status(200).json({ message: 'No file selected' });
    }

    if (req.body.oldPath) {
        clearImage(req.body.odlPath);
    }

    return res.status(200).json({ message: 'File stored', filePath: req.file.path });
});

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    formatError(error) {
        if (!error.originalError) {
            return error;
        }
        const data = error.originalError.data;
        const code = error.originalError.code || 500;

        const message = error.message || 'An error occurred.';
        return { message, status: code, data };
    }
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eoch3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
).then(() => {
    app.listen(3000);
}).catch((error) => {
    throw error;
});

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, error => console.log(error));
};
