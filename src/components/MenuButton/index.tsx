import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonContainer,
  OptionButton,
  MenuIcon,
  AddIcon,
  CloseIcon,
  TrashIcon,
  SunIcon,
  MainButtonContainer,
  MainButton,
  MoonIcon,
} from './styles';
import { useNavigation } from '@react-navigation/native';

import { Animated, Easing } from 'react-native';

import { BUTTON_SIZE } from '../../Constants/App';
import getRealm from '../../services/realm';
import { IUser } from '../../pages/Logon';

interface IProps {
  selection: string[];
  setAction: React.Dispatch<React.SetStateAction<string>>;
}

const MenuButton: React.FC<IProps> = ({ selection, setAction }) => {
  const [clicked, setClicked] = useState(false);
  const [dark, setDark] = useState(false);
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;
  const navigateToFormCard = () => {
    return navigation.navigate('CardForm');
  };

  const translateFct = (AnimatedValue: Animated.Value, value: number) =>
    Animated.timing(AnimatedValue, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

  const opacity = translateY.interpolate({
    inputRange: [-60, 0],
    outputRange: [1, 0],
  });

  const animations = () => {
    if (!clicked) {
      translateFct(translateY, -(BUTTON_SIZE + 6));
      translateFct(translateY2, -(BUTTON_SIZE * 2 + 2));
      translateFct(translateY3, -(BUTTON_SIZE * 3));
    } else {
      translateFct(translateY, BUTTON_SIZE + 6);
      translateFct(translateY2, BUTTON_SIZE * 2 + 2);
      translateFct(translateY3, BUTTON_SIZE * 3);
    }
    setClicked(!clicked);
  };

  const handleAction = (value: string) => {
    setAction(value);
  };

  useEffect(() => {
    function change() {
      if (selection.length > 0 && !clicked) {
        return animations();
      } else if (selection.length === 0 && clicked === true) {
        return animations();
      }
    }
    change();
  }, [selection]);

  useEffect(() => {
    async function getTheme() {
      const realm = await getRealm();
      const user = realm.objects<IUser>('User');
      setDark(user[0].theme === 'dark' ?? false);
      // return realm.close();
    }
    getTheme();
  }, []);

  return (
    <>
      <MainButtonContainer>
        <MainButton onPress={animations}>
          {!clicked && <MenuIcon />}
          {clicked && <CloseIcon />}
        </MainButton>
      </MainButtonContainer>
      <ButtonContainer style={{ transform: [{ translateY }], opacity }}>
        <OptionButton
          disabled={selection.length > 0}
          onPress={navigateToFormCard}
        >
          <AddIcon />
        </OptionButton>
      </ButtonContainer>
      <ButtonContainer
        style={{ transform: [{ translateY: translateY2 }], opacity }}
      >
        <OptionButton
          onPress={() => {
            handleAction('delete');
          }}
          disabled={selection.length === 0}
        >
          <TrashIcon />
        </OptionButton>
      </ButtonContainer>
      <ButtonContainer
        style={{ transform: [{ translateY: translateY3 }], opacity }}
      >
        <OptionButton
          onPress={() => {
            handleAction('theme');
            setDark(!dark);
          }}
        >
          {dark === true && <SunIcon />}
          {dark === false && <MoonIcon />}
        </OptionButton>
      </ButtonContainer>
    </>
  );
};

export default MenuButton;
