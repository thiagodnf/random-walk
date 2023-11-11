export default class Arrays {

    static clone(array) {

        const clone = [];

        for (let i = 0; i < array.length; i++) {

            if (Array.isArray(array[i])) {
                clone[i] = Arrays.clone(array[i]);
            } else {
                clone[i] = array[i];
            }
        }

        return clone;
    }

    static createArray(size, defaultValue = 0) {
        return Array(size).fill(defaultValue)
    }

    static createMatrix(lines, columns) {

        let matrix = [];

        for (let i = 0; i < lines; i++) {
            matrix.push(Arrays.createArray(columns, 0));
        }

        return matrix;
    }

}