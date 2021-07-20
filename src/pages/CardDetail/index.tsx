import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ICard } from '../../components/Card';
import { Down, Up } from '../../components/Card/styles';
import Header from '../../components/Header';
import { RouteProps } from '../../routes';
import getRealm from '../../services/realm';
import { getBalance } from '../../utils/formatString';

import {
  ButtonToFinish,
  CloseIcon,
  Container,
  Content,
  Description,
  FinishItem,
  Item,
  Items,
  ItemTitle,
  ItemValue,
  Propertie,
  Row,
  Status,
  Texts,
  Title,
  Values,
} from './styles';

const labels: { [key: string]: string } = {
  exit: 'Saída',
  entry: 'Entrada',
};

const CardDetail: React.FC = () => {
  const { id } = useRoute<RouteProps<'CardDetail'>>().params;
  const [card, setCard] = useState<ICard & Realm.Object>();

  const updateCard = async (index: number, value: boolean) => {
    const realm = await getRealm();
    realm.write(() => {
      card!.items[index].finished = value;
    });
  };

  useEffect(() => {
    async function getCard() {
      try {
        const realm = await getRealm();
        const res = realm.objectForPrimaryKey<ICard>('Card', id);
        setCard(res);

        realm.addListener('change', Realm => {
          setCard(Realm.objectForPrimaryKey<ICard>('Card', id));
        });

        return () => {
          realm.removeAllListeners();
          realm.close();
        };
      } catch (err) {
        return console.log(err);
      }
    }
    getCard();
  }, [id]);

  return (
    <Container>
      <Header title="Detalhes" back={true} />
      {card !== undefined && (
        <Content>
          <Title>{card.title}</Title>
          <Description>{card.description || '- Sem descrição -'}</Description>
          <Values>
            <Description>
              <ItemTitle>Saldo (estimado): </ItemTitle>
              R$ {getBalance(card.items).total}
            </Description>
            <Description>
              <ItemTitle>Pago: </ItemTitle>
              R${' '}
              {Math.abs(Number(getBalance(card.items, true).total)).toFixed(2)}
            </Description>
            <Description>
              <ItemTitle>Pendente: </ItemTitle>
              R${' '}
              {Math.abs(Number(getBalance(card.items, false).total)).toFixed(2)}
            </Description>
            <Description>
              <ItemTitle>
                Data limite:{' '}
                {card.deadline?.toLocaleDateString() || 'Não definido'}
              </ItemTitle>
            </Description>
          </Values>
          <Items>
            <Propertie>Transações</Propertie>
            {card.items.map((item, index) => (
              <Item key={item._id} type={item.type}>
                <Row>
                  <Texts>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemValue type={item.type}>
                      {item.type === 'entry'
                        ? '+ '
                        : item.type === 'exit'
                        ? '- '
                        : ''}
                      R$ {item.value.toFixed(2)}
                    </ItemValue>
                    <Description>
                      <ItemTitle>Situação: </ItemTitle>
                      <Status v={item.finished}>
                        {item.finished === true ? 'Finalizado' : 'Pendente'}
                      </Status>
                    </Description>
                    <Description>
                      <ItemTitle>Tipo de transação: </ItemTitle>
                      {labels[item.type]}
                    </Description>
                  </Texts>
                  {item.type === 'entry' && <Up />}
                  {item.type === 'exit' && <Down />}
                  {item.finished === false && (
                    <ButtonToFinish onPress={() => updateCard(index, true)}>
                      <FinishItem />
                    </ButtonToFinish>
                  )}
                  {item.finished === true && (
                    <ButtonToFinish onPress={() => updateCard(index, false)}>
                      <CloseIcon />
                    </ButtonToFinish>
                  )}
                </Row>
              </Item>
            ))}
          </Items>
          <Description>
            Criado em{' '}
            {card.created_at.toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            {card.created_at.toLocaleTimeString()}
          </Description>
          <Description>ID do cartão: {card._id}</Description>
        </Content>
      )}
    </Container>
  );
};

export default CardDetail;
