# ==============================
# Module: <%= _.capitalize(name) %> view
# ==============================

define (require) ->
	Backbone = require('backbone')

	class <%= _.capitalize(_.camelize(nameOfClass)) %>View extends Backbone.View
		initialize: =>
			console.log 'Initializing <%= _.capitalize(_.camelize(nameOfClass)) %> view...'

		render: =>

	return <%= _.capitalize(_.camelize(nameOfClass)) %>View
