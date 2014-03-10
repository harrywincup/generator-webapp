# ==============================
# Module: Application bootstrap
# Project: <%= appName %>
# ==============================

require.config
	paths:
		jquery:             '/dependencies/jquery/dist/jquery.min'
		backbone:           '/dependencies/backbone-amd/backbone-min'

		# RequireJS plugins
		text: 				'/dependencies/requirejs-text/text'

		# App framework

		# Templating
		rivets: 			'/dependencies/rivets/dist/rivets.min'
		templates:          '/templates'

require ['app'], (App) -> new App()
