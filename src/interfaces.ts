export interface User {
  name: string;
  id: number;
  readyState: boolean;
  local: boolean;
  cards: number[];
}

export interface BaseEvent {
  type: ActionType;
  data: unknown;
}

export interface PlayerJoinEvent extends BaseEvent {
  type: ActionType.PlayerJoin;
  data: User[];
}
export interface StartedEvent extends BaseEvent {
  type: ActionType.Started;
  data: boolean;
}
export interface CardsEvent extends BaseEvent {
  type: ActionType.Cards;
  data: { [id: string]: number[] };
}
export interface DealtCardsEvent extends BaseEvent {
  type: ActionType.DealtCards;
  data: number[];
}

export interface LivesEvent extends BaseEvent {
  type: ActionType.Lives;
  data: number;
}
export interface LostEvent extends BaseEvent {
  type: ActionType.Lost;
  data: boolean;
}

export type GameEvent =
  | PlayerJoinEvent
  | StartedEvent
  | CardsEvent
  | DealtCardsEvent
  | LivesEvent
  | LostEvent;

export enum ActionType {
  PlayerJoin = 1,
  Started = 2,
  Cards = 3,
  DealtCards = 4,
  Lives = 5,
  Lost = 6,
}

export interface LobbyState {
  players: User[];
  started: boolean;
  ready: boolean;
  dealtCards: number[];
  yourCards: number[];
  lives: number;
  lost: boolean;
  round: number;
  localPlayer?: User;
}
