import React, { useState } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { CheckBoxCustom } from '../../../../../../components/utils/check-box-custom.component';
import { InputCustom } from '../../../../../../components/utils/input-custom.component';
import { SafeArea } from '../../../../../../components/utils/safe-area.component';
import { TextTradesWindFont } from '../../../../../../components/utils/text-trades-wind-font.component';
import { Ionicons } from '@expo/vector-icons';

export const SendVoucherScreen = () => {
	const [isSelected_1, setIsSelected_1] = useState(false);
	const [isSelected_2, setIsSelected_2] = useState(false);
	const [isSelected_3, setIsSelected_3] = useState(false);
	const [isSelected_4, setIsSelected_4] = useState(false);

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
					<Text style={{ color: '#CC412F', fontWeight: 'bold', fontSize: 16 }}>
						0
					</Text>
				</View>
				{/* End Icon */}

				{/* Start Input Vouchers */}
				<TextTradesWindFont title='Vouchers : ' />
				<InputCustom title='Name' />
				<InputCustom title='Keyword' />
				<InputCustom title='Customer Type' />
				{/* End Input */}

				{/* Start Input Notification*/}
				<TextTradesWindFont title='Notification : ' />
				<InputCustom title='Title' />
				<InputCustom title='Description' />
				{/* End Input */}

				{/* Start Button */}
				<View
					style={{
						flexDirection: 'row',
						marginTop: 10,
						justifyContent: 'space-between',
					}}
				>
					<Button
						style={{
							backgroundColor: '#CC412F',
							flex: 0.48,
						}}
						color='white'
						onPress={() => console.log('pressme')}
					>
						Test
					</Button>
					<Button
						style={{
							backgroundColor: '#CC412F',
							flex: 0.48,
						}}
						color='white'
						onPress={() => console.log('pressme')}
					>
						Publish
					</Button>
				</View>
				{/* End Button */}
			</ScrollView>
		</SafeArea>
	);
};
