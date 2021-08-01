import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { ScrollView } from 'react-native';

export const Coupon = ({ navigation, route }) => {
	const [breakfastExpanded, setBreakfastExpanded] = useState(false);

	const { restaurant } = route.params;

	return (
		<ScrollView>
			<List.Accordion
				title='Introduction'
				left={(props) => <List.Icon {...props} icon='bread-slice' />}
				expanded={breakfastExpanded}
				onPress={() => setBreakfastExpanded(!breakfastExpanded)}
			>
				<List.Item title='Eggs Benedict' />
				<List.Item title='Classic Breakfast' />
			</List.Accordion>

			<List.Item
				title='Feedback'
				left={(props) => (
					<List.Icon {...props} icon='star' style={{ marginLeft: 10 }} />
				)}
				onPress={() => navigation.navigate('Feedback')}
			></List.Item>
		</ScrollView>
	);
};
