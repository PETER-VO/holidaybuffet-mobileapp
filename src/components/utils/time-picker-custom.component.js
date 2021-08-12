import React, { useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

export const TimePickerCustom = ({ getDate }) => {
	const [date, setDate] = useState(new Date('09/08/2021'));
	const [dateFormat, setDateFormat] = useState('');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	// useEffect(() => {
	// 	getDate(dateFormat);
	// }, []);

	useEffect(() => {
		getDate(date);

		const date_ = date.getDate();
		const month_ = date.getMonth() + 1;
		const year_ = date.getFullYear();
		setDateFormat(`${date_}/${month_}/${year_}`);
	}, [date]);

	return (
		<TouchableOpacity onPress={() => setShow(!show)}>
			<View
				style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
			>
				<FontAwesome name='calendar' size={24} color='black' />
				<TextInput
					style={{
						padding: 10,
						height: 50,
						width: 200,
						marginLeft: 18,
						color: 'black',
						backgroundColor: '#F0F1F2',
					}}
					value={dateFormat}
					editable={false}
				/>
			</View>
			{show && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode='date'
					display='default'
					onChange={onChange}
				/>
			)}
		</TouchableOpacity>
	);
};
