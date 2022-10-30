export type TPlayer = {
  id:number,
  nickname:string,
  moves: number,
  time: string,
  position?:number;
}

export type TPlayers = TPlayer[]
