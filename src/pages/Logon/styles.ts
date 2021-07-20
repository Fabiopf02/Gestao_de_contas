import styled from 'styled-components/native';

export const LogonContainer = styled.View`
  flex: 1;
  background: #f0f0f0;
  align-items: center;
`;

export const LogonTitle = styled.Text`
  font-size: 24px;
  color: #888;
  letter-spacing: 1px;
  text-align: center;
  padding: 15px 8px;
`;

export const LogonForm = styled.View`
  width: 90%;
  height: 50%;
  margin: 15% 0px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  elevation: 2;
`;

export const LogonInput = styled.TextInput`
  width: 95%;
  height: 50px;
  background: #fff;
  color: #7159c1;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
`;

export const LogonButton = styled.TouchableOpacity`
  width: 95%;
  height: 55px;
  border-radius: 15px;
  background: #7159c1;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  padding: 4px;
  elevation: 2;
`;

export const LogonButtonText = styled.Text`
  font-size: 20px;
  color: #faf9f9;
  font-weight: bold;
  letter-spacing; 1px;
`;
