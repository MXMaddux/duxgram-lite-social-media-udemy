const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "showLoading":
      return {
        ...state,
        loading: true,
      };
    case "hideLoading":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//   if (action.type === "showLoading") {
//     return {
//       ...state,
//       loading: true,
//     };
//   }
//   if (action.type === "hideLoading") {
//     return {
//       ...state,
//       loading: false,
//     };
//   } else {
//     return;
//   }
// };

export { loaderReducer };
