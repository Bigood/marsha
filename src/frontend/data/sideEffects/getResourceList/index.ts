import { stringify } from 'querystring';
import { Dispatch } from 'redux';

import { API_ENDPOINT, API_LIST_DEFAULT_PARAMS } from '../../../settings';
import { requestStatus } from '../../../types/api';
import { modelName } from '../../../types/models';
import { addMultipleResources } from '../../genericReducers/resourceById/actions';
import {
  didGetResourceList,
  failedToGetResourceList,
  getResourceList as getResourceListAct,
  ResourceListGet,
} from '../../genericReducers/resourceList/actions';

/**
 * Makes and handles the GET request for a resource list. First returns a curried function that
 * enables us to easily pass the first batch of params from the connector.
 * @param dispatch The dispatcher for the store we're using for this given call.
 * @param jwt The token to use to authenticate the request.
 * @param resourceName The model name for the resource for which we're getting a list.
 * @param params The parameters for the list request.
 * @returns a promise for a request status, so the side effect caller can simply wait for it if needed.
 */
export const getResourceList = (dispatch: Dispatch, jwt: string) => async (
  resourceName: modelName,
  params: ResourceListGet['params'] = API_LIST_DEFAULT_PARAMS,
): Promise<requestStatus> => {
  const endpoint = `${API_ENDPOINT}/${resourceName}/`;
  dispatch(getResourceListAct(resourceName, params));

  try {
    const response = await fetch(`${endpoint}?${stringify(params)}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Push remote errors to the error channel for consistency
      throw new Error(
        `Failed to get list for ${endpoint} and ${JSON.stringify(params)} : ${
          response.status
        }.`,
      );
    }

    const resources = await response.json();
    dispatch(didGetResourceList(resourceName, resources, params));
    dispatch(addMultipleResources(resourceName, resources));
    return requestStatus.SUCCESS;
  } catch (error) {
    dispatch(failedToGetResourceList(resourceName, error));
    return requestStatus.FAILURE;
  }
};