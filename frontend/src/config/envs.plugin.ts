declare global {
  interface ImportMetaEnv {
    VITE_API_HOST: string;
  }
}

export const envs = {
  VITE_API_HOST: import.meta.env.VITE_API_HOST,
};
