class Bench < ActiveRecord::Base

  validates :lat, :lng, :description, presence: true

  def self.in_bounds(bounds)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }
    # where("orders_count = ? AND locked = ?", params[:orders], false)
    sw_lat = bounds["southWest"]["lat"]
    ne_lat = bounds["northEast"]["lat"]
    sw_lng = bounds["northEast"]["lng"]
    ne_lng = bounds["southWest"]["lng"]
    Bench.where("lat >= #{sw_lat} AND lat <= #{ne_lat} AND lng >= #{ne_lng} AND lng <= #{sw_lng}")

  end
end
