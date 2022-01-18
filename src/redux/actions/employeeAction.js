import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, FETCH_EMPLOYEE } from "../contants";

export const fetchAllEmployee = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/employee`, config);

    dispatch({
      type: FETCH_EMPLOYEE,
      payload: data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};