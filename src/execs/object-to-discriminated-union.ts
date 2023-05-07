import {Expect, Equal} from "../types/utils"

interface Attributes {
    id: string;
    email: string;
    username: string;
  }

  type MutuallyExclusive<T> = {
    [Key in keyof T]: {
      [P in Key]: T[P]
    }
  }[keyof T];

  type ExclusiveAttributes = MutuallyExclusive<Attributes>;

  type tests = [
    Expect<
      Equal<
        ExclusiveAttributes,
        | {
            id: string;
          }
        | {
            email: string;
          }
        | {
            username: string;
          }
      >
    >,
  ];
