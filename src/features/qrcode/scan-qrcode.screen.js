import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const ScanQRCode = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const { incrementCredit } = useContext(AuthenticationContext);
	const [scan, setScan] = useState(true);
	const [uid, setUid] = useState('');

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		if (data) {
			setScan(false);
			setUid(data);
			navigation.navigate('ScanSuccess', { type, data });
		}
	};

	useEffect(() => {
		if (!scan) {
			console.log('OK');
			incrementCredit(uid);
		}
	}, [scan]);

	useEffect(() => {
		setScan(true);
		setUid('');
	}, []);

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
