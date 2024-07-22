import dotenv from "dotenv";

export default class EnvironmentSettings {
  private envFile: string | undefined;

  constructor() {
    dotenv.config();
    this.envFile = process.env.ENV_FILE || "prod";
    dotenv.config({ path: `./.env.${this.envFile}` });
  }
}
