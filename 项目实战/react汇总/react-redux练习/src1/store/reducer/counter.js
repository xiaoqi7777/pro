function reducer(state = { number: 0 }, actions) {
  // console.log(state, actions);
  switch (actions.type) {
    case "ADD":
      return { number: state.number + actions.count };
    case "DEL":
      return { number: state.number - actions.count };  
  }
  return state;
}

export default reducer