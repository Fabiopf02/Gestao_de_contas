import styled from 'styled-components/native';
import { Value } from '../../components/Card/styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface ISt {
  v: boolean;
}

export const Container = styled.View`
  flex: 1px;
  background-color: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 4px;
  background-color: ${props => props.theme.colors.secundary}20;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.3px;
`;

export const Description = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.text}95;
  letter-spacing: 0.8px;
  margin-vertical: 4px;
`;

export const Items = styled.View`
  width: 98%;
  left: 1%;
  height: auto;
  margin-vertical: 15px;
`;

interface Item {
  type: string;
}
export const Item = styled.View<Item>`
  padding: 3px;
  padding-vertical: 8px;
  margin-vertical: 4px;
  border-radius: 15px;
  background-color: ${props =>
    props.type === 'entry'
      ? props.theme.colors.info
      : props.theme.colors.danger}10;
`;

export const Values = styled.View`
  width: 100%;
  margin-top: 10px;
  padding-vertical: 6px;
  background-color: ${props => props.theme.colors.text}03;
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
  font-weight: 200;
  border-bottom-width: 1px;
  letter-spacing: 0.8px;
  border-bottom-color: ${props => props.theme.colors.info}20;
`;

export const Propertie = styled(ItemTitle)`
  font-weight: bold;
  font-size: 24px;
  border-bottom-width: 0px;
`;

export const ItemValue = styled(Value)`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Texts = styled.View`
  flex-direction: column;
  width: 85%;
`;

export const Status = styled(Description)<ISt>`
  color: ${props =>
    props.v ? props.theme.colors.success : props.theme.colors.warn};
`;

export const ButtonToFinish = styled.TouchableOpacity`
  position: absolute;
  height: 45px;
  width: 40px;
  right: 10px;
  bottom: 5px;
  align-items: center;
  justify-content: center;
`;

export const FinishItem = styled(Icon).attrs({
  name: 'checkmark-outline',
})`
  color: ${props => props.theme.colors.info};
  font-size: 32px;
  background-color: ${props => props.theme.colors.primary}99;
  border-radius: 12px;
  margin: 2px;
`;

export const CloseIcon = styled(Icon).attrs({
  name: 'close-outline',
})`
  color: ${props => props.theme.colors.danger};
  font-size: 34px;
  margin: 2px;
`;
