class Api::BenchesController < ApplicationController
  def index
    render json: Bench.filter_benches(params)
  end

  def create
    @bench = Bench.new(bench_params)
    if @bench.save
      render json: @bench
    else
      render json: @bench.errors.full_messages, status: 422
    end

  end

  private
  def bench_params
    params.require(:bench).permit(:lng, :lat, :description, :seating)
  end
end
