import app from "./src/app.js";
import connectToBD from "./src/config/db.js";
import "dotenv/config";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
    connectToBD();
});