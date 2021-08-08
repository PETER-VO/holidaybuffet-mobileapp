import React, { useRef, useEffect, useState, useContext } from 'react';
import { Image, TouchableOpacity, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import QRCode from 'react-native-qrcode-svg';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { AuthenticationContext } from '../../../../services/authentication/authentication.context';

const ViewContainer = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const QRCodeScreen = ({ navigation }) => {
	let svg = null;
	const [imgUrl, setImgUrl] = useState('');
	const { user } = useContext(AuthenticationContext);
	const [userId, setUserId] = useState(user.id);

	const getDataURL = () => {
		svg.toDataURL(callback);
	};

	const callback = (dataURL) => {
		setImgUrl(dataURL);
	};

	useEffect(() => {
		getDataURL();
	}, []);

	return (
		<SafeArea>
			<ViewContainer>
				<QRCode value={userId} getRef={(c) => (svg = c)} size={200} />
				{imgUrl ? (
					<Image style={{ width: 350, height: 350 }} source={{ uri: imgUrl }} />
				) : null}
				{user.role === 'admin' ? (
					<Button
						onPress={() => {
							navigation.navigate('ScanQRCode');
						}}
						title='Button'
					/>
				) : null}
			</ViewContainer>
		</SafeArea>
	);
};
