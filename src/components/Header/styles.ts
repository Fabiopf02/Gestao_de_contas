import styled from 'styled-components/native';
import { HEADER_HEIGHT, WINDOW_WIDTH } from '../../Constants/App';
import Icon from 'react-native-vector-icons/Ionicons';

export const HeaderContainer = styled.View`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.secundary};
`;

export const HeaderTitle = styled.Text`
  font-size: 32px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: bold;
  width: ${WINDOW_WIDTH * 0.7}px;
  color: #eeeeee;
`;

export const HeaderUser = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  position: absolute;
  right: 10px;
  border-radius: 50px;
  background: #eeeeee44;
  justify-content: center;
  align-items: center;
  elevation: 1;
  border-width: 2px;
  border-color: #eeeeee77;
`;

export const HeaderUserText = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export const Back = styled.TouchableOpacity`
  background: transparent;
  position: absolute;
  left: 10px;
  justify-content: center;
`;

export const ArrowLeft = styled(Icon).attrs({
  name: 'chevron-back-outline',
})`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
`;
