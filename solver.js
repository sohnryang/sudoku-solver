function cross(A, B) {
    let result = [];
    for (let a of A) {
        for (let b of B) {
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
for (let rs of ['ABC'.split(''), 'DEF'.split(''), 'GHI'.split('')]) {
    for (let cs of ['123'.split(''), '456'.split(''), '789'.split('')]) {
        tmp.push(cross(rs, cs));
    }
}
unitlist.push(...tmp);

let units = {};
for (let s of squares) {
    let tmp = [];
    for (let u of unitlist) {
        if (u.includes(s)) tmp.push(u);
    }
    units[s] = tmp;
}

let peers = {};
for (let s of squares) {
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
        for (let s2 of peers[s]) available = available && eliminate(values, s2, d2) !== false;
        if (!available) return false;
    }

    for (let u of units[s]) {
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
    for (let d2 of other_values) {
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
    for (let s of squares) {
        values[s] = digits;
    }
    for (let value of Object.entries(grid_values(grid))) {
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
    for (let e of seq)
        if (e) return e;
    return false;
}

function search(values) {
    if (values == false) return false;
    let all_len_is_1 = true;
    for (let s of squares) {
        all_len_is_1 = all_len_is_1 && values[s].length == 1;
    }
    if (all_len_is_1) return values;
    let n = 9, s;
    for (let sq of squares) {
        if (values[sq].length < n && values[sq].length > 1) {
            n = values[sq];
            s = sq;
        }
    }
    let result = [];
    for (let d of values[s]) {
        result.push(search(assign(Object.assign({}, values), s, d)));
    }
    return some(result);
}

let button_elem = document.getElementById('solve_button');
button_elem.addEventListener('click', () => {
    let grid = '';
    for (let r of rows) {
        for (let c of cols) {
            let cell = document.getElementById(r + c);
            let number = cell.value;
            if (cell.value == '') grid += '0';
            else grid += cell.value;
        }
    }
    let result = solve(grid);
    for (let value of Object.entries(result)) {
        let s, d = value;
        let cell = document.getElementById(s);
        cell.value = d[0];
    }
});
