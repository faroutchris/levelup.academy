import { AxiosResponse } from 'axios';
import cmsAPI from '../../config/cms-api';
import DirectusError from '../../constants/directus-error';
import { clientError, serverError, successful } from '../response-checker/response-checker';

const makeQuery = <QueryData, ResponseData>(query: string) => async (
  variables: QueryData,
): Promise<AxiosResponse<ResponseData>> => {
  try {
    const response = await cmsAPI.post('/graphql', { query, variables });

    if (successful(response)) {
      return response.data;
    }
  } catch (error) {
    if (serverError(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
    if (clientError(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
  }
};

export default makeQuery;
