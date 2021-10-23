
export const ACTIONS = {
    FETCH_PROMOTION_TYPES: 'FETCH_PROMOTION_TYPES',
};

export const addListingData = (type, data) => {
    return ({ type, payload: data });
};