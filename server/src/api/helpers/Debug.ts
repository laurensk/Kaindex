import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../../../.env") });

class Debug {
  enabled: boolean;

  constructor() {
    this.enabled = process.env.DEBUG == "TRUE";
  }

  log(error: any) {
    if (error && this.enabled) {
      console.log("--- DEBUG-LOG ---");
      console.log(error);
      console.log("--- DEBUG-LOG ---");
    }
  }
}

export default new Debug();
