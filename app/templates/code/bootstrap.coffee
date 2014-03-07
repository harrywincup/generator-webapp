require.config
	paths:
		jquery:             '../dependencies/jquery/dist/jquery.min'
		backbone:           '../dependencies/backbone-amd/backbone-min'

		# App framework

		# Templating
		templates:          '../templates'

require ['app'], (App) -> App.initialize()
