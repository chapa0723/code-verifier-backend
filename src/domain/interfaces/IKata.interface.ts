/* eslint-disable no-unused-vars */
export enum KataLevel {
  BASIC = 'Basic',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface IKata {
  name: string;
  description: string;
  level: KataLevel;
  intents: number;
  stars: number;
  creator: string, // ID of Users
  solution: string,
  participants: string[],
}