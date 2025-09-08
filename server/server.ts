

import app from "./src/app"
import { _Config } from "./src/config/config";

const startServer = () => {
  const port = _Config.port || 3000

app.listen(port, () => {
  console.log(`server listing on port ${ port }`);

})
}
startServer();