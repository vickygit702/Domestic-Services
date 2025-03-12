import axios from "axios";

export const signup = async (cred) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/auth/api/signupUser",
      cred
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const login = async (cred) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/auth/api/loginUser",
      cred
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
