import React, { useContext } from 'react';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { RestaurantList } from '../../restaurants/components/restaurant-list.styles';

const NoFavouritesArea = styled(SafeArea)`
    align-items: center;
    justify-content: center;
`;
export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ?
        (
            <SafeArea>
                <RestaurantList
                    data={favourites}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })
                                }>
                                <Spacer position="bottom" size="large">
                                    <RestaurantInfoCard restaurant={item} />
                                </Spacer>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.name}
                />
            </SafeArea>
        )
        :
        (
            <NoFavouritesArea>
                <Text center>No favourites yet</Text>
            </NoFavouritesArea>
        );
};