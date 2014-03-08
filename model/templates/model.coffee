# ==============================
# Module: <%= _.capitalize(name) %> model
# ==============================

define (require) ->
	Backbone = require('backbone')

	class <%= _.capitalize(_.camelize(nameOfClass)) %>Model extends Backbone.Model
		initialize: =>
			console.log 'Initializing <%= _.capitalize(_.camelize(nameOfClass)) %> model...'

	return <%= _.capitalize(_.camelize(nameOfClass)) %>Model
