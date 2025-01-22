import app from ".";
import EnvironmentSettings from "./utils/EnvironmentSettings";

new EnvironmentSettings();
//start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
