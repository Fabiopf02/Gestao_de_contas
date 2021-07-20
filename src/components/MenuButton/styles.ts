import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated } from 'react-native';
import { BUTTON_SIZE } from '../../Constants/App';

export const MainButtonContainer = styled.View`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 3;
`;

export const ButtonContainer = styled(Animated.View)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: ${BUTTON_SIZE}px;
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

export const OptionButton = styled.TouchableOpacity`
  width: ${BUTTON_SIZE - 10}px;
  height: ${BUTTON_SIZE - 10}px;
  border-radius: 50px;
  background-color: ${props => props.theme.colors.secundary};
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

export const MainButton = styled(OptionButton)`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
`;

export const MenuIcon = styled(Ionicons).attrs({
  name: 'menu-outline',
})`
  color: ${props => props.theme.colors.background};
  font-size: 36px;
`;

export const AddIcon = styled(Ionicons).attrs({
  name: 'add-outline',
  size: 26,
})`
  color: ${props => props.theme.colors.background};
`;

export const CloseIcon = styled(Ionicons).attrs({
  name: 'close-outline',
  size: 36,
})`
  color: ${props => props.theme.colors.danger}99;
`;

export const TrashIcon = styled(Ionicons).attrs({
  name: 'trash-outline',
  size: 26,
})`
  color: ${props => props.theme.colors.danger};
`;

export const SunIcon = styled(Ionicons).attrs({
  name: 'sunny-outline',
  size: 26,
})`
  color: ${props => props.theme.colors.warn};
`;
export const MoonIcon = styled(Ionicons).attrs({
  name: 'moon-outline',
  size: 26,
})`
  color: ${props => props.theme.colors.text};
`;
