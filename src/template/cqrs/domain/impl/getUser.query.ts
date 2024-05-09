export class GetUserQuery {
  constructor(
    public readonly query: {
      user_id?: number;
      user_name?: string;
    },
    public readonly state: 'VALIDATE' | 'GET_DATA',
  ) {}
}
