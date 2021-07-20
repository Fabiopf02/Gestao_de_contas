import React, { useRef, useState, useEffect } from 'react';
import getRealm from '../../services/realm';
import { Animated } from 'react-native';

import Card, { ICard } from '../Card';
import { List, Message } from './styles';

interface IProps {
  handleSelection(key: string): void;
}

const CardList: React.FC<IProps> = ({ handleSelection }) => {
  const [cards, setCards] = useState<ICard[]>();
  const y = useRef(new Animated.Value(0)).current;

  const scrollHandler = Animated.event(
    [{ nativeEvent: { contentOffset: { y } } }],
    {
      useNativeDriver: true,
    },
  );

  useEffect(() => {
    async function getCards() {
      try {
        const realm = await getRealm();
        const cardList = realm
          .objects<ICard>('Card')
          .sorted('created_at', true);
        setCards([...cardList]);

        realm.addListener('change', Realm => {
          const changed = Realm.objects<ICard>('Card').sorted(
            'created_at',
            true,
          );
          setCards([...changed]);
        });

        return () => {
          realm.removeAllListeners();
          realm.close();
        };
      } catch (err) {
        return console.log(err);
      }
    }
    getCards();
  }, []);

  return (
    <>
      {cards !== undefined && cards!.length === 0 && (
        <Message>Nada foi encontrado na base de dados!</Message>
      )}
      {cards !== undefined && cards!.length > 0 && (
        <List
          data={cards}
          onScroll={scrollHandler}
          keyExtractor={item => String(item._id)}
          renderItem={({ item, index }) => (
            <Card card={item} {...{ index, handleSelection }} scrollY={y} />
          )}
        />
      )}
    </>
  );
};

export default CardList;
