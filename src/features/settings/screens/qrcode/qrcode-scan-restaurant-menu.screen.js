import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { QRCodeContext } from '../../../../services/qr-code/qr-code.context';

export const ScanQRCodeRestauranMenu = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const { refreshState } = useContext(QRCodeContext);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
		refreshState();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		if (data) {
			Linking.openURL(data);
			navigation.navigate('RestaurantMenu');
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
