import { ACTIONS } from './actions'

const reducers = (state, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_PROMOTION_TYPES:
            return {
                ...state,
                promotionType: {
                    promotionTypes: action.payload
                }
            };
        default:
            return state;
    }
}

export default reducers