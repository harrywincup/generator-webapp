'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var WebappGenerator = yeoman.generators.Base.extend({
    init: function ()
    {
        this.pkg = require('../package.json');

        this.on('end', function ()
        {
            if (!this.options['skip-install'])
            {
                this.installDependencies();
            }
        });
    },

    askFor: function ()
    {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic Webapp generator.'));

        var prompts = [{
            name: 'appName',
            message: 'What should the app be called?'
        }];

        this.prompt(prompts, function (props)
        {
            this.appName = props.appName;

            done();
        }.bind(this));
    },

    app: function ()
    {
        this.mkdir('app');

        this.mkdir('app/dist');
        this.mkdir('app/dev');

        this.mkdir('app/dev/templates');
        this.mkdir('app/dev/code');
        this.mkdir('app/dev/code/models');
        this.mkdir('app/dev/code/views');
        this.mkdir('app/dev/code/controllers');
        this.mkdir('app/dev/code/routers');

        this.mkdir('app/dev/assets');
        this.mkdir('app/dev/assets/images');
        this.mkdir('app/dev/assets/css');
        this.mkdir('app/dev/assets/fonts');

        this.template('Gruntfile.js', 'Gruntfile.js');

        this.template('index.html', 'app/dev/index.html');
        this.template('css/application.scss', 'app/dev/assets/css/application.scss');

        this.copy('code/', 'app/dev/code');

        this.template('_config.json', 'config.json');
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
    },

    runtime: function()
    {
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
    },

    projectfiles: function ()
    {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = WebappGenerator;
