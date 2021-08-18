import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import styled from 'styled-components/native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { SafeArea } from '../../../components/utils/safe-area.component';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';

import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { RestaurantList } from '../components/restaurant-list.styles';
import { FadeInView } from '../../../components/animations/fade.animation';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;
const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
	const { isLoading, marketings } = useContext(RestaurantsContext);

	const navigateToMenuLink = () => {
		Linking.openURL('http://google.com');
	};

	return (
		<SafeArea>
			{isLoading && (
				<LoadingContainer>
					<Loading size={50} animating={true} color={Colors.blue300} />
				</LoadingContainer>
			)}
			<RestaurantList
				data={marketings}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => console.log('OK')}>
							<Spacer position='bottom' size='large'>
								<FadeInView>
									<RestaurantInfoCard restaurant={item} />
								</FadeInView>
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.name}
			/>

			<View
				style={{
					zIndex: 1,
					position: 'absolute',
					bottom: 0,
					right: 0,
					marginBottom: 50,
					marginRight: 20,
				}}
			>
				<TouchableOpacity onPress={navigateToMenuLink}>
					<View
						style={{
							backgroundColor: 'tomato',
							height: 70,
							width: 70,
							borderRadius: 50,
							elevation: 6,
						}}
					>
						<Text
							style={{
								bottom: 10,
								left: 15,
								alignSelf: 'center',
								position: 'absolute',
								color: 'white',
								fontWeight: 'bold',
								fontSize: 12,
							}}
						>
							MENU
						</Text>
						<MaterialIcons
							style={{
								top: 12,
								left: 18,
								alignSelf: 'center',
								position: 'absolute',
								fontWeight: 'bold',
							}}
							name='menu-book'
							size={30}
							color='white'
						/>
					</View>
				</TouchableOpacity>
			</View>
		</SafeArea>
	);
};
