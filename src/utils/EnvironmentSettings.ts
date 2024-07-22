import dotenv from "dotenv";

export default class EnvironmentSettings {
  private envFile: string | undefined;

  constructor() {
    this.envFile = process.env.ENV_FILE;
    dotenv.config();
    dotenv.config({ path: `./.env.${this.envFile}` });
  }
}