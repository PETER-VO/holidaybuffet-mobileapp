import React, { useEffect, useContext, useState, useCallback } from 'react';
import { TouchableOpacity, RefreshControl, Text, View } from 'react-native';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { VoucherInfoCard } from '../components/voucher-info-card.component';
import { VoucherList } from '../components/voucher-list.styles';
import { VoucherContext } from '../../../services/voucher/voucher.context';

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export const VoucherScreen = ({ navigation }) => {
	const [isRemoveButton, setIsRemoveButton] = useState(false);
	const { getVouchersByUserIdOnPhone, vouchers } = useContext(VoucherContext);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => {
			getVouchersByUserIdOnPhone();
			setRefreshing(false);
		});
	}, []);

	useEffect(() => {
		if (isRemoveButton) {
			getVouchersByUserIdOnPhone();
		}
		setIsRemoveButton(false);
	}, [isRemoveButton]);

	useEffect(() => {
		getVouchersByUserIdOnPhone();
	}, []);

	return (
		<SafeArea>
			{vouchers.length !== 0 ? (
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
										<VoucherInfoCard
											key={item.id}
											voucher={item}
											onPressRemove={() => setIsRemoveButton(!isRemoveButton)}
										/>
									</FadeInView>
								</Spacer>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
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
