import Random from "../utils/Random.js";
import RandomWalk from "./RandomWalk.js";

export default class FullMemoryWalk extends RandomWalk {

    constructor() {
        super();
    }

    clear(valids, memory) {

        const v = valids.filter(el => !memory.isNodeVisited(el));

        if (v.length == 0) {
            return valids;
        }

        return v;
    }

    next(memory, i = 0, j = 0) {

        const valids = super.valids(memory, i, j);

        const possible = this.clear(valids, memory);

        let next = Random.nextEl(possible);
        
        return next;
    }
}