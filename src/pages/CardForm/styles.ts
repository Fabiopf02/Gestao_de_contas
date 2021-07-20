import styled from 'styled-components/native';
import { WINDOW_WIDTH } from '../../Constants/App';

interface Btn {
  bg?: string;
  op?: number;
}

export const CardFormContainer = styled.View`
  flex: 1;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const CardFormBlock = styled.View`
  justify-content: center;
  width: ${WINDOW_WIDTH * 0.9}px;
  left: ${WINDOW_WIDTH * 0.05}px;
  min-height: 150px;
  margin: 10px 0px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
  elevation: 1;
`;

export const CardFormBlockTitle = styled.Text`
  font-size: 20px;
  left: 4px;
  color: ${props => props.theme.colors.text}ee;
`;

export const CardFormBlockInput = styled.TextInput.attrs({
  placeholderTextColor: '#ddd',
})`
  width: ${WINDOW_WIDTH * 0.8}px;
  margin-left: ${WINDOW_WIDTH * 0.035}px;
  min-height: 40px;
  text-align-vertical: center;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  letter-spacing: 1px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.text}99;
`;

export const ConfirmBlock = styled.View`
  width: ${WINDOW_WIDTH}px;
  height: 100%;
  background-color: #00000011;
  margin: 10px 0px;
  elevation: 0;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH * 0.9}px;
  height: 55px;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.secundary};
  justify-content: center;
  align-items: center;
  margin: 40px ${WINDOW_WIDTH * 0.05}px;
  elevation: 4;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.background};
`;

interface TypeButton {
  selected: boolean;
}

export const TypeButton = styled.TouchableOpacity<TypeButton>`
  padding: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 2px;
  margin-left: 8px;
  background-color: ${props =>
    props.theme.colors.secundary + (props.selected ? '55' : '12')};
  border-radius: 4px;
`;

export const TypeButtonText = styled.Text`
  font-size: 16px;
  margin-left: 4px;
  color: ${props => props.theme.colors.text};
`;

export const Value = styled(CardFormBlockInput).attrs({
  keyboardType: 'numeric',
  maxLength: 15,
})`
  width: 75%;
  font-size: 22px;
`;

export const M = styled.Text`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 4px;
  width: 20%;
  height: 100%;
  text-align: center;
  text-align-vertical: center;
`;

export const Row = styled.View`
  width: 96%;
  padding-vertical: 3px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const OtherButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<Btn>`
  height: 35px;
  width: 100px;
  padding-horizontal: 4px;
  padding-vertical: 2px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.bg ? props.bg : props.theme.colors.success};
  opacity: ${props => (props.op ? props.op : 1)};
  margin-right: 12px;
`;

export const ButtonText2 = styled(ConfirmButtonText)`
  font-size: 18px;
  color: #fff;
`;

export const AlignRight = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const Input = styled.View`
  margin-vertical: 10px;
  background-color: #00000004;
  border-radius: 4px;
`;
