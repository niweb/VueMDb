export enum MODULES {
  MOVIES = 'MOVIES',
}

export const namespaced = (namespace: MODULES, foo: string): string =>
  `${namespace}/${foo}`
