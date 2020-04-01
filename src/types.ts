export type Reducer<State, Action> = (state: State, action: Action) => State;

export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<
  infer S,
  any
>
  ? S
  : never;

export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never;

export type ActionHandler<State, Action> = (
  state: State,
  action: Action,
) => any;

export type Dispatch<A> = (value: A) => void;
