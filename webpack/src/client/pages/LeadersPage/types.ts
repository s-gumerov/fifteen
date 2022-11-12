export type TPlayer = {
  id:number | undefined,
  nickname:string,
  moves: number,
  time: string,
  position?:number;
}

export type TPlayers = TPlayer[]
