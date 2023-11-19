export type PartialOmit<T extends object, U extends keyof T> = { [K in Exclude<keyof T, U>]?: T[K] }
