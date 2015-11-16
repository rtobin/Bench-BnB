class Bench < ActiveRecord::Base

  validates :lat, :lng, :description, presence: true
  validates :seating, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  def self.filter_benches(params)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }
    sw_lat = params["bounds"]["southWest"]["lat"]
    ne_lat = params["bounds"]["northEast"]["lat"]
    sw_lng = params["bounds"]["northEast"]["lng"]
    ne_lng = params["bounds"]["southWest"]["lng"]
    min_seating = params["minSeating"].to_i
    max_seating = params["maxSeating"].to_i
    max_seating = max_seating < 1 ? 100000 : max_seating
    Bench.where(
      lat: sw_lat..ne_lat,
      lng: ne_lng..sw_lng,
      seating: min_seating...max_seating
    )
  end
end
