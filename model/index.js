'use strict';

var util     = require('util');
var yeoman   = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
    init: function ()
    {
        var nameParts = this.name.split('/');
        this.nameOfClass = nameParts[nameParts.length - 1];
    },

    files: function ()
    {
        this.template('model.coffee', 'app/dev/code/models/' + this.name + '.coffee');
    }
});

module.exports = ModelGenerator;
