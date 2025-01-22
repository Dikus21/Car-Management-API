import app from "./app";
import EnvironmentSettings from "./utils/EnvironmentSettings";

new EnvironmentSettings();
//start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
