let grid_elem = document.getElementById('grid');
let rows = 'ABCDEFGHI';
let cols = '123456789';

for (let r of rows) {
    let tr = document.createElement('tr');
    grid_elem.appendChild(tr);
    let current_row = grid_elem.lastChild;
    for (let c of cols) {
        let cell = document.createElement('th');
        let input_node = document.createElement('input');
        input_node.setAttribute('type', 'number');
        input_node.setAttribute('id', r + c);
        cell.appendChild(input_node);
        current_row.appendChild(cell);
    }
}
