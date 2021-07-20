import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import {
  ArrowLeft,
  Back,
  HeaderContainer,
  HeaderTitle,
  HeaderUser,
  HeaderUserText,
} from './styles';

interface IProps {
  title: string;
  name?: string;
  logged?: boolean;
  back?: boolean;
  setProfile?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IProps> = ({
  title,
  logged = false,
  name = '',
  back = false,
  setProfile,
}) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  const goBack = () => {
    return navigation.goBack();
  };

  return (
    <HeaderContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.secundary} />
      {back && (
        <Back onPress={goBack}>
          <ArrowLeft />
        </Back>
      )}
      <HeaderTitle>{title}</HeaderTitle>
      {logged && (
        <HeaderUser onPress={() => setProfile!(true)}>
          <HeaderUserText>{name.charAt(0)}</HeaderUserText>
        </HeaderUser>
      )}
    </HeaderContainer>
  );
};

export default Header;
