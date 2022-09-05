import Nomics from 'nomics';

const nomicsClient = new Nomics({
  apiKey: process.env.NOMICS_API_KEY,
});

export default nomicsClient;
