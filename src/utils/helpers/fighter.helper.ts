import "dotenv/config";
import axios from "axios";
import Fighter from "../../interfaces/fighter/Fighter.interface";

const API_URL = `${<string>process.env.API_URL}/fighters`;

export const getFighterNames = async (
  jwt: string
): Promise<string[] | void> => {
  const names: string[] | void = await axios
    .get(`${API_URL}/names`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      const result: Array<string> = response.data;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return names;
};

export const getFighters = async (jwt: string): Promise<Fighter[] | void> => {
  const fighters: Fighter[] | void = await axios
    .get(`${API_URL}/find`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      const result: Fighter[] = response.data;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return fighters;
};

export const getFighterByName = async (
  jwt: string,
  name: string
): Promise<Fighter | void> => {
  const fighter: Fighter | void = await axios
    .get(`${API_URL}/find/name/${name}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      const result: Fighter = response.data;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return fighter;
};

export const getFighterById = async (
  jwt: string,
  id: number
): Promise<Fighter | void> => {
  const fighter: Fighter | void = await axios
    .get(`${API_URL}/find/id/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      const result: Fighter = response.data;
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return fighter;
};
