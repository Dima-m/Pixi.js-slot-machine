const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const app = new (require('express'))();
const port = 4005;

app.use(require('webpack-dev-middleware')(compiler, { 
    noInfo: true, 
    publicPath: config.output.publicPath 
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(port, () => console.info(`App listening on port ${port}`));