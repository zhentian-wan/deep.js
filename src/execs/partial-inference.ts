export const makeSelectors = <TSource>() => <
  TSelectors extends Record<string, (source: TSource) => any> = {}
>(
  selectors: TSelectors
) => {
  return selectors;
};

interface Source {
  firstName: string;
  middleName: string;
  lastName: string;
}

const selectors = makeSelectors<Source>()({
    getFullName: (source) =>
      `${source.firstName} ${source.middleName} ${source.lastName}`,
    getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
    getFirstNameLength: (source) => source.firstName.length,
  });