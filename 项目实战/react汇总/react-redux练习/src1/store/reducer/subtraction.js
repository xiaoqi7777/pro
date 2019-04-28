function reducer(state = { number: 0 }, actions) {
  console.log(state, actions);
  switch (actions.type) {
    case "DEL":
      console.log('-----')
      return { number: state.number - actions.count };
  }
  return state;
}

export default reducer