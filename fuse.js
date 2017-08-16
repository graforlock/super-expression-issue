const argv = require('yargs').argv;
const { EnvPlugin, FuseBox, UglifyJSPlugin } = require('fuse-box');

const production = argv.env === 'production';
const entry = argv.bundle || 'index';

const fuse = FuseBox.init({
    homeDir: '',
    output: '$name.js',
    plugins: [
        EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
        production && UglifyJSPlugin()
    ]
});

const bundle = fuse.bundle(`bundle`)
    .target('browser');

bundle
    .instructions(`> index.js`);   

fuse.run();