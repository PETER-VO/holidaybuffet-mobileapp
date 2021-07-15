import React, { useState, createContext, useEffect } from 'react';

import { locationRequest, locationTransform } from './location.service';

export const LocationRequest = createContext();

export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("san francisco");
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword.toLowerCase());
        locationRequest(keyword).then(locationTransform)
            .then(result => {
                setIsLoading(false);
                setLocation(result);
                console.log(result);
            }).catch(error => {
                setIsLoading(false);
                setError(error);
            })
    }

    return <LocationRequest.Provider
        value={{
            isLoading,
            error,
            location,
            search: onSearch,
            keyword
        }}
    >{children}</LocationRequest.Provider>
}