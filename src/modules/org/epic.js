import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { OrgsAPI } from 'api/org';
import * as OrgActions from 'modules/org/actions';
import { ActionTypes } from './constants';
import { checkStatus } from 'utils/http';


const fetchOrg = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_ORG),
  flatMap(() =>
    from(OrgsAPI.getMyOrg().then(checkStatus))
      .pipe(
        flatMap(({ data }) => of(OrgActions.fetchOrgSuccess(data))),
        catchError(err => of(OrgActions.fetchOrgFailed(err))),
        startWith(OrgActions.fetchOrgPending()),
      )
  )
)


export default combineEpics(
  fetchOrg,
)
