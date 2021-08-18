import React, { useEffect, useContext, useState, useCallback } from 'react';
import { TouchableOpacity, RefreshControl, Text, View } from 'react-native';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { VoucherInfoCard } from '../components/voucher-info-card.component';
import { VoucherList } from '../components/voucher-list.styles';
import { VoucherContext } from '../../../services/voucher/voucher.context';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { VoucherInfoCardUnable } from '../components/voucher-info-card-unable.component';

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export const VoucherScreen = ({ navigation }) => {
	const { getVouchersByUserIdOnPhone, vouchers, isLoadingVoucher } =
		useContext(VoucherContext);
	const { user } = useContext(AuthenticationContext);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => {
			getVouchersByUserIdOnPhone();
			setRefreshing(false);
		});
	}, []);

	return (
		<SafeArea>
			{isLoadingVoucher ? (
				<View style={{ justifyContent: 'center' }}>
					<ActivityIndicator animating={true} color={Colors.blue300} />
				</View>
			) : vouchers.length !== 0 ? (
				<>
					<VoucherList
						data={vouchers}
						renderItem={(item) => {
							return (
								<Spacer position='bottom' size='large'>
									<FadeInView>
										{item['item'].hasOwnProperty('checkIn') &&
										item['item'].checkIn > user.noCheckIn ? (
											<VoucherInfoCardUnable
												key={item.id}
												voucher={item}
												userCheckIn={user.noCheckIn}
											/>
										) : (
											<TouchableOpacity
												onPress={() =>
													navigation.navigate('VoucherDetail', {
														voucher: item,
													})
												}
											>
												<VoucherInfoCard key={item.id} voucher={item} />
											</TouchableOpacity>
										)}
									</FadeInView>
								</Spacer>
							);
						}}
						keyExtractor={(item) => item.id}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					/>
				</>
			) : (
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<Text style={{ fontSize: 16 }}>You don't have any voucher!</Text>
				</View>
			)}
		</SafeArea>
	);
};
