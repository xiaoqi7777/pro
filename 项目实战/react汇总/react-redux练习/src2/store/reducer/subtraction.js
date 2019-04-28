function reducer(state = { number1: 0 }, actions) {
  switch (actions.type) {
    case "DEL":
      return { number: state.number1 - actions.count1 };
  }
  return state;
}

export default reducer