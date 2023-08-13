import main from "./main.js";
import cors from "cors";

const port = process.env.PORT || 8877;

main.use(cors());

main.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
