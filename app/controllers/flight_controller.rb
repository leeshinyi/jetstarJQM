require 'net/http'
class FlightController < ApplicationController
  def index
    @origins = findOriginAirports
    @destination = findDestinationAirports
  end

  def create
    if params[:from] && !params[:from].blank?
      session[:origin] = params[:from] 
      session[:dest] = nil
    end
    session[:dest] = params[:to] if params[:to]  && !params[:to].blank?
    session[:depart] = params[:depart] if params[:depart]
    session[:return] = params[:return] if params[:return]
    
    if params[:commit]
      
      session[:adults] = params[:adults]
      session[:child] = params[:child]
      session[:infants] = params[:infants]
      
      findFlights
    else
      session[:flight] = nil
      session[:return_flights] = nil
    end
    if request.xml_http_request?
      render :nothing => true, :status => 200
      #render :action => 'index#flightIndex'
      #redirect_to  "/#flightIndex"
      #redirect_to flight_index_path ,:anchor => "flightIndex"
    else
      #redirect_to flight_index_path ,:anchor => "flightIndex"
    end
  end

  def search
    @origins = findOriginAirports
    @destination = findDestinationAirports
  end
  
  def findClosestAirports
    url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/airports/near/#{params[:lat]}/#{params[:lng]}/100")
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    airports = []
    tmp = {}
    name = ""
    iataCode = ""
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["wrapper"]["results"].each do |airport|
      if airport.class == Hash
        airports << {:a => "#{airport["iataCode"]}; #{(airport["name"].index("("))?  airport["name"][0..airport["name"].index("(")-1] : airport["name"]}"}
      else
        str = case(airport[0])
          when "name"
            then name = airport[1]
          when "iataCode"
            then iataCode = airport[1]
          end
      end
    end  if parsed_json["wrapper"]["results"]
    if !name.blank? && !iataCode.blank?
      airports << {:a => "#{iataCode};#{ (name.index("("))?  name[0..name.index("(")-1] : name};"}
    end

    render :json => airports
  end
  
  def findOriginAirports
    airports = []
    url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/airports/origin/")
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["wrapper"]["results"].each do |airport|
      airports << ["#{ (airport["name"].index("("))?  airport["name"][0..airport["name"].index("(")-1] : airport["name"]} (#{airport["iataCode"]})"]
    end if parsed_json["wrapper"]["results"]
    
    airports
  end
  
  def findDestinationAirports
    airports = []
    o = ""
    if !params[:o].blank?
      o = params[:o][-4..-2]
    else
      o = "VIZ"
    end
    url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/airports/destination/#{o.upcase}")
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) do |http|
      http.request(req)
    end
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["wrapper"]["results"].each do |airport|
      airports << ["#{ (airport["name"].index("("))?  airport["name"][0..airport["name"].index("(")-1] : airport["name"]} (#{airport["iataCode"]})"]
    end if parsed_json["wrapper"]["results"]
    
    airports
    if request.xhr?
      render :json => airports
    end
  end
    
  def findFlights
    @flights = []
    @return_flights = []

      date = params[:d].split('/')
      rDate = "#{date[2]}#{date[0]}#{date[1]}"

      str = ((params[:commit].downcase.index("exact"))? "exact" : "flexible")
      url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/flights/#{str}Dates/#{params[:f]}/#{params[:t]}/#{rDate}/#{params[:p]}/#{params[:c]}/#{params[:i]}")
      logger.info url
      req = Net::HTTP::Get.new(url.path)
      res = Net::HTTP.start(url.host, url.port) do |http|
        http.request(req)
      end
      logger.info res.body
      parsed_json = ActiveSupport::JSON.decode(res.body)
      
      if parsed_json["wrapper"]["results"]
        tmp = {}
        parsed_json["wrapper"]["results"].each do |flight|
          if flight.class == Hash
            @flights << {:aa => flight["arrivalAirport"], :adt => flight["arrivalDateTime"].upcase, :bc => flight["businessClassAvailable"], :c => flight["currency"], :da => flight["departureAirport"], :ddt => flight["departureDateTime"].upcase, :flight => flight["flightDesignator"], :stop => flight["numStops"], :price => flight["price"]}
          else
            str = case(flight[0])
              when "arrivalAirport"
                then :aa
              when "arrivalDateTime"
                then :adt
              when "businessClassAvailable"
                then :bc
              when "currency"
                then :c
              when "departureAirport"
                then :da
              when "departureDateTime"
                then :ddt
              when "flightDesignator"
                then :flight
              when "numStops"
                then :stop
              when "price"
                then :price
              end
            tmp.store(str, flight[1]) if str
          end
        end
        if !tmp.empty?
          @flights << tmp 
        end
      end 

      # return flights
      #o = session[:dest][-4..-2]
      #d = session[:origin][-4..-2]
      #{"f"=>"ADL", "t"=>"SYD", "d"=>"10/25/2011", "a"=>"10/26/2011", "c"=>"0", "i"=>"0", "p"=>"1"}
      date = params[:a].split('/')
      rDate = "#{date[2]}#{date[0]}#{date[1]}"

      str = ((params[:commit].downcase.index("exact"))? "exact" : "flexible")

      url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/flights/#{str}Dates/#{params[:t]}/#{params[:f]}/#{rDate}/#{params[:p]}/#{params[:c]}/#{params[:i]}")
      logger.info url      
      req = Net::HTTP::Get.new(url.path)
      res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
      }
      logger.info res.body
      parsed_json = ActiveSupport::JSON.decode(res.body)

      if parsed_json["wrapper"]["results"]
        tmp = {} 
        parsed_json["wrapper"]["results"].each do |flight|
          if flight.class == Hash
            @return_flights << {:aa => flight["arrivalAirport"], :adt => flight["arrivalDateTime"].upcase, :bc => flight["businessClassAvailable"], :c => flight["currency"], :da => flight["departureAirport"], :ddt => flight["departureDateTime"].upcase, :flight => flight["flightDesignator"], :stop => flight["numStops"], :price => flight["price"]}
          else
            str = case(flight[0])
              when "arrivalAirport"
                then :aa
              when "arrivalDateTime"
                then :adt
              when "businessClassAvailable"
                then :bc
              when "currency"
                then :c
              when "departureAirport"
                then :da
              when "departureDateTime"
                then :ddt
              when "flightDesignator"
                then :flight
              when "numStops"
                then :stop
              when "price"
                then :price
              end
              
              tmp.store(str, flight[1]) if str
          end

        end 
        if !tmp.empty?
          @return_flights << tmp 
        end

      end

    #end
    render :json => {:to => @flights, :from => @return_flights}
  end
  
  def reset
    reset_session
    redirect_to "/flight"
  end
end
