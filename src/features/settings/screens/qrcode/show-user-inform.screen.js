import React from 'react';
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

export const ShowUserInformScreen = ({ route }) => {
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
							<TextValue>0417503310</TextValue>
						</Section>
						<Section>
							<TextTitle>* Phone number :</TextTitle>
							<TextValue>0417503310</TextValue>
						</Section>
						<Section>
							<TextTitle>* No check-in :</TextTitle>
							<TextValue>2</TextValue>
						</Section>
						<Section>
							<TextTitle>* Last date check-in :</TextTitle>
							<TextValue>20/10/2021</TextValue>
						</Section>
						<Section>
							<TextTitle>* No feedback :</TextTitle>
							<TextValue>2</TextValue>
						</Section>
						<Section>
							<TextTitle>* No Voucher:</TextTitle>
							<TextValue>4</TextValue>
						</Section>
						<Section>
							<TextTitle>* List of date check-in:</TextTitle>
							<TextValue>8</TextValue>
						</Section>
					</View>

					<TitleCustomTradesForm>Feedbacks</TitleCustomTradesForm>
					{/* ---- */}
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
					{/* ---- */}
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
					</View>

					{/* ---- */}
					<TitleCustomTradesForm>Vouchers</TitleCustomTradesForm>
					<Number>1.</Number>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* idVoucher:</TextTitle>
							<TextValue>LmeNXpcTnQlFGRqp14ac</TextValue>
						</Section>
						<Section>
							<TextTitle>* Title:</TextTitle>
							<TextValue>GET OFF 50%</TextValue>
						</Section>
						<Section>
							<TextTitle>* Expired date:</TextTitle>
							<TextValue>20/08/2021</TextValue>
						</Section>
						<Section>
							<TextTitle>* Customer type:</TextTitle>
							<TextValue>Loyal Customer</TextValue>
						</Section>
						<Section>
							<TextTitle>* Keyword:</TextTitle>
							<TextValue>50% OFF</TextValue>
						</Section>
					</View>

					<Number>2.</Number>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* idVoucher:</TextTitle>
							<TextValue>LmeNXpcTnQlFGRqp14ac</TextValue>
						</Section>
						<Section>
							<TextTitle>* Title:</TextTitle>
							<TextValue>GET OFF 50%</TextValue>
						</Section>
						<Section>
							<TextTitle>* Expired date:</TextTitle>
							<TextValue>20/08/2021</TextValue>
						</Section>
						<Section>
							<TextTitle>* Customer type:</TextTitle>
							<TextValue>Loyal Customer</TextValue>
						</Section>
						<Section>
							<TextTitle>* Keyword:</TextTitle>
							<TextValue>50% OFF</TextValue>
						</Section>
					</View>
					{/* ---- */}
					<TitleCustomTradesForm>Used Voucher</TitleCustomTradesForm>
					<View style={{ marginLeft: 18, marginBottom: 20 }}>
						<Section>
							<TextTitle>* idVoucher :</TextTitle>
							<TextValue>LmeNXpcTnQlFGRqp14ac</TextValue>
						</Section>
						<Section>
							<TextTitle>* Title :</TextTitle>
							<TextValue>GET OFF 50%</TextValue>
						</Section>
						<Section>
							<TextTitle>* Customer type :</TextTitle>
							<TextValue>Loyal Customer</TextValue>
						</Section>
						<Section>
							<TextTitle>* Expired date :</TextTitle>
							<TextValue> 20/08/2021</TextValue>
						</Section>
						<Section>
							<TextTitle>* Keyword:</TextTitle>
							<TextValue>50% OFF</TextValue>
						</Section>
						<Section>
							<TextTitle>* List of date check-in:</TextTitle>
							<TextValue>8</TextValue>
						</Section>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	);
};
