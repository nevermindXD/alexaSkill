var shell = require('shelljs');

// static files
shell.cp("-R", "src/template/", "dist/template/");