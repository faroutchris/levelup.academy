import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface AuthStoreState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthStoreState>(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken) => set((_state) => ({ accessToken })),
    }),
    {
      name: 'AccessToken',
      serialize: ({ state }) => JSON.stringify(state.accessToken),
      deserialize: (accessToken: string) => JSON.parse(`{ "accessToken": "${accessToken}" }`),
    }
  )
);

export default useAuthStore;
