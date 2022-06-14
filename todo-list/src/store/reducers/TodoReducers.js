import { FETCH_TODO } from "../../action/url"

const initialState = {
    todo : []
}

function TodoReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_TODO:
        return { todo: action.payload }
      default:
        return state
    }
}

export default TodoReducer