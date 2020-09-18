import { NativeModules } from 'react-native';

type ComponentLibType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ComponentLib } = NativeModules;

export default ComponentLib as ComponentLibType;
