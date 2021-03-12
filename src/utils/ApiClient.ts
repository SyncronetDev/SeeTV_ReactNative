import config from 'app/config';
import { filter } from 'lodash';
import ApiClientError from './ApiClientError';

export default class ApiClient {
  static csrfToken: string;

  static authToken: string;

  url(path: string): string {
    const uri = path.startsWith('/') ? path : `/${path}`;

    return `${config.API_SERVER}${uri}`;
  }

  fetchOptions(options: Object): Object {
    const fetchOptions = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        Authorization: undefined,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': undefined,
      },
      ...options,
    };

    if (ApiClient.authToken) {
      fetchOptions.headers.Authorization = `Bearer ${ApiClient.authToken}`;
    }

    if (ApiClient.csrfToken) {
      fetchOptions.headers['X-XSRF-TOKEN'] = ApiClient.csrfToken;
    }

    return fetchOptions;
  }

  async get(path, options = {}): Promise<any> {
    const json = await this.request('GET', path, options);

    return json;
  }

  async delete(path, options = {}): Promise<any> {
    const json = await this.request('DELETE', path, options);

    return json;
  }

  async post(path, params = {}, options = {}): Promise<any> {
    const json = await this.request('POST', path, { body: JSON.stringify(params), ...options });

    return json;
  }

  async put(path, params = {}, options = {}): Promise<any> {
    const json = await this.request('PUT', path, { body: JSON.stringify(params), ...options });

    return json;
  }

  async patch(path, params = {}, options = {}): Promise<any> {
    const json = await this.request('PATCH', path, { body: JSON.stringify(params), ...options });

    return json;
  }

  request(method: string, path: string, options: Object): Promise<any> {
    return this.handleApiResponse(fetch(this.url(path), this.fetchOptions({ method, ...options })));
  }

  handleApiResponse(response): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return response
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch(async (err) => {
          console.log({ err });

          const data = await response.json();

          console.log({ data });

          switch (response.status) {
            case 422: // Laravel validation failed
              return reject(
                new ApiClientError({
                  status: response.status,
                  message: 'Laravel validation failed',
                  content: this.extractErrorsFromLaravelResponse(data),
                })
              );

            case 419:
              return reject(
                new ApiClientError({
                  status: response.status,
                  message: 'CSRF token is invalid',
                  content: '',
                })
              );

            case 401: // Unauthenticated
              return reject(
                new ApiClientError({
                  status: response.status,
                  message: 'Unauthenticated',
                  content: 'You are not logged in.',
                })
              );

            case 403: // Forbidden aka. Unauthorized
              return reject(
                new ApiClientError({
                  status: response.status,
                  message: 'Unauthorized',
                  content: 'Access denied.',
                })
              );

            default:
              return reject(
                new ApiClientError({
                  status: response.status,
                  message: 'Server error',
                  content: response.statusText,
                })
              );
          }
        });
    });
  }

  extractErrorsFromLaravelResponse(json): Object {
    const laravelErrors = json.errors || json.data.errors;
    const keys = [...new Set(Object.keys(laravelErrors).map((k) => k.split('.')[0]))];

    const errors = {};
    keys.forEach((key) => {
      const messages = filter(laravelErrors, (_v, k) => k === key || k.startsWith(key));

      errors[key] = messages.flat();
    });

    return errors;
  }
}
