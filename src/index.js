const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const PORT = process.env.PORT || 2001;

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use(express.static(__dirname  + '/public'));
app.use(require('./routes/Router'));

app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});