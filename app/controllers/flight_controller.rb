require 'net/http'
class FlightController < ApplicationController
  def index
    @origins = findOriginAirports
    @destination = findDestinationAirports
  end
  
  def findClosestAirports  #{"altitude":-1,"city":"Tokyo","country":"Japan","countryCode":"JP","daylightSaving":78,"iataCode":"NRT","icaoCode":"NRT","latitude":-1,"longitude":-1,"name":"Tokyo (Narita Airport)","origin":true,"timeZoneOffset":-1}
    url = URI.parse("http://110.232.117.57:8080/JetstarWebServices/services/airports/near/#{params[:lat]}/#{params[:lng]}/100")
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) do |http|
      http.request(req)
    end
    airports = []
    tmp = {}
    name = ""
    city = ""
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["results"].each do |airport|
      if airport.class == Hash
        airports << {:a => "#{airport["city"]}; #{airport["name"]}", :acode => "#{airport["iataCode"]}"}
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
    res = Net::HTTP.start(url.host, url.port) do |http|
      http.request(req)
    end
    parsed_json = ActiveSupport::JSON.decode(res.body)
    parsed_json["results"].each do |airport|
      airports << ["#{ airport["name"]};#{airport["city"]} (#{airport["iataCode"]})"]
    end if parsed_json["results"]
    
    airports
  end
  
  def findDestinationAirports
    airports = []
    o = ""
    if !params[:o].blank?
      o = params[:o]
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
    
    render :json => airports if request.xhr?
    airports
  end
    
  def findFlights
    @flights = []
    @return_flights = []

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
    parsed_json = ActiveSupport::JSON.decode(res.body)
    
    if parsed_json["results"]
      parsed_json["results"].size.times do |i|
        tmp = {}
        flights = []
        parsed_json["results"][i].each do |flight|
          if flight.class == Hash
            flights << {:aa => flight["arrivalAirport"], :adt => flight["arrivalDateTime"], :bc => flight["businessClassAvailable"], :c => flight["currency"], :da => flight["departureAirport"], :ddt => flight["departureDateTime"], :flight => flight["flightDesignator"], :stop => flight["numStops"], :price => flight["price"]}
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
          flights << tmp
        end
        
        flights.each do |f|
          if f[:aa] == params[:f]  #departure
            @flights << f
          elsif f[:aa] == params[:t]
            @return_flights << f
          end
        end
      end
    end 

    #{"f"=>"ADL", "t"=>"SYD", "d"=>"10/25/2011", "a"=>"10/26/2011", "c"=>"0", "i"=>"0", "p"=>"1"}
    @flights = @flights.sort_by { |flight| flight[:ddt] }
    @return_flights = @return_flights.sort_by { |flight| flight[:ddt] }
    render :json => {:to => @flights, :from => @return_flights}
  end
  
  # def reset
  #   reset_session
  #   redirect_to "/flight"
  # end
end
