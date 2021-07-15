import { mocks } from './mock';
import camelize from 'camelize';

export const restaurantsRequest = (location = "43.653225,-79.383186") => {
    return new Promise((resolve, reject) => {
        const mock = mocks[location];
        if (!mock) {
            reject('not found!');
        }

        resolve(mock)
    });
};

export const restaurantTransform = ({ results = [] }) => {
    const mappedResults = results.map(restaurant => {
        return {
            ...restaurant,
            isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
        }
    });

    return camelize(mappedResults);
}

restaurantsRequest()
    .then(restaurantTransform)
    .then(transformedResponse => console.log(transformedResponse))
    .catch(error => console.log('error'));

