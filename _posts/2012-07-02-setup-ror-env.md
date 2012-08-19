---
layout: post
title: Setting up a Ruby on Rails Development Environment on Ubuntu 12.04
---

Yesterday I had to set up a linux machine twice to develop somethings with ruby and rails and in the first time I did it I got some issues with dependencies and stuff, so I decided to make this post to register the steps here :)
I hope this become useful for other people too.

First, we need to install some things for ruby and development in general, this includes git, build tools, native libs for the dbs gem, and a nice text editor:

`$ sudo apt-get -y install build-essential zlib1g-dev libssl-dev libreadline-dev libyaml-dev libcurl4-openssl-dev curl git-core vim python-software-properties libpq-dev libsqlite3-dev libmysql-ruby libmysqlclient-dev`

Then we install rvm to manage our rubies with the latest version of ruby:

`$ curl -L https://get.rvm.io | bash -s stable --ruby`

RVM has a nice command called requirements that you can run to install any missing dependencies to run it properly:

`$ rvm requirements`

After all this steps you should have the latest version of ruby and rubygems installed and working, and you can install rails:

`$ gem install rails`

That's all, after that you can choose the db you want to use to start your project and install it with apt-get, enjoy your hacking!
