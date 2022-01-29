export const initialState = {
  pickup: {},
  dropoff: {},
  date:[]|| new Date(),
  passengers: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  duration: 0,
  distance: "",
  TypeTravel:'outstation'
};

const reducer = (state, action) => {
 
  localStorage.setItem('travelDetail' , JSON.stringify(state))
  console.log(action)
  switch (action.type) {
    case "ADD_PICKUP":
      return { ...state, pickup: action.pickup };

    case "ADD_DROPOFF":
      return { ...state, dropoff: action.dropoff };

    case "ADD_DATE":
      return { ...state, date: action.date };

    case "ADD_PASSENGERS_ADULTS":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          adults: action.passengers.adults + 1,
        },
      };

    case "SUBTRACT_PASSENGERS_ADULTS":
      if (state.passengers.adults === 0) return state;
      return {
        ...state,
        passengers: {
          ...state.passengers,
          adults: action.passengers.adults - 1,
        },
      };

    case "ADD_PASSENGERS_CHILDREN":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          children: action.passengers.children + 1,
        },
      };

    case "SUBTRACT_PASSENGERS_CHILDREN":
      if (state.passengers.children === 0) return state;
      return {
        ...state,
        passengers: {
          ...state.passengers,
          children: action.passengers.children - 1,
        },
      };

    case "ADD_PASSENGERS_INFANTS":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          infants: action.passengers.infants + 1,
        },
      };

    case "SUBTRACT_PASSENGERS_INFANTS":
      if (state.passengers.infants === 0) return state;
      return {
        ...state,
        passengers: {
          ...state.passengers,
          infants: action.passengers.infants - 1,
        },
      };

    case "ADD_DURATION":
      return { ...state, duration: action.duration };

    case "ADD_DISTANCE":
      return { ...state, distance: action.distance };
      case "TypeTravel":
        return { ...state, TypeTravel: action.data };

    default:
      return state;
  }
};

export default reducer;
