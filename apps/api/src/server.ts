import app from "./app";
import config from "./config/env";

const server = app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
