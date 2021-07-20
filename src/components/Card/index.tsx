import React, { memo, useState } from 'react';
import { Alert, Animated } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { HEIGHT, MARGIN_H } from '../../Constants/Card';
import { WINDOW_HEIGHT, HEADER_HEIGHT } from '../../Constants/App';

import {
  CardContainer,
  CardBtn,
  CardArea,
  CardTitle,
  CardDescription,
  CardOptions,
  CardContent,
  CardOptionButton,
  CardCreateOptionIcon,
  CardDeleteOptionIcon,
  CardShareOptionIcon,
  CardFooter,
  CardCheckBox,
  Value,
  Up,
  Down,
  DuplIcon,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import { formatString } from '../../utils/formatString';
import { generateUniqueId } from '../../utils/generateUniqueId';

export interface Item {
  _id: string;
  title: string;
  value: number;
  type: string;
  finished: boolean;
}
export interface ICard {
  _id: string;
  title: string;
  description: string;
  created_at: Date;
  deadline: Date | null;
  items: Item[];
}
interface IProps {
  card: ICard;
  index: number;
  scrollY: Animated.Value;
  handleSelection(key: string): void;
}

const Card: React.FC<IProps> = ({ card, index, scrollY, handleSelection }) => {
  const [checked, setChecked] = useState(false);
  const CARD_HEIGHT = HEIGHT + MARGIN_H;
  const position = Animated.subtract(CARD_HEIGHT * index, scrollY);
  const isTop = 0;
  const isBottom = WINDOW_HEIGHT - HEADER_HEIGHT - CARD_HEIGHT;
  const isAppearing = WINDOW_HEIGHT - HEADER_HEIGHT;
  const translateY = Animated.add(
    scrollY,
    scrollY.interpolate({
      inputRange: [0, 0.00001 + index * CARD_HEIGHT],
      outputRange: [0, -index * (CARD_HEIGHT + 0.00001)],
    }),
  );
  const navigation = useNavigation();

  const scale = position.interpolate({
    inputRange: [-CARD_HEIGHT, isTop, isBottom, isAppearing],
    outputRange: [0.5, checked ? 0.85 : 1, checked ? 0.85 : 1, 0.5],
    extrapolateRight: 'clamp',
  });

  const handleChecked = (value: boolean) => {
    setChecked(value);
    handleSelection(card._id);
  };
  const navigateToDetail = () => {
    return navigation.navigate('CardDetail', { id: card._id });
  };
  const deleteItem = async () => {
    return Alert.alert('Remoção de item', 'Deseja continuar?', [
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const realm = await getRealm();
            const items = [...card.items];
            realm.write(() => {
              realm.delete(card);
              items.forEach(i => {
                const item = realm.objectForPrimaryKey('Item', i._id);
                realm.delete(item);
              });
            });
          } catch (err) {
            return console.log(err);
          }
        },
      },
      { text: 'Não', onPress: () => {} },
    ]);
  };
  const copyItem = () => {
    const text = formatString(card);
    Clipboard.setString(text);
    return Alert.alert('Confirmado', `O item '${card.title}' foi copiado!`);
  };
  const editItem = () => {
    return navigation.navigate('CardForm', { _id: card._id });
  };
  const duplicateItem = async () => {
    try {
      const realm = await getRealm();
      const selectedCard = {
        _id: generateUniqueId(),
        title: card.title + ' - Cópia',
        description: card.description,
        deadline: card.deadline,
        items: card.items,
        created_at: new Date(),
      };
      const items = card.items.map(item => {
        return {
          _id: generateUniqueId(),
          title: item.title,
          type: item.type,
          value: item.value,
          finished: item.finished,
        };
      });
      selectedCard.items = items;
      realm.write(() => {
        realm.create('Card', selectedCard);
      });
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <CardContainer checked={checked}>
      {checked === true && (
        <CardCheckBox
          boxType="circle"
          value={checked}
          onValueChange={handleChecked}
        />
      )}
      <CardBtn
        activeOpacity={0.7}
        onPress={navigateToDetail}
        disabled={checked}
        onLongPress={() => handleChecked(true)}
      >
        <CardArea
          checked={checked}
          style={{ transform: [{ translateY }, { scale }] }}
        >
          <CardOptions>
            <CardOptionButton disabled={checked} onPress={editItem}>
              <CardCreateOptionIcon />
            </CardOptionButton>
            <CardOptionButton disabled={checked} onPress={deleteItem}>
              <CardDeleteOptionIcon />
            </CardOptionButton>
            <CardOptionButton disabled={checked} onPress={copyItem}>
              <CardShareOptionIcon />
            </CardOptionButton>
          </CardOptions>
          <CardContent>
            <CardTitle numberOfLines={1}>{card.title}</CardTitle>
            <CardDescription numberOfLines={2}>
              {card.description || '- Sem descrição'}
            </CardDescription>
            <Value>{card.items[0].title}</Value>
            <Value type={card.items[0].type}>
              {card.items[0].type === 'entry'
                ? '+ '
                : card.items[0].type === 'exit'
                ? '- '
                : ''}
              R$ {card.items[0].value.toFixed(2)}
            </Value>
            <CardFooter>
              <CardOptionButton disabled={checked} onPress={duplicateItem}>
                <DuplIcon />
              </CardOptionButton>
              <CardDescription>
                {card.deadline !== null ? '> ' : ''}
                {card.deadline?.toDateString()}
              </CardDescription>
              {card.items.length === 1 && card.items[0].type === 'entry' && (
                <Up />
              )}
              {card.items.length === 1 && card.items[0].type === 'exit' && (
                <Down />
              )}
            </CardFooter>
          </CardContent>
        </CardArea>
      </CardBtn>
    </CardContainer>
  );
};

export default memo(Card);
