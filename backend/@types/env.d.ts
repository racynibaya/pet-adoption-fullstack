declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      DB_PASSWORD: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      NODE_ENV: string;
      JWT_COOKIES_EXPIRES_IN: number;
    }
  }
}

export {};
