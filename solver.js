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
let tmp = [];
for (rs of ['ABC'.split(''), 'DEF'.split(''), 'GHI'.split('')]) {
    for (cs of ['123'.split(''), '456'.split(''), '789'.split('')]) {
        tmp.push(cross(rs, cs));
    }
}
unitlist.push(...tmp);

let units = {};
for (s of squares) {
    let tmp = [];
    for (u of unitlist) {
        if (u.includes(s)) tmp.push(u);
    }
    units[s] = tmp;
}

let peers = {};
for (s of squares) {
    let a = new Set([].concat.apply([], units[s]));
    let b = new Set([s]);
    peers[s] = new Set([...a].filter(x => !b.has(x)));
}

function grid_values(grid) {
    let chars = grid.filter(c => digits.includes(c) || '0.'.includes(c));
    console.assert(chars.length == 81, 'invalid grid');
    let result = {};
    for (let i = 0; i < 81; ++i) result[squares[i]] = chars[i];
    return result;
}

function parse_grid(grid) {
    let values = {};
    for (s of squares) {
        values[s] = digits;
    }
    for (value of grid.entries()) {
    }
}
