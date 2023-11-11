export default class Random {

    /**
     * @param {number} min
     * @param {number} max
     * @returns a random number between min (included) and max (excluded)
     */
    static nextInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static nextIndex(array) {
        return Random.nextInt(0, array.length - 1);
    }

    static nextEl(array) {
        return array[Random.nextIndex(array)];
    }
}