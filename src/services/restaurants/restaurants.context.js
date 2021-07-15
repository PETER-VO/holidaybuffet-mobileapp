import React, { useState, useEffect, useMemo, createContext } from 'react';
import { restaurantsRequest, restaurantsTransform } from './restaurants.service';


export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState(null);

    const retrieveRestaurants = () => {
        setIsLoading(true);
        setTimeout(
            () => {
                restaurantsRequest()
                    .then(restaurantsTransform)
                    .then((results) => {
                        setIsLoading(false);
                        setRestaurants(results);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setError(error);
                    })
            }
            , 2000);
    }

    useEffect(() => {
        retrieveRestaurants();
    }, [])

    return <RestaurantContext.Provider value={{ restaurants, isLoading, error }}>{children}</RestaurantContext.Provider>
}