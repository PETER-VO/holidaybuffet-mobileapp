import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { VoucherInfoCard } from '../components/voucher-info-card.component';
import { VoucherList } from '../components/voucher-list.styles';

export const VoucherScreen = ({ navigation }) => {
	const vouchers = [
		{
			id: 'voucher1',
			userId: 'user1',
			title: 'GET OFF 20%',
			subTitle: '20% OFF',
			expired: '24/08/2021',
			level: 'Loyal Customer',
			active: false,
		},
		{
			id: 'voucher2',
			userId: 'user2',
			title: 'GET OFF 30%',
			subTitle: '30% OFF',
			expired: '15/08/2021',
			level: 'New Customer',
			active: true,
		},
		{
			id: 'voucher3',
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
			<VoucherList
				data={vouchers}
				renderItem={(item) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('VoucherDetail', { voucher: item })
							}
						>
							<Spacer position='bottom' size='large'>
								<FadeInView>
									<VoucherInfoCard key={item.id} voucher={item} />
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
