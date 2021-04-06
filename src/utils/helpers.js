export const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
    let uniqueValues = data.map((item) => {
        return item[type];
    });

    if (type === "colors") {
        uniqueValues = uniqueValues.flat();
    }
    return ["all", ...new Set(uniqueValues)];
};
