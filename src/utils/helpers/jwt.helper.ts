import axios from "axios";
import User from "../../interfaces/user/User.interface";

const API_URL = `${<string>process.env.NEXT_PUBLIC_API_URL}/users`;

export const register = async ({
  username,
  password,
}: User): Promise<string | void> => {
  const message: string | void = await axios
    .post(`${API_URL}/register`, {
      username,
      password,
    })
    .then((response) => {
      const result: string = response.data.message;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return message;
};

export const authenticate = async ({
  username,
  password,
}: User): Promise<string | void> => {
  const jwt: string | void = await axios
    .post(`${API_URL}/authenticate`, {
      username,
      password,
    })
    .then((response) => {
      const result: string = response.data.token;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return jwt;
};
