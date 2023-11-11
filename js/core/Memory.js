export default class Memory {

    constructor(pos = { i: 0, j: 0 }) {

        this.steps = 0;
        this.maxLines = 1000;
        this.maxColumns = 1000;

        this._edges = new Set();
        this._nodes = new Set();

        this._nodes.add(`${pos.i}_${pos.j}`)
    }

    totalEdges() {
        return this._edges.size;
    }

    isNodeVisited(pos) {
        return this._nodes.has(`${pos.i}_${pos.j}`);
    }

    save(pos, next) {

        const posAsStr = `${pos.i}_${pos.j}`;
        const nextAsStr = `${next.i}_${next.j}`;

        this._nodes.add(posAsStr);
        this._nodes.add(nextAsStr);

        this._edges.add(`${posAsStr}@${nextAsStr}`);

        this.steps++;
    }

    edges(cb = () => { }) {

        for (const item of this._edges) {

            const points = item.split("@");

            const pos = points[0].split("_").map(e => parseInt(e));
            const next = points[1].split("_").map(e => parseInt(e));

            cb && cb({ i: pos[0], j: pos[1] }, { i: next[0], j: next[1] });
        }
    }
}