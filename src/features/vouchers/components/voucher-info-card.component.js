import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { VoucherCard, VoucherCardCover } from './voucher-info-card.styles';

export const VoucherInfoCard = ({ voucher }) => {
	const { id, userId, title, expired, level } = voucher.item;
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
				<View
					style={{
						flexDirection: 'column',
						flex: 0.62,
						justifyContent: 'space-between',
					}}
				>
					<Text style={{ fontSize: 20, marginBottom: 20 }}>{title}</Text>
					<Text variant='label' style={{ fontSize: 12 }}>
						Valid Until: {expired}
					</Text>
				</View>
			</View>
		</VoucherCard>
	);
};
