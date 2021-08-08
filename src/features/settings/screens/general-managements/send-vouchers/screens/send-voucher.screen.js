import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { Button, ActivityIndicator, Colors } from 'react-native-paper';
import { CheckBoxCustom } from '../../../../../../components/utils/check-box-custom.component';
import { InputCustom } from '../../../../../../components/utils/input-custom.component';
import { SafeArea } from '../../../../../../components/utils/safe-area.component';
import { TextTradesWindFont } from '../../../../../../components/utils/text-trades-wind-font.component';
import { Ionicons } from '@expo/vector-icons';
import { VoucherContext } from '../../../../../../services/voucher/voucher.context';
import { TimePickerCustom } from '../../../../../../components/utils/time-picker-custom.component';
import { NotificationContext } from '../../../../../../services/notification/notification.context';

export const SendVoucherScreen = () => {
	const [isSelected_1, setIsSelected_1] = useState(false);
	const [isSelected_2, setIsSelected_2] = useState(false);
	const [isSelected_3, setIsSelected_3] = useState(false);
	const [isSelected_4, setIsSelected_4] = useState(false);
	const [customerType, setCustomerType] = useState('');
	const [expiredDate, setExpiredDate] = useState('');
	const [keyword, setKeyword] = useState('');
	const [titleVoucher, setTitleVoucher] = useState('');
	const [titleNotification, setTitleNotification] = useState('');
	const [description, setDescription] = useState('');
	const { sendNotificationTest, sendNotificationForUsers } =
		useContext(NotificationContext);

	const {
		filteredCheckIns,
		filterUsersByCheckInNumber,
		quantity,
		isLoadingQuantity,
		level,
		addVoucherToUserForTesting,
		addVoucherToUsers,
		isLoadingTest,
		isLoadingPublish,
	} = useContext(VoucherContext);

	const onTestSubmit = () => {
		const feedback = {
			titleVoucher,
			customerType,
			keyword,
			expiredDate,
			status: true,
		};
		addVoucherToUserForTesting(feedback);
		sendNotificationTest(titleNotification, description);
	};

	const onPublishSubmit = () => {
		const feedback = {
			titleVoucher,
			customerType,
			keyword,
			expiredDate,
			status: true,
		};
		addVoucherToUsers(feedback);
		sendNotificationForUsers(filteredCheckIns, titleNotification, description);
	};

	useEffect(() => {
		setCustomerType(level);
	}, [level]);

	useEffect(() => {
		if (isSelected_4) {
			filterUsersByCheckInNumber(null, null);
		} else if (isSelected_3) {
			filterUsersByCheckInNumber(11, null);
		} else if (isSelected_2) {
			filterUsersByCheckInNumber(6, 10);
		} else if (isSelected_1) {
			filterUsersByCheckInNumber(1, 5);
		}
	}, [isSelected_1, isSelected_2, isSelected_3, isSelected_4]);

	return (
		<SafeArea style={{ marginTop: 0, padding: 20 }}>
			<ScrollView>
				<Image
					style={{
						height: 80,
						width: 80,
						alignSelf: 'center',
						marginBottom: 10,
					}}
					source={require('.././../../../../../../assets/holidayBuffet.jpg')}
				/>
				{/* Check Box */}
				<TextTradesWindFont title='Number of Check-in :' />
				<View style={{ flexDirection: 'row' }}>
					<CheckBoxCustom
						value={isSelected_1}
						label='1~5'
						onChange={() => setIsSelected_1(!isSelected_1)}
					/>
					<CheckBoxCustom
						value={isSelected_2}
						label='6~10'
						onChange={() => setIsSelected_2(!isSelected_2)}
					/>
					<CheckBoxCustom
						value={isSelected_3}
						label='>= 11'
						onChange={() => setIsSelected_3(!isSelected_3)}
					/>
					<CheckBoxCustom
						value={isSelected_4}
						label='All'
						onChange={() => setIsSelected_4(!isSelected_4)}
					/>
				</View>
				{/* End Check Box */}

				{/* Start Icon */}
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Ionicons name='person' size={24} color='black' />
					{isLoadingQuantity ? (
						<ActivityIndicator animating={true} color={Colors.blue300} />
					) : (
						<Text
							style={{ color: '#CC412F', fontWeight: 'bold', fontSize: 16 }}
						>
							{quantity}
						</Text>
					)}
				</View>
				{/* End Icon */}

				{/* Start Input Vouchers */}
				<TextTradesWindFont title='Vouchers :' />
				<InputCustom
					title='Name'
					value={titleVoucher}
					onChange={setTitleVoucher}
				/>
				<InputCustom title='Keyword' value={keyword} onChange={setKeyword} />
				<InputCustom
					title='Customer Type'
					value={customerType}
					onChange={setCustomerType}
				/>
				<TimePickerCustom getDate={(input) => setExpiredDate(input)} />
				{/* End Input */}

				{/* Start Input Notification*/}
				<TextTradesWindFont title='Notification : ' />
				<InputCustom
					title='Title'
					value={titleNotification}
					onChange={setTitleNotification}
				/>
				<InputCustom
					title='Description'
					value={description}
					onChange={setDescription}
				/>
				{/* End Input */}

				{/* Start Button */}
				<View
					style={{
						flexDirection: 'row',
						marginTop: 10,
						justifyContent: 'space-between',
					}}
				>
					{isLoadingTest ? (
						<ActivityIndicator
							style={{
								flex: 0.48,
							}}
							animating={true}
							color={Colors.blue300}
						/>
					) : (
						<Button
							style={{
								backgroundColor: '#CC412F',
								flex: 0.48,
							}}
							color='white'
							onPress={() => onTestSubmit()}
						>
							Test
						</Button>
					)}
					{isLoadingPublish ? (
						<ActivityIndicator
							style={{
								flex: 0.48,
							}}
							animating={true}
							color={Colors.blue300}
						/>
					) : (
						<Button
							style={{
								backgroundColor: '#CC412F',
								flex: 0.48,
							}}
							color='white'
							onPress={() => onPublishSubmit()}
						>
							Publish
						</Button>
					)}
				</View>
				{/* End Button */}
			</ScrollView>
		</SafeArea>
	);
};
