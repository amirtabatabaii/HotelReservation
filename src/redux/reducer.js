import { HOTEL_LIST, HOTELS_DETAIL } from "./types";

import initialState from "./store";

export default function (state = initialState, action) {
  switch (action.type) {
    case HOTEL_LIST:
      return {
        ...state,
        listOfHotels: action.payload.list,
      };

    case HOTELS_DETAIL:
      return {
        ...state,
        detailsOfHotels: action.payload.list,
      };

    default:
      return {
        ...state,
      };
  }
}
