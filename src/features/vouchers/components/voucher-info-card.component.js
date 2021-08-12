import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { VoucherCard, VoucherCardCover } from './voucher-info-card.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VoucherContext } from '../../../services/voucher/voucher.context';
import { formattedDate } from '../../../components/utils/useful-method';

export const VoucherInfoCard = ({ voucher, onPressRemove }) => {
	const { id, titleVoucher, expiredDate } = voucher.item;
	const { deleteVoucher } = useContext(VoucherContext);

	const alertConfirmRemove = () =>
		Alert.alert('Do you want to remove?', "Don't do that! :(", [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: () => {
					deleteVoucher(id);
					onPressRemove();
				},
			},
		]);

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
						height: 173,
					}}
					source={require('../../../../assets/restaurant.png')}
				/>
				<TouchableOpacity
					style={{
						position: 'absolute',
						top: 10,
						right: 15,
					}}
					onPress={alertConfirmRemove}
				>
					<MaterialCommunityIcons
						name='scissors-cutting'
						size={28}
						color='#CC412F'
					/>
				</TouchableOpacity>

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
				</View>
			</View>
		</VoucherCard>
	);
};
