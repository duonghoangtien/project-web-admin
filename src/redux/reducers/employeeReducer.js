import { FETCH_EMPLOYEE } from "../contants";

const initialState = {
    employeeList : []
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE:
      return {
        employeeList: action.payload,
      };
 
    default:
      return state;
  }
};

export default employeeReducer;
