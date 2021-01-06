const app = require("./app");
const connectDB = require("./dbs");
const { PORT } = require("./configs");

connectDB();
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
