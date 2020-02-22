import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import * as AuthActions from './actions';
import { ActionTypes } from './constants';
import { AuthAPI } from 'api/auth';

const verifyUser$ = action$ => action$.pipe(
  ofType(ActionTypes.VERIFY_USER),
  pluck('payload'),
  flatMap(({ token }) =>
    from(AuthAPI.verifyUser(token))
      .pipe(
        map(() => AuthActions.verifyUserSuccess()),
        catchError(err => of(AuthActions.verifyUserFailed({ err }))),
        startWith(AuthActions.verifyUserPending())
      )
  )
);

const reportFalseEmail$ = action$ => action$.pipe(
  ofType(ActionTypes.REPORT_FALSE_EMAIL),
  pluck('payload'),
  flatMap(({ userId }) =>
    from(AuthAPI.reportFalseEmail(userId))
      .pipe(
        map(() => AuthActions.reportFalseEmailSuccess()),
        catchError(err => of(AuthActions.reportFalseEmailFailed({ err }))),
        startWith(AuthActions.reportFalseEmailPending())
      )
  )
);


export default combineEpics(
  verifyUser$,
  reportFalseEmail$,
)
