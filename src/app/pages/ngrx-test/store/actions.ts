import { Action } from "projects/ngrx-wheel/src/public-api";


export class UpdateDataAction implements Action {
  readonly type = '[USER] update data action';
  constructor(public data: number[]) { }
}

export class ResetAction implements Action {
  readonly type = '[USER] reset';
  constructor() { }
}


export type Actions = UpdateDataAction | ResetAction;
