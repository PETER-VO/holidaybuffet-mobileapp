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
import { formattedDateAndTime } from '../../../../components/utils/useful-method';

export const ShowUserInformScreen = ({ route }) => {
	const info = route.params.userInform.item;
	const [lastDateCheckIn, setLastDateCheckIn] = useState('--');
	const {
		id: idUser,
		phoneNumber,
		noCheckIn,
		listDateCheckIn,
		customerType,
	} = info.userInfo;
	const {
		expiredDate: expiredDateUsedVoucher,
		id: idUsedVoucher,
		keyword: keywordUsedVoucher,
		titleVoucher: titleVoucherUsedVoucher,
		createdAt: createdAtUsedVoucher,
		customerType: customerTypeUsedVoucher,
	} = info.usedVouchers;

	const existedVouchers = Object.values(info.existedVouchers);

	useEffect(() => {
		if (listDateCheckIn.length !== 0) {
			let lastDate;
			if (listDateCheckIn.length > 0) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 2];
			} else {
				lastDate = listDateCheckIn[0];
			}
			const lastDateStr = formattedDateAndTime(lastDate.seconds);
			setLastDateCheckIn(lastDateStr);
		}
	}, [listDateCheckIn]);

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

					<TitleCustomTradesForm>User Profile</TitleCustomTradesForm>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* Id_User :</TextTitle>
							<TextValue>{idUser}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Phone number :</TextTitle>
							<TextValue>{phoneNumber}</TextValue>
						</Section>
						<Section>
							<TextTitle>* No check-in :</TextTitle>
							<TextValue>{noCheckIn}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Last date check-in :</TextTitle>
							<TextValue>{`${lastDateCheckIn}`}</TextValue>
						</Section>
						<Section>
							<TextTitle>* No feedback :</TextTitle>
							<TextValue>--</TextValue>
						</Section>
						<Section>
							<TextTitle>* No Voucher:</TextTitle>
							<TextValue>--</TextValue>
						</Section>
						<Section>
							<TextTitle>* List of date check-in:</TextTitle>
							<TextValue>--</TextValue>
						</Section>
					</View>
					{/* 
					<TitleCustomTradesForm>Feedbacks</TitleCustomTradesForm>
				
					<Number>1.</Number>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* Name food:</TextTitle>
							<TextValue>Pho Bo</TextValue>
						</Section>
						<Section>
							<TextTitle>* Rating:</TextTitle>
							<TextValue>4</TextValue>
						</Section>
						<Section>
							<TextTitle>* Content:</TextTitle>
							<TextValue>Good!</TextValue>
						</Section>
						<Section>
							<TextTitle>* Created date:</TextTitle>
							<TextValue>20/07/2021</TextValue>
						</Section>
					</View>

					<Number>2.</Number>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* Name food:</TextTitle>
							<TextValue>Bun thit nuong</TextValue>
						</Section>
						<Section>
							<TextTitle>* Rating:</TextTitle>
							<TextValue>3</TextValue>
						</Section>
						<Section>
							<TextTitle>* Content:</TextTitle>
							<TextValue>Good!</TextValue>
						</Section>
						<Section>
							<TextTitle>* Created date:</TextTitle>
							<TextValue>20/07/2021</TextValue>
						</Section>
					</View> */}

					{/* ---- */}
					<TitleCustomTradesForm>Existed Vouchers</TitleCustomTradesForm>
					{existedVouchers.map(
						(
							{
								createdAt,
								customerType,
								expiredDate,
								id,
								keyword,
								titleVoucher,
							},
							idx
						) => (
							<>
								<Number>{idx + 1}.</Number>
								<View style={{ marginLeft: 18, marginBottom: 20 }}>
									<Section>
										<TextTitle>* idVoucher:</TextTitle>
										<TextValue>{id}</TextValue>
									</Section>
									<Section>
										<TextTitle>* Title:</TextTitle>
										<TextValue>{titleVoucher}</TextValue>
									</Section>
									<Section>
										<TextTitle>* Expired date:</TextTitle>
										<TextValue>{expiredDate}</TextValue>
									</Section>
									<Section>
										<TextTitle>* Customer type:</TextTitle>
										<TextValue>{customerType}</TextValue>
									</Section>
									<Section>
										<TextTitle>* Keyword:</TextTitle>
										<TextValue>{keyword}</TextValue>
									</Section>
									<Section>
										<TextTitle>* CreatedAt:</TextTitle>
										<TextValue>{formattedDateAndTime(createdAt)}</TextValue>
									</Section>
								</View>
							</>
						)
					)}

					{/* ---- */}

					<TitleCustomTradesForm>Used Voucher</TitleCustomTradesForm>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* idVoucher :</TextTitle>
							<TextValue>{idUsedVoucher}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Title :</TextTitle>
							<TextValue>{titleVoucherUsedVoucher}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Customer type :</TextTitle>
							<TextValue>{customerTypeUsedVoucher}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Expired date :</TextTitle>
							<TextValue>{expiredDateUsedVoucher}</TextValue>
						</Section>
						<Section>
							<TextTitle>* Keyword:</TextTitle>
							<TextValue>{keywordUsedVoucher}</TextValue>
						</Section>
						<Section>
							<TextTitle>* createdAt:</TextTitle>
							<TextValue>
								{formattedDateAndTime(createdAtUsedVoucher)}
							</TextValue>
						</Section>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	);
};
