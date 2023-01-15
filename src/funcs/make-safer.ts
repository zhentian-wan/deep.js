import type { Equal, Expect } from '../types/utils';

const makeSafe =
  <T extends unknown[], RT>(func: (...args: T) => RT) =>
  (
    ...args: T
  ):
    | {
        type: 'success';
        result: RT;
      }
    | {
        type: 'failure';
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: 'success',
        result,
      };
    } catch (e) {
      return {
        type: 'failure',
        error: e as Error,
      };
    }
  };

test("Should return the result with a { type: 'success' } on a successful call", () => {
  const func = makeSafe(() => 1);

  const result = func();

  expect(result).toEqual({
    type: 'success',
    result: 1,
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: 'success';
            result: number;
          }
        | {
            type: 'failure';
            error: Error;
          }
      >
    >
  ];
});

it('Should return the error on a thrown call', () => {
  const func = makeSafe(() => {
    if (1 > 2) {
      return '123';
    }
    throw new Error('Oh dear');
  });

  const result = func();

  expect(result).toEqual({
    type: 'failure',
    error: new Error('Oh dear'),
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: 'success';
            result: string;
          }
        | {
            type: 'failure';
            error: Error;
          }
      >
    >
  ];
});

test("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });

  // @ts-expect-error
  func();

  // @ts-expect-error
  func(1, 1);

  func(1, '1');
});
