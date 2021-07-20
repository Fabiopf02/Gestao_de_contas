import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import {
  LogonButton,
  LogonButtonText,
  LogonContainer,
  LogonForm,
  LogonInput,
  LogonTitle,
} from './styles';
import getRealm from '../../services/realm';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { Platform, TextInput, useColorScheme } from 'react-native';

export interface IUser {
  _id: string;
  name: string;
  os: string;
  theme: string;
  created_at: Date;
}

const Logon: React.FC = () => {
  const [name, setName] = useState('');
  const nameRef = useRef<TextInput>(null);
  const theme = useColorScheme();
  const navigation = useNavigation();

  const handleLogon = async () => {
    if (!name.length) {
      return nameRef.current?.focus();
    }
    const realm = await getRealm();
    const user = {
      _id: generateUniqueId(),
      name,
      os: Platform.OS,
      theme: theme,
      created_at: new Date(),
    };
    realm.write(() => {
      realm.create('User', user);
    });
    realm.close();
    return navigation.navigate('Home', {
      user: {
        name: user.name,
        created_at: user.created_at.getTime(),
        os: user.os,
        theme: user.theme,
        _id: user._id,
      },
    });
  };

  useEffect(() => {
    async function init() {
      const realm = await getRealm();
      const user = realm.objects<IUser>('User');
      if (user.length > 0) {
        const User = user[0];
        navigation.navigate('Home', {
          user: {
            name: User.name,
            _id: User._id,
            created_at: User.created_at.getTime(),
            os: User.os,
          },
        });
      }
      realm.close();
    }
    init();
  }, [navigation]);

  return (
    <LogonContainer>
      <Header title="Acesso" />
      <LogonTitle>
        Bem-vindo(a)! Antes de iniciar preciso de uma informação...
      </LogonTitle>
      <LogonForm>
        <LogonInput
          ref={nameRef}
          placeholder="Seu nome..."
          placeholderTextColor="#999"
          onChangeText={setName}
          maxLength={40}
        />
        <LogonButton onPress={handleLogon}>
          <LogonButtonText>Continuar</LogonButtonText>
        </LogonButton>
      </LogonForm>
    </LogonContainer>
  );
};

export default Logon;
