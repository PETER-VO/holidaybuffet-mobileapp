import React from 'react';
import { Searchbar } from "react-native-paper";
import { StatusBar, FlatList, SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
    padding: ${props => props.theme.space[3]};
`

const RestaurantListContainer = styled(View)`
    flex: 1;
    padding: ${props => props.theme.space[3]};
    background-color: ${props => props.theme.colors.bg.primary};
`;

export const RestaurantsScreen = () => (
    <SafeArea>
        <SearchContainer>
            <Searchbar />
        </SearchContainer>
        <FlatList
            data={[{ name: 1 }, { name: 2 }]}
            renderItem={() => <>
                <Spacer position='bottom' size='large' />
                <RestaurantInfoCard />
            </>}
            keyExtractor={item => item.name}
            contentContainerStyle={{ padding: 16 }}
        />
    </SafeArea>
);