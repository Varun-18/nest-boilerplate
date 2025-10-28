/* eslint-disable */
import { IConstructor } from './i-constructor';

export const fromJson = <T extends {}>(
  str: string,
  type?: IConstructor<T>,
  defVal?: T,
): T => {
  try {
    return type != null
      ? Object.assign<T, T>(new type(), JSON.parse(str) as T)
      : JSON.parse(str);
  } catch (ex) {
    return (defVal ?? null) as T;
  }
};

export const toJson = (obj: unknown): string => {
  return JSON.stringify(obj);
};
