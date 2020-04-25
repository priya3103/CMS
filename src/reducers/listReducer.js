// Initial State
const initialState = {
  data: [],
  backup:[]
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {        
    case 'ADDUPDATE': {
      return {
        ...state,       
        data: action.data,
        backup:action.data
      };
    }
    case 'EDIT': {
      return {
        ...state,
        data: state.data.filter(item => item.id.includes(action.data))        
      };
    }
    default: {
      return state;
    }
  }
};

export default listReducer;