import 'styled-components/native';

export interface IColors {
  primary: string;
  secundary: string;

  background: string;
  text: string;

  danger: string;
  info: string;
  warn: string;
  success: string;
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    title: string;

    colors: IColors;
  }
}
