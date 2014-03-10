'use strict';

var util   = require('util');
var yeoman = require('yeoman-generator');

var ViewGenerator = yeoman.generators.NamedBase.extend({
    init: function ()
    {
        console.log('Creating ' + this.name + ' view...');

        var nameParts         = this.name.split('/');
        this.nameOfClass      = nameParts[nameParts.length - 1];
    },

    files: function ()
    {
        // Set up view file
        this.template('view.coffee', 'app/dev/code/views/' + this.name + '.coffee');

        // Set up corresponding template file
        this.template('view.html', 'app/dev/code/templates/' + this.name + '.html')
    }
});

module.exports = ViewGenerator;
