import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { ICard } from '../Card';

export const List = styled(
  Animated.FlatList as new () => Animated.FlatList<ICard>,
).attrs({
  contentContainerStyled: {
    paddingBottom: 70,
  },
  bounces: false,
  scrollEventThrottle: 16,
})`
  flex: 1;
`;

export const Message = styled.Text`
  font-size: 32px;
  font-weight: bold;
  padding: 3px;
  color: ${props => props.theme.colors.danger};
  text-align: center;
  flex: 1;
  text-align-vertical: center;
`;
