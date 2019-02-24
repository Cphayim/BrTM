import os

DEVELOPMENT = 'development'
PRODUCTION = 'production'

IS_DEV = os.getenv('FLASK_ENV') == DEVELOPMENT
