import React, { useContext } from 'react';
import { Searchbar } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
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

const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
`;

const LoadingContainer = styled(View)`
    position: absolute;
    top: "50%";
    left: "50%"; 
`;

export const RestaurantsScreen = () => {
    const { isLoading, error, restaurants } = useContext(RestaurantContext);
    return (
        <SafeArea>
            {
                isLoading && (
                    <LoadingContainer>
                        <Loading
                            size={50}
                            animating={true}
                            color={Colors.blue300}
                        />
                    </LoadingContainer>
                )
            }
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            <RestaurantList
                data={restaurants}
                renderItem={({ item }) => {
                    return (<>
                        <Spacer position='bottom' size='large' />
                        <RestaurantInfoCard restaurant={item} />
                    </>)
                }}
                keyExtractor={item => item.name}
            />
        </SafeArea>
    )
};