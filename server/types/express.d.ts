declare namespace Express {
  export type AuthUser = Pick<
    import('@/types').User,
    '_id' | 'email' | 'name' | 'role'
  >;

  export interface Request {
    user?: AuthUser;
  }
}
