function cross(A, B) {
    let result = []
    for (a of A) {
        for (b of B) {
            result.push(a + b);
        }
    }
    return result;
}

let digits = '123456789'.split('');
let rows = 'ABCDEFGHI'.split('');
let cols = digits;
let squares = cross(rows, cols);
let unitlist = [...cols.map(c => cross(rows, c)),
                ...rows.map(r => cross(r, cols))];
for (rs in ['ABC', 'DEF', 'GHI']) {
    for (cs in ['123', '456', '789']) {
        unitlist.push(cross(rs, cs));
    }
}
let units = {};
for (s of squares) {
    for (u of unitlist) {
        if (u.includes(s)) units[s] = u;
    }
}
let peers = {};
for (s of squares) {
    let a = new Set([].concat.apply([], units[s]));
    let b = new Set([s]);
    peers[s] = new Set([...a].filter(x => !b.has(x)));
}

console.log(squares.length == 81);
console.log(unitlist);
