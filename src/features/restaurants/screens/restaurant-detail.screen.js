import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';

import { SafeArea } from '../../../components/utils/safe-area.component';
import { ScrollView } from 'react-native';

export const RestaurantDetailScreen = ({ navigation, route }) => {
	const [breakfastExpanded, setBreakfastExpanded] = useState(false);

	const { restaurant } = route.params;

	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />
			<ScrollView>
				<List.Item
					title='Feedback'
					left={(props) => (
						<List.Icon {...props} icon='star' style={{ marginLeft: 10 }} />
					)}
					onPress={() => navigation.navigate('Feedback')}
				></List.Item>
			</ScrollView>
		</SafeArea>
	);
};
