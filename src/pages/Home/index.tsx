import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import Realm from 'realm';
import { Container } from './styles';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import MenuButton from '../../components/MenuButton';

import { RouteProps } from '../../routes';
import Profile from '../../components/Profile';
import getRealm from '../../services/realm';
import { ICard } from '../../components/Card';
import { IUser } from '../Logon';

const Home: React.FC = () => {
  const [action, setAction] = useState('');
  const [profile, setProfile] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const { user } = useRoute<RouteProps<'Home'>>().params;

  useEffect(() => {
    if (!action.length) {
      return;
    }
    const actions: { [key: string]: () => Promise<void> } = {
      delete: async function () {
        const realm = await getRealm();
        if (!selection.length) {
          return;
        }
        realm.write(() => {
          selection.map(id => {
            const card = realm.objectForPrimaryKey<ICard>('Card', id);
            const items = [...card!.items];
            realm.delete(card);
            items.map(i => {
              const item = realm.objectForPrimaryKey('Item', i._id);
              realm.delete(item);
            });
          });
        });
        setSelection([]);
      },
      theme: async function () {
        const realm = await getRealm();
        const userObject = realm.objects<IUser>('User');
        realm.write(() => {
          const theme = userObject[0].theme === 'dark' ? 'light' : 'dark';
          userObject[0].theme = theme;
          realm.create('User', userObject[0], Realm.UpdateMode.Modified);
        });
        return;
      },
    };
    async function handleAction() {
      const act = actions[action];
      if (!act) {
        return;
      }
      await act();
      setAction('');
    }
    handleAction();
  }, [action, selection, user.theme]);

  const handleSelection = (key: string) => {
    const exists = selection.indexOf(key);
    if (exists !== -1) {
      setSelection(selection.filter(value => value !== key));
    } else {
      setSelection([...selection, key]);
    }
  };

  return (
    <Container>
      {profile === true && <Profile {...{ user, setProfile }} />}

      <Header
        title="Gestão de contas"
        name={user.name}
        {...{ setProfile }}
        logged={true}
      />
      <CardList handleSelection={handleSelection} />
      <MenuButton {...{ setAction, selection }} />
    </Container>
  );
};

export default Home;
