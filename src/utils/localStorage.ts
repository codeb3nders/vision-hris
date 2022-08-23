export const addLocalStorageItem = async (obj: {}) => {
    const values: any = localStorage.getItem("hris");
    var parsedValues: any = {
        ...JSON.parse(values),
        ...obj,
    };
    localStorage.setItem("hris", JSON.stringify(parsedValues));
};

export const getLocalStorageItems = () => {
    const values: any = localStorage.getItem("hris") || undefined;
    var parsedValues: any;
    if (values) {
        parsedValues = JSON.parse(values);
        return parsedValues;
    }
    return;
};

export const clearLocalStorage = () => {
    localStorage.removeItem("hris");
};