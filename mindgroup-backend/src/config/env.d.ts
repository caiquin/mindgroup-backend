declare namespace NodeJS {
    export interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_SECRET: string;
      PORT?: string;
    }
  }
  