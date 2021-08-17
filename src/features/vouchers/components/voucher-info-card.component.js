import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { VoucherCard, VoucherCardCover } from './voucher-info-card.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VoucherContext } from '../../../services/voucher/voucher.context';
import { formattedDate } from '../../../components/utils/useful-method';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const VoucherInfoCard = ({ voucher }) => {
	const { id, titleVoucher, expiredDate, price } = voucher.item;
	const { deleteVoucher } = useContext(VoucherContext);
	const { user } = useContext(AuthenticationContext);

	return (
		<VoucherCard
			style={{
				elevation: 0,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderColor: '#20232a',
					borderRadius: 7,
					borderWidth: 2,
					borderStyle: 'dashed',
				}}
			>
				<VoucherCardCover
					style={{
						flex: 0.38,
						height: 150,
					}}
					source={require('../../../../assets/restaurant.png')}
				/>
				<View
					style={{
						position: 'absolute',
						top: 10,
						right: 15,
						borderWidth: 1.5,
						borderStyle: 'dashed',
						borderRadius: 50,
						width: 15,
						height: 15,
					}}
				/>

				<View
					style={{
						flexDirection: 'column',
						flex: 0.62,
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							fontSize: 20,
							marginBottom: 20,
							textTransform: 'uppercase',
						}}
					>
						{titleVoucher}
					</Text>
					<Text variant='label' style={{ fontSize: 12 }}>
						Valid Until: {formattedDate(expiredDate.seconds)}
					</Text>
					<Text variant='label' style={{ fontSize: 12, marginTop: 10 }}>
						Normal: {price}€
					</Text>
				</View>
			</View>
		</VoucherCard>
	);
};
