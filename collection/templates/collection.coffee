# ==============================
# Module: <%= _.capitalize(name) %> collection
# ==============================

define (require) ->
	Backbone = require('backbone')

	class <%= _.capitalize(_.camelize(nameOfClass)) %>Collection extends Backbone.Collection
		initialize: =>
			console.log 'Initializing <%= _.capitalize(_.camelize(nameOfClass)) %> collection...'

	return <%= _.capitalize(_.camelize(nameOfClass)) %>Collection
