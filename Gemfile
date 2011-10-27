require 'rbconfig'
HOST_OS = Config::CONFIG['host_os']

source 'http://rubygems.org'

gem 'rails', '3.1.1'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'


# Gems used only for assets and not required
# in production environments by default.
#group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
#end

gem 'rake', '0.8.7'
gem 'execjs'

if HOST_OS =~ /linux/i
  gem 'therubyracer', '>= 0.8.2'
end

gem 'jquery-rails'
