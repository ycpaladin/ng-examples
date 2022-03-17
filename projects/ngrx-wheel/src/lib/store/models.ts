

export interface Action<T = string> {
  readonly type: T;
}


export interface ActionReducer<S, A = Action> {
  (state: S, action: A): S
}

/**
 * {
 *   user: () => ...,
 *   class: () => ...,
 * }
 */
export type ActionReducerMap<T, A extends Action> = {
  [K in keyof T]: ActionReducer<T[K], A>
}
