import React, { useState } from 'react';
import { useEffect } from 'react';
import { IUser } from '../../pages/Logon';
import getRealm from '../../services/realm';
import { getBalance } from '../../utils/formatString';
import { Item } from '../Card';
import { CloseIcon } from '../MenuButton/styles';
import {
  Container,
  Total,
  Title,
  Out,
  In,
  Close,
  Block,
  Avatar,
  UserName,
  UserView,
  Banner,
  NameView,
  Filters,
  Filter,
  FilterText,
  Content,
  Info,
} from './styles';

interface Props {
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
}

const filters = [
  { key: 'all', text: 'Todos' },
  { key: 'finished', text: 'Finalizados' },
  { key: 'unfinished', text: 'Pendentes' },
];

const Profile: React.FC<Props> = ({ setProfile, user }) => {
  const [cards, setCards] = useState<Item[]>([]);
  const [balance, setBalance] = useState(0);
  const [exit, setExit] = useState(0);
  const [exitCounter, setExitCounter] = useState(0);
  const [entry, setEntry] = useState(0);
  const [entryCounter, setEntryCounter] = useState(0);
  const [estimated, setEstimated] = useState(0);
  const [filter, setFilter] = useState('all');

  function handleFilter(items: Item[], f: string) {
    let finished = f === 'finished' ?? false;
    const cardItems = getBalance(items, f === 'all' ? undefined : finished);
    setEntryCounter(cardItems.entryCounter);
    setEntry(cardItems.entry);
    setExitCounter(cardItems.exitCounter);
    setExit(cardItems.exit);

    const finishedCardItems = getBalance(items, true);
    setBalance(Number(finishedCardItems.total));

    const unfilteredCardItems = getBalance(items);
    setEstimated(Number(unfilteredCardItems.total));
  }

  useEffect(() => {
    async function get() {
      const realm = await getRealm();
      const items = realm.objects<Item>('Item');
      setCards([...items]);
      handleFilter([...items], 'all');
    }
    get();
  }, []);

  const changeFilter = (f: string) => {
    setFilter(f);
    return handleFilter(cards, f);
  };

  return (
    <Container>
      <Close onPress={() => setProfile(false)}>
        <CloseIcon />
      </Close>
      <UserView>
        <Banner />
        <Avatar>
          <UserName>{user.name.charAt(0)}</UserName>
        </Avatar>
        <NameView>
          <Title>{user.name}</Title>
          <Info>Desde {new Date(user.created_at).toDateString()}</Info>
        </NameView>
      </UserView>
      <Content>
        <Title>Saldo</Title>
        <Total>R$ {balance.toFixed(2)}</Total>
        <Title>Estimado</Title>
        <Total>R$ {estimated.toFixed(2)}</Total>

        <Filters>
          {filters.map(f => (
            <Filter
              key={f.key}
              onPress={() => changeFilter(f.key)}
              disabled={filter === f.key}
              r={f.key === filter}
            >
              <FilterText>{f.text}</FilterText>
            </Filter>
          ))}
        </Filters>

        <Block>
          <Title>Entrada</Title>
          <In>
            {entryCounter} {entryCounter === 1 ? 'transação' : 'transações'}
          </In>
          <In>R$ {entry.toFixed(2)}</In>
        </Block>
        <Block r={true}>
          <Title>Saída</Title>
          <Out>
            {exitCounter} {exitCounter === 1 ? 'transação' : 'transações'}
          </Out>
          <Out>R$ {exit.toFixed(2)}</Out>
        </Block>
      </Content>
    </Container>
  );
};

export default Profile;
