import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '../../../../components/typography/text.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import {
	TitleCustomTradesForm,
	Section,
	TextTitle,
	TextValue,
	Number,
} from './components/show-user-inform.styles';
import {
	formattedDateAndTime,
	formattedDate,
} from '../../../../components/utils/useful-method';
import { UsedVoucher } from './components/used-voucher.component';
import { UserInfo } from './components/user-info.component';
import { ExistedVoucher } from './components/existed-voucher.component';
import { FeedbackInfo } from './components/feedback-info.component';

export const ShowUserInformScreen = ({ route }) => {
	const info = route.params.userInform.item;
	const [lastDateCheckIn, setLastDateCheckIn] = useState('--');

	const existedVouchers = Object.values(info.existedVouchers);
	const feedbacks = Object.values(info.feedbacks);

	return (
		<SafeArea style={{ padding: 20, marginTop: 0 }}>
			<ScrollView>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							style={{ width: 80, height: 80 }}
							source={require('../../../../../assets/holidayBuffet.jpg')}
						/>
					</View>
					{/* User Info */}
					{Object.values(info.userInfo).length !== 0 ? (
						<UserInfo
							userInfo={info.userInfo}
							feedbacks={feedbacks}
							existedVouchers={existedVouchers}
						/>
					) : null}

					{/* Feedbacks */}
					<TitleCustomTradesForm>Feedbacks</TitleCustomTradesForm>
					{feedbacks.map((feedback, idx) => (
						<FeedbackInfo feedback={feedback} key={idx} serial={idx} />
					))}

					{/* Existed Vouchers */}
					<TitleCustomTradesForm>Existed Vouchers</TitleCustomTradesForm>
					{existedVouchers.map((voucher, idx) => (
						<ExistedVoucher voucher={voucher} serial={idx} key={idx} />
					))}

					{/* UsedVouchers */}
					{info.status && Object.keys(info.usedVouchers).length !== 0 ? (
						<UsedVoucher usedVouchers={info.usedVouchers} />
					) : null}
				</View>
			</ScrollView>
		</SafeArea>
	);
};
