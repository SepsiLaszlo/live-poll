class ApplicationController < ActionController::Base
  before_action :forbidden, only: %i[update create destroy]

  def forbidden
    head :forbidden
  end
end
