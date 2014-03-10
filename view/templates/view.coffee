# ==============================
# Module: <%= _.capitalize(name) %> view
# ==============================

define (require) ->

	Backbone  = require('backbone')
	$ 		= require('jquery')
	Rivets 	= require('rivets')

	Template = require('text!templates/<%= name %>')

	class <%= _.capitalize(_.camelize(nameOfClass)) %>View extends Backbone.View
		initialize: =>
			console.log 'Initializing <%= _.capitalize(_.camelize(nameOfClass)) %> view...'

		onClose: =>
			@binding.unbind()

		render: =>
			viewData = {}

			@binding = Rivets.bind(@$el, viewData)

	return <%= _.capitalize(_.camelize(nameOfClass)) %>View
