import React from 'react';
import { Image, View } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import { Spacer } from '../../../components/spacer/spacer.component';
import {
	RestaurantCard,
	RestaurantCardCover,
	Info,
	Section,
	SectionEnd,
	Rating,
	Icon,
	Address,
} from './restaurant-info-card.styles';
import { Favourite } from '../../../components/favourites/favourite.component';
import { formattedDate } from '../../../components/utils/useful-method';

export const RestaurantInfoCard = ({ restaurant }) => {
	const { imgURL, name, valid } = restaurant;
	const ratingArray = Array.from(new Array(Math.floor(5)));
	return (
		<RestaurantCard elevation={5}>
			<Favourite restaurant={restaurant} />
			<RestaurantCardCover key={name} source={{ uri: imgURL }} />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Info>
					<Text variant='label' style={{ fontSize: 13 }}>
						{name}
					</Text>
					<Section>
						<Rating>
							{ratingArray.map((item, idx) => (
								<SvgXml key={`star-${idx}`} xml={star} width={13} height={13} />
							))}
						</Rating>
					</Section>
					<Address>Valid: {formattedDate(valid.seconds)}</Address>
				</Info>
				<Image
					style={{
						width: 60,
						height: 60,
						marginTop: 20,
					}}
					source={require('../../../../assets/holidayBuffet.jpg')}
				/>
			</View>
		</RestaurantCard>
	);
};
