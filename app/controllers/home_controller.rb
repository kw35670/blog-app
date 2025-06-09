class HomeController < ApplicationController
  def index
    @title = 'デイトラ'
  end

  def about
    @title = 'about'
  end
end