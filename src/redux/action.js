import { HOTEL_LIST, HOTELS_DETAIL } from "./types";

// get Hotel Lists
export const getHotelLists = (list) => (dispatch) => {
  dispatch({
    type: HOTEL_LIST,
    payload: { list },
  });
};

// get Hotels Details
export const getHotelsDetails = (list) => (dispatch) => {
  dispatch({
    type: HOTELS_DETAIL,
    payload: { list },
  });
};
