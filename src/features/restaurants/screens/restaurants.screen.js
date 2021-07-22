import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { SafeArea } from "../../../components/utils/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { FadeInView } from "../../../components/animations/fade.animation";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
    const { isLoading, restaurants } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);

    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading size={50} animating={true} color={Colors.blue300} />
                </LoadingContainer>
            )}
            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)} />
            {
                isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />
            }
            <RestaurantList
                data={restaurants}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })
                            }>
                            <Spacer position="bottom" size="large">
                                <FadeInView>
                                    <RestaurantInfoCard restaurant={item} />
                                </FadeInView>
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </SafeArea>
    );
};