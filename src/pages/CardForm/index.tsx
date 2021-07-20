import React, { useState, useContext, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  CardFormBlock,
  CardFormBlockInput,
  CardFormBlockTitle,
  CardFormContainer,
  ConfirmButton,
  ConfirmButtonText,
  ConfirmBlock,
  Scroll,
  ButtonText2,
  Input,
  Row,
  M,
  TypeButton,
  TypeButtonText,
  Value,
  OtherButton,
  AlignRight,
} from './styles';
import { CloseIcon } from '../../components/MenuButton/styles';

import getRealm from '../../services/realm';
import Realm from 'realm';
import { Alert, TextInput } from 'react-native';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { RouteProps } from '../../routes';
import { ICard } from '../../components/Card';

interface Input {
  [key: string]: string;
  _id: string;
  title: string;
  type: string;
  value: string;
  finished: string;
}

const CardForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputs, setInputs] = useState<Input[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState(false);
  const params = useRoute<RouteProps<'CardForm'>>().params;

  const navigation = useNavigation();

  const titleRef = useRef<TextInput>(null);
  const { colors } = useContext(ThemeContext);

  const items = [
    {
      label: 'Entrada',
      value: 'entry',
      icon: () => <Icon name="cash-outline" size={16} color={colors.success} />,
    },
    {
      label: 'Saída',
      value: 'exit',
      icon: () => <Icon name="cash-outline" size={16} color={colors.danger} />,
    },
  ];

  const newInput = async () => {
    let input = {
      _id: generateUniqueId(),
      title: '',
      type: 'entry',
      value: '',
      finished: 'false',
    };
    return setInputs(oldValues => [...oldValues, input]);
  };

  const removeInput = (id: string) => {
    const ipt = inputs.filter(input => input._id !== id);
    return setInputs(ipt);
  };

  const onChange = (value: string, key: string, id: string) => {
    const newValues = inputs.map(ob => {
      if (ob._id === id) {
        ob[key] = value;
      }
      return ob;
    });
    setInputs(newValues);
  };

  const handleForm = async () => {
    try {
      if (title.length <= 0) {
        return titleRef.current?.focus();
      }

      const data = inputs
        .filter(i => i.value !== '' && i.title !== '')
        .map(input => {
          const newValue = {
            _id: input._id,
            value: parseFloat(input.value),
            type: input.type,
            title: input.title,
            finished: input.finished === 'true',
          };
          return newValue;
        });

      if (!data.length) {
        return Alert.alert(
          'Campo em branco',
          'Os valores de transação são obrigatórios!',
        );
      }
      const card = {
        _id: params ? params._id : generateUniqueId(),
        title,
        description,
        deadline: date,
        items: data,
      };

      if (!date) {
        delete card.deadline;
      }

      const realm = await getRealm();
      realm.write(() => {
        realm.create('Card', card, Realm.UpdateMode.Modified);
      });

      setTitle('');
      setDescription('');
      setInputs([]);

      Alert.alert(
        'Sucesso!',
        params ? 'O cartão foi atualizado!' : 'O cartão foi adicionado!',
      );
      return navigation.navigate('Home');
    } catch (err) {
      return console.log(err);
    }
  };

  const onChangeDate = (value: Date | undefined) => {
    setShow(false);
    return setDate(value);
  };

  useEffect(() => {
    async function handleEdit() {
      if (!params) {
        return;
      }
      const realm = await getRealm();
      const card = realm.objectForPrimaryKey<ICard>('Card', params._id);
      const itemList = card!.items.map(item => {
        const { _id: id, finished, title: tt, type, value } = item;
        return {
          _id: id,
          title: tt,
          type,
          finished: String(finished),
          value: String(value),
        };
      });
      setTitle(card!.title);
      setDescription(card!.description);
      if (card!.deadline) {
        setDate(card!.deadline);
      }
      setInputs(itemList);
    }
    handleEdit();
  }, [params]);

  return (
    <CardFormContainer>
      <Header title="Novo cartão" back={true} />
      <Scroll>
        <CardFormBlock>
          <CardFormBlockTitle>Titulo</CardFormBlockTitle>
          <CardFormBlockInput
            placeholder="..."
            value={title}
            ref={titleRef}
            onChangeText={setTitle}
          />
        </CardFormBlock>

        <CardFormBlock>
          <CardFormBlockTitle>Descrição</CardFormBlockTitle>
          <CardFormBlockInput
            placeholder="Opcional"
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
        </CardFormBlock>

        <CardFormBlock>
          <CardFormBlockTitle>Data limite</CardFormBlockTitle>
          {show === true && (
            <DateTimePicker
              minimumDate={new Date()}
              mode="date"
              display="calendar"
              value={new Date()}
              onChange={(_, value) => onChangeDate(value)}
            />
          )}
          <Row>
            <OtherButton
              onPress={() => {
                if (date !== undefined) {
                  return setDate(undefined);
                }
                return setShow(true);
              }}
            >
              <ButtonText2>
                {date !== undefined ? 'Remover' : 'Escolher'}
              </ButtonText2>
            </OtherButton>
            {date !== undefined && (
              <CardFormBlockTitle>
                {new Date(date).toLocaleDateString()}
              </CardFormBlockTitle>
            )}
          </Row>
        </CardFormBlock>

        <CardFormBlock>
          <AlignRight>
            <OtherButton onPress={newInput}>
              <ButtonText2>
                Novo
                <ConfirmButtonText>+</ConfirmButtonText>
              </ButtonText2>
            </OtherButton>
          </AlignRight>
          {inputs.map((input, index) => (
            <Input key={String(input._id)}>
              {index !== 0 && (
                <CloseIcon onPress={() => removeInput(input._id)} />
              )}
              <CardFormBlockInput
                value={input.title}
                placeholder="Informação extra para o valor..."
                onChangeText={t => onChange(t, 'title', input._id)}
              />
              <Row>
                <M>R$</M>
                <Value
                  value={input.value}
                  onChangeText={t => onChange(t, 'value', input._id)}
                  placeholder="00,00"
                />
              </Row>
              <Row>
                {items.map(item => (
                  <TypeButton
                    key={item.value}
                    selected={item.value === input.type ? true : false}
                    onPress={() => onChange(item.value, 'type', input._id)}
                    disabled={item.value === input.type ? true : false}
                  >
                    {item.icon()}
                    <TypeButtonText>{item.label}</TypeButtonText>
                  </TypeButton>
                ))}
              </Row>
            </Input>
          ))}
        </CardFormBlock>

        <ConfirmBlock>
          <ConfirmButton onPress={handleForm}>
            <ConfirmButtonText>Confirmar</ConfirmButtonText>
          </ConfirmButton>
        </ConfirmBlock>
      </Scroll>
    </CardFormContainer>
  );
};

export default CardForm;
