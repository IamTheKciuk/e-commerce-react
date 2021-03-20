import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                all_products: [...action.payload], // copying the values to be sure not to reference to same place in memory with all_products and filtered_products
                filtered_products: [...action.payload],
            };

        case SET_GRIDVIEW:
            return { ...state, grid_view: true };

        case SET_LISTVIEW:
            return { ...state, grid_view: false };

        case UPDATE_SORT:
            return { ...state, [action.payload.name]: action.payload.value };

        case SORT_PRODUCTS:
            const { sort, filtered_products } = state;
            let tempProducts = [...filtered_products];

            if (sort === "price-lowest") {
                tempProducts = filtered_products.sort(
                    (a, b) => a.price - b.price
                );
            }

            if (sort === "price-highest") {
                tempProducts = filtered_products.sort(
                    (a, b) => b.price - a.price
                );
            }

            if (sort === "name-a") {
                tempProducts = filtered_products.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            }

            if (sort === "name-z") {
                tempProducts = filtered_products.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }

            return { ...state, filtered_products: tempProducts };

        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default filter_reducer;
