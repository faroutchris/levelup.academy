export default class NetworkConnectionError extends Error {
  public type = 'NETWORK_OFFLINE';

  constructor(message: 'Timeout' | 'Network error') {
    super(message);

    Object.setPrototypeOf(this, NetworkConnectionError.prototype);
  }
}
