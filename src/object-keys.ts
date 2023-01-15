export const typedObjectKeys = <Keys extends string>(obj: Record<Keys, any>) => {
    return Object.keys(obj) as Array<Keys>;
};

/**
export const typedObjectKeys = <T extends object>(obj: T) => {
    return Object.keys(obj) as Array<keyof T>;
};
*/