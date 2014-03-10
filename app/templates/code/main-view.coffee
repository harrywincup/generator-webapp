# ==============================
# Module: Main application view
# Project: <%= appName %>
# ==============================

define (require) ->

	$ 		= require('jquery')
	Backbone = require('backbone')
	Rivets	= require('rivets')

	class AppView extends Backbone.View
		initialize: =>
			console.log 'AppView::initialize()'

			@enhanceBaseViews()

		enhanceBaseViews: =>
			Backbone.View::closeView = ->
				# Optional onClose method allows subclassed views to do their own cleanup
				@onClose?()

				# Convenience container for subclassed views to store their own subviews
				# that we can automatically close here
				if @subViews? then subView.closeView?() for subView in @subViews

				# If there's a Rivets binding, automatically unbind it for the view
				if @binding then @binding.unbind?()

				# This calls @stopListening() to automatically unbind any events assigned using @listenTo
				# See http://documentcloud.github.com/backbone/#View-remove
				@remove()

		render: =>


	return AppView
