import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { OrgsAPI } from 'api/org';
import * as OrgActions from 'modules/org/actions';
import { ActionTypes } from './constants';


const fetchOrg = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_ORG),
  flatMap(() =>
    from(OrgsAPI.getMyOrg())
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(OrgActions.fetchOrgSuccess(data))),
        catchError(err => of(OrgActions.fetchOrgFailed(err))),
        startWith(OrgActions.fetchOrgPending()),
      )
  )
)


export default combineEpics(
  fetchOrg,
)