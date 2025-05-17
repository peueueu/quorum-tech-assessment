import express from "express"
import cors from "cors"
import exportRouter from "./routes"

const app = express();
app.use(cors());
app.use('/api', exportRouter);

app.listen(8080, () => console.log("Backend running on http://localhost:8080"));