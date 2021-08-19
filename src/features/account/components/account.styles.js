import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../infrastruture/theme/colors';
import { Text } from '../../../components/typography/text.component';

export const AccountBackground = styled.ImageBackground.attrs({
	source: require('../../../../assets/home_bg.jpg'),
})`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const AccountCover = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
	background-color: rgba(255, 255, 255, 0.7);
	padding: ${(props) => props.theme.space[4]};
	margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
	color: '#46280C',
})`
	padding: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
	width: 300px;
`;

export const Title = styled(Text)`
	font-size: 30px;
	font-family: 'TradeWinds_400Regular';
	color: #46280c;
`;

export const ErrorContainer = styled.View`
	max-width: 300px;
	align-items: center;
	align-self: center;
	margin-top: ${(props) => props.theme.space[2]};
	margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
	width: 100%;
	height: 40%;
	position: absolute;
	top: 30px;
	padding: ${(props) => props.theme.space[2]};autoFocus;
	justify-content: center;
`;

export const ContainerInput = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const CellView = styled.View`
	padding-vertical: 11px;
	width: 40px;
	margin: 5px;
	justify-content: center;
	align-items: center;
	border-bottom-width: 1.5px;
`;

export const CellText = styled.Text`
	text-align: center;
	font-size: 16px;
`;
export const ContainerPhoneInput = styled.View`
	flex-direction: row;
	padding-horizontal: 12px;
	border-radius: 10px;
	background-color: white;
	align-items: center;
	border-bottom-width: 1.5px;
`;

export const PhoneInput = styled(TextInput)`
	margin-left: 5px;
	height: 50px;
	width: 180px;
`;

export const CodeInput = styled(TextInput)`
	width: 0px;
	height: 0px;
`;

export const SubText = styled.Text``;

export const ViewInput = styled.View``;
