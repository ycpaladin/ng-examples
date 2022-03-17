import { Observable } from 'rxjs';
import { Action } from '../store';


export function createEffect(sourceFn: () => Observable<Action>): Observable<Action> {
  const effect = sourceFn();
  // TODO 在此为effect打个标记，说明是一个effect
  // Object.defineProperty(effect, '', { })
  return effect;
}
