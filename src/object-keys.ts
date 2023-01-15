export const typedObjectKeys = <Keys extends string>(obj: Record<Keys, any>) => {
    return Object.keys(obj) as Array<Keys>;
};