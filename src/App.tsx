import React, { useEffect, useState } from 'react';

import { ThemeProvider } from 'styled-components';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

import Routes from './routes';
import { useColorScheme } from 'react-native';
import getRealm from './services/realm';
import { IUser } from './pages/Logon';

const App: React.FC = () => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceTheme === 'dark' ? true : false);

  useEffect(() => {
    async function init() {
      try {
        let realm = await getRealm();
        if (realm.isClosed) {
          realm = await getRealm();
        }
        const obj = realm.objects<IUser>('User');
        obj.addListener(user => {
          if (user.length > 0) {
            const savedTheme = user[0].theme;
            return setIsDark(savedTheme === 'dark' ? true : false);
          }
        });
        return () => {
          obj.removeAllListeners();
          realm.close();
        };
      } catch (err) {
        return console.log(err);
      }
    }
    init();
  }, [deviceTheme]);

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
