import Nomics from "nomics";

// ...
const apiKey: string = process.env.NOMICS_API_KEY || "";

const nomicsClient = new Nomics({
  apiKey: apiKey,
});

export default nomicsClient;
