function cross(A, B) {
    let result = [];
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

function eliminate(values, s, d) {
    if (!values[s].includes(d)) return values;
    values[s] = values[s].join('').replace(d, '').split('');
    if (values[s].length == 0) return false;
    else if (values[s].length == 1) {
        let d2 = values[s][0];
        let available = true;
        for (s2 of peers[s]) available = available && eliminate(values, s2, d2) !== false;
        if (!available) return false;
    }

    for (u of units[s]) {
        let dplaces = u.filter(s => values[s].includes(d));
        if (dplaces.length == 0) return false;
        else if (dplaces.length == 1)
            if (!assign(values, dplaces[0], d))
                return false;
    }
    return values;
}

function assign(values, s, d) {
    let other_values = values[s].join('').replace(d, '').split('');
    let available = true;
    for (d2 of other_values) {
        available = available && eliminate(values, s, d2) !== false;
    }
    return available ? values : false;
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
    for (value of Object.entries(grid_values(grid))) {
        let [s, d] = value;
        if (digits.includes(d) && assign(values, s, d) === false)
            return false;
    }
    return values;
}

function solve(grid) {
    return search(parse_grid(grid));
}

function some(seq) {
    for (e of seq)
        if (e) return e;
    return false;
}

function search(values) {
    if (values == false) return false;
    let all_len_is_1 = true;
    for (s of squares) {
        all_len_is_1 = all_len_is_1 && values[s] == 1;
    }
    if (all_len_is_1) return values;
    let n = 9, s;
    for (sq of squares) {
        if (values[sq].length < n && values[sq].length > 1) {
            n = values[sq];
            s = sq;
        }
    }
    let result = [];
    for (d of values[s]) {
        result.push(search(assign(Object.assign({}, values), s, d)));
    }
    return some(result);
}

function display(values) {
    console.log(values);
}

let grid1 = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......'.split('');
display(parse_grid(grid1));
