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
        this.template('view.coffee', 'app/dev/code/views/' + this.name + '.coffee');
    }
});

module.exports = ViewGenerator;
