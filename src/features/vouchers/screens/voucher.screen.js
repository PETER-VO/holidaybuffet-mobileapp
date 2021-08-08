import React, { useEffect, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { VoucherInfoCard } from '../components/voucher-info-card.component';
import { VoucherList } from '../components/voucher-list.styles';
import { VoucherContext } from '../../../services/voucher/voucher.context';

export const VoucherScreen = ({ navigation }) => {
	const { vouchers } = useContext(VoucherContext);

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
