// import React, { useState, useEffect, useContext } from 'react';
// import {
// 	View,
// 	StyleSheet,
// 	TouchableOpacity,
// 	Image,
// 	TextInput,
// 	ScrollView,
// 	Alert,
// } from 'react-native';
// import { Text } from '../../../components/typography/text.component';
// import { SafeArea } from '../../../components/utils/safe-area.component';
// import { AntDesign } from '@expo/vector-icons';
// import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
// import { AuthenticationContext } from '../../../services/authentication/authentication.context';

// export const RestaurantFeedback = ({ navigation }) => {
// 	const [defaultRating, setDefaultRating] = useState(2);
// 	const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
// 	const [rating, setRating] = useState('');
// 	const [content, setContent] = useState('');
// 	const { addFeedback } = useContext(RestaurantsContext);
// 	const { user } = useContext(AuthenticationContext);

// 	const starImgFilled =
// 		'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
// 	const starImgCorner =
// 		'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

// 	useEffect(() => {
// 		setRating(defaultRating);
// 	}, [defaultRating]);

// 	const CustomRatingBar = () => {
// 		return (
// 			<View style={styles.customRatingBarStyle}>
// 				{maxRating.map((item, key) => {
// 					return (
// 						<TouchableOpacity
// 							activeOpacity={0.7}
// 							key={item}
// 							onPress={() => setDefaultRating(item)}
// 						>
// 							<Image
// 								style={styles.starImgStyle}
// 								source={
// 									item <= defaultRating
// 										? { uri: starImgFilled }
// 										: { uri: starImgCorner }
// 								}
// 							/>
// 						</TouchableOpacity>
// 					);
// 				})}
// 			</View>
// 		);
// 	};

// 	const onSubmit = (e) => {
// 		const feedbackObj = {
// 			rating,
// 			content,
// 		};

// 		addFeedback(user, feedbackObj);
// 		Alert.alert('Thank you for your feedback!', '<3<3<3');
// 		navigation.navigate('Restaurants');
// 	};

// 	return (
// 		<SafeArea style={styles.container}>
// 			<ScrollView>
// 				<View style={styles.containerView}>
// 					<TouchableOpacity
// 						style={styles.iconGoBack}
// 						onPress={() => navigation.goBack()}
// 					>
// 						<AntDesign name='back' size={30} color='black' />
// 					</TouchableOpacity>
// 					<Text variant='subject'>Please Rate Us</Text>
// 					<Text variant='subSubject'> How did we do?</Text>
// 					<View style={styles.starFeedbackWrapper}>
// 						<CustomRatingBar />
// 						<Text style={styles.textStyle}>
// 							{defaultRating + ' / ' + maxRating.length}
// 						</Text>
// 					</View>
// 					<View style={styles.line} />
// 					<Text variant='subSubject'> Care to share about it?</Text>
// 					<TextInput
// 						style={styles.TextInputStyleClass}
// 						underlineColorAndroid='transparent'
// 						placeholderTextColor={'#9E9E9E'}
// 						numberOfLines={12}
// 						multiline={true}
// 						onChangeText={(e) => setContent(e)}
// 					/>
// 					<TouchableOpacity
// 						activeOpacity={0.7}
// 						style={styles.buttonStyle}
// 						onPress={(e) => onSubmit(e)}
// 					>
// 						<Text style={styles.textBtn}>PUBLISH FEEDBACK</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</ScrollView>
// 		</SafeArea>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: 0,
// 	},
// 	containerView: {
// 		marginLeft: 15,
// 		marginRight: 15,
// 	},
// 	iconGoBack: {
// 		marginTop: 60,
// 	},
// 	textStyle: {
// 		fontSize: 15,
// 		marginLeft: 20,
// 	},
// 	customRatingBarStyle: {
// 		flexDirection: 'row',
// 		marginTop: 0,
// 	},
// 	line: {
// 		marginTop: 30,
// 		borderBottomWidth: 1.5,
// 		borderBottomColor: '#9E9E9E',
// 	},
// 	starFeedbackWrapper: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 	},
// 	starImgStyle: {
// 		width: 40,
// 		height: 40,
// 		resizeMode: 'cover',
// 	},
// 	buttonStyle: {
// 		display: 'flex',
// 		height: 50,
// 		borderRadius: 5,
// 		justifyContent: 'center',
// 		alignItems: 'center',

// 		backgroundColor: '#2AC062',
// 		shadowColor: '#2AC062',
// 		shadowOpacity: 0.4,
// 		shadowOffset: { height: 10, width: 0 },
// 		shadowRadius: 20,
// 		marginTop: 50,
// 	},
// 	textBtn: {
// 		fontSize: 16,
// 		textTransform: 'uppercase',
// 		color: '#FFFFFF',
// 	},
// 	TextInputStyleClass: {
// 		height: 180,
// 		borderWidth: 1.5,
// 		borderColor: '#9E9E9E',
// 		borderRadius: 20,
// 		backgroundColor: '#FFFFFF',
// 		textAlignVertical: 'top',
// 		padding: 15,
// 	},
// });
