import * as actions from './actions';

export interface State {
  isFetching: boolean;
  error: boolean;
  data: number[];
}

const initialState: State = {
  isFetching: true,
  error: false,
  data: [1, 2, 3, 4, 5]
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case '[USER] update data action':
      return {
        ...state,
        data: action.data
      }
    case '[USER] reset':
      return initialState;
    default:
      return state;
  }
}


export interface RootState {
  name: State
}
