import React from 'react';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { VoucherDetailScreen } from '../../features/vouchers/screens/ voucher-detail.screen';
import { VoucherScreen } from '../../features/vouchers/screens/voucher.screen';

const VoucherStack = createStackNavigator();

export const VoucherNavigator = () => {
	return (
		<VoucherStack.Navigator
			headerMode='none'
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			<VoucherStack.Screen name='Vouchers' component={VoucherScreen} />
			<VoucherStack.Screen
				name='VoucherDetail'
				component={VoucherDetailScreen}
			/>
		</VoucherStack.Navigator>
	);
};
