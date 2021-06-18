import { ILogo } from './ilogo';

export interface IEvent {
  id: number;
  logo: ILogo;
  name: string;
  description: string;
  date: string;
}
