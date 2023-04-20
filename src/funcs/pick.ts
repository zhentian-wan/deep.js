export const pick = <T, Keys extends keyof T>(obj: T, picked: Array<Keys>) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, Keys>);
};
