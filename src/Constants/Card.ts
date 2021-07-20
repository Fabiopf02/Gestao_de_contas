import { Dimensions } from 'react-native';

const W = Dimensions.get('window').width;

export const WIDTH = W * 0.94;
export const MARGIN_H = 10;
export const HEIGHT = WIDTH * ((MARGIN_H * 15) / 362);
export const OPTIONS = 3;
export const OPTIONS_WIDTH = WIDTH * 0.15;
export const CONTENT_WIDTH = WIDTH * 0.85;
