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
    #{"altitude":-1,"city":"Tokyo","country":"Japan","countryCode":"JP","daylightSaving":78,"iataCode":"NRT","icaoCode":"NRT","latitude":-1,"longitude":-1,"name":"Tokyo (Narita Airport)","origin":true,"timeZoneOffset":-1}
    url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/airports/near/#{params[:lat]}/#{params[:lng]}/100")
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    airports = []
    tmp = {}
    name = ""
    city = ""
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["results"].each do |airport|
      if airport.class == Hash
        airports << {:a => "#{airport["city"]}; #{airport["name"]}"}
      else
        str = case(airport[0])
          when "name"
            then name = airport[1]
          when "city"
            then city = airport[1]
          end
      end
    end  if parsed_json["results"]
    if !name.blank? && !city.blank?
      airports << {:a => "#{city}; #{name};"}
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
    parsed_json["results"].each do |airport|
      airports << ["#{ airport["name"]};#{airport["city"]} (#{airport["iataCode"]})"]
    end if parsed_json["results"]
    logger.info airports
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
    parsed_json["results"].each do |airport|
      airports << ["#{ airport["name"]};#{airport["city"]} (#{airport["iataCode"]})"]
    end if parsed_json["results"]
    
    
    if request.xhr?
      render :json => airports
    end
    airports
  end
    
  def findFlights
    @flights = []
    # @return_flights = []

      depart = params[:d].split('/')
      dDate = "#{depart[2]}#{depart[0]}#{depart[1]}"
      arrive = params[:a].split('/')
      aDate = "#{arrive[2]}#{arrive[0]}#{arrive[1]}"

      str = ((params[:commit].downcase.index("exact"))? "exact" : "flexible")
      url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/flights/#{str}Dates/#{params[:f]}/#{params[:t]}/#{dDate}/#{aDate}/#{params[:p]}/#{params[:c]}/#{params[:i]}")
      logger.info url
      req = Net::HTTP::Get.new(url.path)
      res = Net::HTTP.start(url.host, url.port) do |http|
        http.request(req)
      end
      logger.info res.body
      parsed_json = ActiveSupport::JSON.decode(res.body)
      
      if parsed_json["results"]
        tmp = {}
        parsed_json["results"].each do |flight|
          if flight.class == Hash
            @flights << {:aa => flight["arrivalAirport"], :adt => flight["arrivalDateTime"], :bc => flight["businessClassAvailable"], :c => flight["currency"], :da => flight["departureAirport"], :ddt => flight["departureDateTime"], :flight => flight["flightDesignator"], :stop => flight["numStops"], :price => flight["price"]}
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
        
        @f = []
        @rf = []
        @flights.each do |f|
          if f[:da] == params[:f]
            @f << f
          elsif f[:da] == params[:t]
            @rf << f
          end
        end
      end 

      # return flights
      #o = session[:dest][-4..-2]
      #d = session[:origin][-4..-2]
      #{"f"=>"ADL", "t"=>"SYD", "d"=>"10/25/2011", "a"=>"10/26/2011", "c"=>"0", "i"=>"0", "p"=>"1"}

    #end
    render :json => {:to => @f, :from => @rf}
  end
  
  def reset
    reset_session
    redirect_to "/flight"
  end
end
