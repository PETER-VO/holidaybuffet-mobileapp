import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { CouponInfoCard } from '../components/coupon-info-card.component';
import { CouponList } from '../components/coupon-list.styles';

export const CouponScreen = ({ navigation }) => {
	const coupons = [
		{
			id: 'coupon1',
			userId: 'user1',
			title: 'GET OFF 20%',
			subTitle: '20% OFF',
			expired: '24/08/2021',
			level: 'Loyal Customer',
			active: false,
		},
		{
			id: 'coupon2',
			userId: 'user2',
			title: 'GET OFF 30%',
			subTitle: '30% OFF',
			expired: '15/08/2021',
			level: 'New Customer',
			active: true,
		},
		{
			id: 'coupon3',
			userId: 'user3',
			title: 'GET OFF 40%',
			subTitle: '40% OFF',
			expired: '19/08/2021',
			level: 'New Customer',
			active: true,
		},
	];

	return (
		<SafeArea>
			<CouponList
				data={coupons}
				renderItem={(item) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('CouponDetail', { coupon: item })
							}
						>
							<Spacer position='bottom' size='large'>
								<FadeInView>
									<CouponInfoCard key={item.id} coupon={item} />
								</FadeInView>
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeArea>
	);
};
