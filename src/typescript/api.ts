export interface IUserListParams {
  id?: number;
  username?: string;
  email?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
  _start?: number;
  _limit?: number;

  [key: string]: number | string | undefined;
}