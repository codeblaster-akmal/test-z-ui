import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducers from './reducers';
import { fetchPromotionTypes } from "./service";
import { ACTIONS, addListingData } from "./actions";

export const DataContext = createContext();

export function useStoreData() {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {

    const initialState = {
        promotionType: {
            promotionTypes: []
        },
    };

    const [state, dispatch] = useReducer(reducers, initialState);

    const getPromotionTypes = async () => {
        try {
            const { data } = await fetchPromotionTypes();
            dispatch(addListingData(ACTIONS.FETCH_PROMOTION_TYPES, data));
        } catch (err) {
            console.log("data-context-fetch-promotion-types-err: ", err);
        }
    };

    useEffect(() => {
        getPromotionTypes();
    }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
};