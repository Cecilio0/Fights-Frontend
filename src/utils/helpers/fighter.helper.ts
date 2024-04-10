import "dotenv/config";
import axios from "axios";
import Fighter from "../../interfaces/fighter/Fighter.interface";

const API_URL = `${<string>process.env.API_URL}/fighters`;

export const getFighterNames = async (): Promise<string[] | void> => {
  const jwt =
    localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");
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

export const getFighters = async (): Promise<Fighter[] | void> => {
  const jwt =
    localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");
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
  name: string,
): Promise<Fighter | void> => {
  const jwt =
    localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");
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

export const getFighterById = async (id: number): Promise<Fighter | void> => {
  const jwt =
    localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");
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
