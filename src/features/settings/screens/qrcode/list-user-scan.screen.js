import React, { useEffect, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { UserInfoCard } from './components/user-info-card.component';
import { UserList } from './components/list-user-scan.styles';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { FadeInView } from '../../../../components/animations/fade.animation';

export const ListUserScanScreen = ({ navigation }) => {
	// const [isRemoveButton, setIsRemoveButton] = useState(false);
	// const { getVouchersByUserIdOnPhone, vouchers } = useContext(VoucherContext);

	// useEffect(() => {
	// 	if (isRemoveButton) {
	// 		getVouchersByUserIdOnPhone();
	// 	}
	// 	setIsRemoveButton(false);
	// }, [isRemoveButton]);

	return (
		<SafeArea>
			<UserList
				data={[1, 2]}
				renderItem={(item) => {
					return (
						<TouchableOpacity
							onPress={() => navigation.navigate('ShowUserInform')}
						>
							<Spacer position='bottom' size='large'>
								<FadeInView>
									<UserInfoCard
										key={item.id}
										// voucher={item}
										// onPressRemove={() => setIsRemoveButton(!isRemoveButton)}
									/>
								</FadeInView>
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeArea>
	);
};
