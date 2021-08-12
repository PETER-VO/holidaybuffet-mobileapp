import React, { useState, useContext, useEffect } from 'react';
import { Text } from '../../../components/typography/text.component';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { formattedDate } from '../../../components/utils/useful-method';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { ImageQRCode } from '../../../components/utils/imageQRCode.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const VoucherDetailScreen = ({ navigation, route }) => {
	const { voucher } = route.params;
	const { id, expiredDate, customerType, keyword } = voucher.item;
	const { user } = useContext(AuthenticationContext);

	//user_id,voucher_id,category_id (1. check-in, 2. verify voucher)
	let imageQRCode = `${user.id},${id},2`;

	return (
		<SafeArea
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 0,
				paddingLeft: 10,
				paddingRight: 10,
				paddingBottom: 15,
				paddingTop: 45,
			}}
		>
			<View
				style={{
					flex: 1,
					borderRadius: 1,
					borderWidth: 4,
					borderStyle: 'dashed',

					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<Text
					style={{
						fontFamily: 'TradeWinds_400Regular',
						fontSize: 30,
					}}
				>
					Holiday Buffet
				</Text>
				<Image
					style={{
						width: 60,
						height: 60,
					}}
					source={require('../../../../assets/holidayBuffet.jpg')}
				/>
				<Text
					style={{
						color: '#CC412F',
						fontSize: 60,
						fontWeight: 'bold',
						textAlign: 'center',
						textTransform: 'uppercase',
					}}
				>
					{keyword}
				</Text>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: 18,
						marginTop: 20,
						textAlign: 'center',
					}}
				>
					Gift Voucher For {customerType}
				</Text>

				<Text
					style={{
						borderWidth: 2,
						width: '90%',
						textAlign: 'center',
						borderColor: '#E4E6E8',
						marginTop: 20,
					}}
				>
					Valid through {formattedDate(expiredDate.seconds)}
				</Text>
				<View
					style={{
						flex: 0.7,
						marginTop: 20,
						alignItems: 'center',
					}}
				>
					<ImageQRCode value={imageQRCode} />
				</View>
				<Button
					style={{
						backgroundColor: '#CC412F',
						width: 350,
						marginTop: 20,
					}}
					color='white'
					onPress={() => navigation.goBack()}
				>
					Back
				</Button>
			</View>
		</SafeArea>
	);
};
