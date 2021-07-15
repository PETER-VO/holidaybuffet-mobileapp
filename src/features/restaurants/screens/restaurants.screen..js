import React, { useContext } from 'react';
import { Searchbar } from "react-native-paper";
import { StatusBar, FlatList, SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { restaurantsRequest } from '../../../services/restaurants/restaurants.service';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
    padding: ${props => props.theme.space[3]};
`

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16
    }
})``;

export const RestaurantsScreen = () => {
    const restaurantContext = useContext(RestaurantContext);

    return (
        <SafeArea>
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            <RestaurantList
                data={restaurantContext.restaurants}
                renderItem={() => <>
                    <Spacer position='bottom' size='large' />
                    <RestaurantInfoCard />
                </>}
                keyExtractor={item => item.name}
            />
        </SafeArea>
    )
};