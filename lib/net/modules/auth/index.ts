import { fetchServer } from "../../fetch/fetch";

const authChallenge = async (address: string) => {
  const nonce = await fetchServer(`/auth/nonce/${address}`);
  return nonce;
};

export { authChallenge };
