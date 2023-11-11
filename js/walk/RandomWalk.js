import Random from "../utils/Random.js";

export default class RandomWalk {

    valids(memory, i, j) {

        const next = [];

        if (i - 1 >= 0) {
            next.push({ i: i - 1, j })
        }

        if (j - 1 >= 0) {
            next.push({ i, j: j - 1 })
        }

        if (i + 1 < memory.maxLines) {
            next.push({ i: i + 1, j })
        }

        if (j + 1 < memory.maxColumns) {
            next.push({ i, j: j + 1 })
        }

        return next;
    }

    next(memory, i = 0, j = 0) {

        const valids = this.valids(memory, i, j);

        return Random.nextEl(valids);
    }
}