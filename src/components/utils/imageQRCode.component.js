import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export const ImageQRCode = ({ value, ...otherProps }) => {
	let svg = null;
	const [imgUrl, setImgUrl] = useState('');

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
		<>
			<QRCode value={value} getRef={(c) => (svg = c)} size={200} />
			{imgUrl ? (
				<Image
					style={{ width: 350, height: 350 }}
					source={{ uri: imgUrl }}
					{...otherProps}
				/>
			) : null}
		</>
	);
};
