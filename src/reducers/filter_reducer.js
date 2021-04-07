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
            let maxPrice = action.payload.map((item) => {
                return item.price;
            });

            maxPrice = Math.max(...maxPrice);

            return {
                ...state,
                all_products: [...action.payload], // copying the values to be sure not to reference to same place in memory with all_products and filtered_products

                filtered_products: [...action.payload],
                filters: {
                    ...state.filters,
                    max_price: maxPrice,
                    price: maxPrice,
                },
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

        case UPDATE_FILTERS:
            const { name, value } = action.payload;
            return { ...state, filters: { ...state.filters, [name]: value } };

        case FILTER_PRODUCTS:
            const { all_products } = state;
            const {
                text,
                category,
                company,
                color,
                price,
                shipping,
            } = state.filters;

            let temp_products = [...all_products];

            if (text) {
                temp_products = temp_products.filter((product) => {
                    if (product.name.toLowerCase().indexOf(text) !== -1)
                        return product;

                    return null;
                });
            }

            if (category !== "all") {
                temp_products = temp_products.filter((product) => {
                    return product.category.toLowerCase() === category;
                });
            }

            if (company !== "all") {
                temp_products = temp_products.filter((product) => {
                    return product.company.toLowerCase() === company;
                });
            }

            if (color !== "all") {
                temp_products = temp_products.filter((product) => {
                    return product.colors.find((c) => c === color);
                });
            }

            temp_products = temp_products.filter((product) => {
                return product.price <= price;
            });

            if (shipping) {
                temp_products = temp_products.filter((product) => {
                    return product.shipping === true;
                });
            }

            return { ...state, filtered_products: temp_products };

        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    company: "all",
                    category: "all",
                    color: "all",
                    price: state.filters.max_price,
                    shipping: false,
                },
            };

        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default filter_reducer;
