import { S } from 'ts-toolbelt';
import {Expect, Equal} from "../types/utils"
type UserPath = '/users/:id';

type UserOrganisationPath = '/users/:id/organisations/:organisationId';

type ExtractPathParams<T extends string> = {
  [Key in S.Split<T, '/'>[number] as Key extends `:${infer P}`
    ? P
    : never]: string;
};

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];