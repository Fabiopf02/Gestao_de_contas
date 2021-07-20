import styled from 'styled-components/native';
import { WINDOW_WIDTH } from '../../Constants/App';

interface B {
  r?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 96%;
  height: 96%;
  position: absolute;
  z-index: 5;
  top: 2%;
  left: 2%;
  background-color: ${props => props.theme.colors.background};
  border-radius: 12px;
  padding: 4px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 30,
  },
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const Info = styled(Title)`
  font-size: 16px;
  font-weight: normal;
`;

export const Total = styled.Text`
  text-align: center;
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
`;

export const Block = styled.View<B>`
  width: 96%;
  margin-left: 3%;
  background-color: ${props =>
    props.r === true
      ? props.theme.colors.danger
      : props.theme.colors.success}09;
  padding-vertical: 15px;
  margin-vertical: 6px;
  border-radius: 10px;
`;

export const Out = styled(Total)`
  font-size: 24px;
  color: ${props => props.theme.colors.danger};
`;

export const In = styled(Out)`
  color: ${props => props.theme.colors.success};
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 8px;
  width: 36px;
  height: 36px;
  background-color: ${props => props.theme.colors.danger}70;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const UserView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  min-height: ${WINDOW_WIDTH * 0.58}px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.secundary}30;
`;

export const Banner = styled.View`
  width: 100%;
  height: ${WINDOW_WIDTH * 0.25}px;
  background-color: ${props => props.theme.colors.secundary};
  position: absolute;
  top: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Avatar = styled.View`
  width: ${WINDOW_WIDTH * 0.4}px;
  height: ${WINDOW_WIDTH * 0.4}px;
  border-width: 3px;
  border-color: ${props => props.theme.colors.background};
  margin: 10px;
  background-color: ${props => props.theme.colors.info};
  border-radius: ${WINDOW_WIDTH * 0.25}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
`;

export const NameView = styled.View`
  position: absolute;
  bottom: 0px;
`;

export const UserName = styled.Text`
  font-size: 80px;
  font-weight: bold;
  color: ${props => props.theme.colors.background};
`;

export const Filters = styled.View`
  padding: 4px;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: 0.2px;
`;

export const Filter = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<B>`
  height: 30px;
  border-radius: 10px;
  background-color: ${props =>
    props.r
      ? props.theme.colors.secundary
      : props.theme.colors.secundary + '99'};
  justify-content: center;
  align-items: center;
  margin: 2px;
  padding: 3px;
`;

export const FilterText = styled.Text`
  font-size: 17px;
  color: ${props => props.theme.colors.text};
`;
