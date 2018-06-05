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

function eliminate(values, s, d) {
    if (!values[s].includes(d)) return values;
    values[s] = values[s].join('').replace(d, '').split('');
    if (values[s].length == 0) return false;
    else if (values[s].length == 1) {
        let d2 = values[s];
        let available = true;
        for (s2 of peers[s]) available = available && eliminate(values, s2, d2);
        if (!available) return false;
    }

    for (u of units[s]) {
        dplaces = u.filter(s => values[s].includes(d));
        if (dplaces.length == 0) return false;
        else if (dplaces.length == 1)
            if (!assign(values, dplaces[0], d))
                return false;
    }
}

function assign(values, s, d) {
    let other_values = values[s].join('').replace(d, '').split('');
    let available = true;
    for (d2 of other_values) {
        available = available && eliminate(values, s, d2);
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
        if (digits.includes(d) && !assign(values, s, d))
            return false;
    }
    return values;
}

function center(string, width, padding) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if (string.length < width) {
		let len	= width - string.length;
		let remain = (len % 2 == 0) ? "" : padding;
		let pads = padding.repeat(parseInt(len / 2));
		return pads + string + pads + remain;
	}
	else
		return string;
}

function display(values) {
    let width = 1 + Math.max(...squares.map(s => values[s].length));
    let line = Array(3).fill(['-'.repeat(width * 3)]).join('+');
    for (r of rows) {
        for (c of cols) {
            console.log(cols.map(c => center(values[r + c], width) + ('36'.includes(c) ? '|' : '').join('')));
            if ('CF'.includes(r)) console.log(line);
        }
    }
}

let grid1 = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'.split('');
display(parse_grid(grid1));
