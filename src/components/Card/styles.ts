import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated } from 'react-native';

import {
  WIDTH,
  HEIGHT,
  MARGIN_H,
  OPTIONS_WIDTH,
  CONTENT_WIDTH,
} from '../../Constants/Card';

import { WINDOW_WIDTH } from '../../Constants/App';

interface IProps {
  checked: boolean;
}
interface IValue {
  type?: string;
}

export const CardContainer = styled.View<IProps>`
  width: ${WINDOW_WIDTH}px;
  margin: 2px 0px;
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.checked ? props.theme.colors.danger + '30' : 'transparent'};
`;

export const CardArea = styled(Animated.View)<IProps>`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  background-color: ${props => props.theme.colors.info}15;
  margin: ${MARGIN_H}px 3%;
  border-radius: 15px;
  opacity: ${props => (props.checked ? 0.5 : 1)}
  flex-direction: row;
  justify-content: space-between;
`;

export const CardBtn = styled.TouchableOpacity``;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  letter-spacing: 1px;
  border-bottom-color: ${props => props.theme.colors.text}44;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const CardDescription = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text}99;
  letter-spacing: 1px;
`;

export const CardOptions = styled.View`
  height: 100%;
  width: ${OPTIONS_WIDTH}px;
  background-color: ${props => props.theme.colors.info}20;
  align-items: center;
  justify-content: space-evenly;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 5px;
`;

export const CardContent = styled.View`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  padding: 4px;
`;

export const CardDeleteOptionIcon = styled(Icon).attrs({
  name: 'trash-outline',
  size: 32,
})`
  align-items: center;
  color: ${props => props.theme.colors.danger};
`;

export const CardCreateOptionIcon = styled(Icon).attrs({
  name: 'create-outline',
  size: 26,
})`
  align-items: center;
  color: ${props => props.theme.colors.success};
`;

export const CardShareOptionIcon = styled(Icon).attrs({
  name: 'copy-outline',
  size: 26,
})`
  align-items: center;
  color: ${props => props.theme.colors.text};
`;

export const Value = styled.Text<IValue>`
  font-size: 18px;
  color: ${props =>
    props.type !== undefined
      ? props.type === 'entry'
        ? props.theme.colors.success
        : props.theme.colors.danger
      : props.theme.colors.text};
`;

export const CardOptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: #00009909;
  border-radius: 10px;
  padding: 2px;
`;

export const CardFooter = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.colors.primary}22;
  flex-direction: row;
  position: absolute;
  align-items: center;
  bottom: 2px;
  left: 2px;
  border-radius: 10px;
`;

export const CardCheckBox = styled(CheckBox).attrs({
  tintColors: { true: '#7159c1', false: '#7159' },
})``;

export const Up = styled(Icon).attrs({
  name: 'caret-up-outline',
})`
  color: ${props => props.theme.colors.success};
  font-size: 45px;
  position: absolute;
  right: 5px;
`;

export const Down = styled(Icon).attrs({
  name: 'caret-down-outline',
})`
  color: ${props => props.theme.colors.danger};
  font-size: 45px;
  position: absolute;
  right: 5px;
`;

export const DuplIcon = styled(Icon).attrs({
  name: 'duplicate-outline',
})`
  font-size: 24px;
  margin-horizontal: 10px;
  color: ${props => props.theme.colors.info};
`;
