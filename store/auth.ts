import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface AuthStoreState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthStoreState>(
  devtools(
    persist(
      (set) => ({
        accessToken: '',
        setAccessToken: (accessToken) => set((_state) => ({ accessToken })),
      }),
      {
        name: 'AccessToken',
      }
    )
  )
);

export default useAuthStore;
