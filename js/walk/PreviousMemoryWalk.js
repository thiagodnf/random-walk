import Random from "../utils/Random.js";
import RandomWalk from "./RandomWalk.js";

export default class PreviousMemoryWalk extends RandomWalk {

    constructor() {
        super();
        this.previous = { i: 0, j: 0 };
    }

    clear(valids) {
        return valids.filter(el => el.i != this.previous.i || el.j != this.previous.j);
    }

    next(memory, i = 0, j = 0) {

        const valids = super.valids(memory, i, j);

        const possible = this.clear(valids);

        let next = Random.nextEl(possible);

        this.previous = { i, j };

        return next;
    }
}