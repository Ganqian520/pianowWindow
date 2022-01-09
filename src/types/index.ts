export type Music = {
  indexX:number //在表格中的序号
  indexY:number  
  length:number //长度，以十六分音符为单位
}

export enum Cursor {  //鼠标类型
  position, 
  length,
  miss,
}