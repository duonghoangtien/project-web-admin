import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, FETCH_DEPARTMENT } from "../contants";

export const fetchAllDepartment = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/department`, config);

    dispatch({
      type: FETCH_DEPARTMENT,
      payload: data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
