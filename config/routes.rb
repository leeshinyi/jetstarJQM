JetstarJQM::Application.routes.draw do
  root :to => "flight#index"
  
  resources :flight do
    collection do
      get :findClosestAirports, :findOriginAirports, :findDestinationAirports, :calendar, :search, :reset, :findFlights
    end
  end
  
end
