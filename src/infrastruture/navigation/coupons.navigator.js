import React from 'react';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { CouponDetailScreen } from '../../features/coupons/screens/coupon-detail.screen';
import { CouponScreen } from '../../features/coupons/screens/coupon.screen';

const CouponStack = createStackNavigator();

export const CouponNavigator = () => {
	return (
		<CouponStack.Navigator
			headerMode='none'
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			<CouponStack.Screen name='Coupons' component={CouponScreen} />
			<CouponStack.Screen name='CouponDetail' component={CouponDetailScreen} />
		</CouponStack.Navigator>
	);
};
