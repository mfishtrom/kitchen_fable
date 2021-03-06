json.restaurant do   
    json.partial! "api/restaurants/restaurant", restaurant: @restaurant
end

@restaurant.reviews.each do |review|
    json.reviews do
        json.set! review.id do
            json.partial! 'api/reviews/review', review: review
        end
    end
end

@restaurant.reviews.each do |review|
    json.users do
        json.set! review.user_id do
            json.extract! review.user, :id, :fname, :lname, :location
        end
    end
end

@restaurant.reservations.each do |reservation|
    json.reservations do
        json.set! reservation.id do
            json.extract! reservation, :id, :user_id, :date, :time
        end
    end
end