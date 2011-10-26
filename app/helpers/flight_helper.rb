module FlightHelper
  def parseDate(date)
    unless date.blank?
      d = date.split('T')
      d = d[0].split('-')
      date = Date.new(d[0].to_i, d[1].to_i, d[2].to_i)
    end
  end
  
  def parseTime(time)
    unless time.blank?
      t = time.split('T')
      time = d[1][11..15]
    end
  end
end
