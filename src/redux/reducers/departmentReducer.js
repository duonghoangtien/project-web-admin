import { FETCH_DEPARTMENT } from "../contants";

const initialState = {
    departmentList : []
}

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENT:
      return {
        departmentList: action.payload,
      };
 
    default:
      return state;
  }
};

export default departmentReducer;
