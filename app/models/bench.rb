class Bench < ActiveRecord::Base

  validates :lat, :lng, :description, presence: true
  validates :seating, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  def self.in_bounds(bounds)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }
    sw_lat = bounds["southWest"]["lat"]
    ne_lat = bounds["northEast"]["lat"]
    sw_lng = bounds["northEast"]["lng"]
    ne_lng = bounds["southWest"]["lng"]

    Bench.where(
      lat: sw_lat..ne_lat,
      lng: ne_lng..sw_lng
    )
  end
end
