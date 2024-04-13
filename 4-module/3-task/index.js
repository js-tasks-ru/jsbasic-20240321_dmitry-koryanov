function highlight(table) {
  let rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];

    if (row.cells[3].dataset.available === 'true') {
      row.classList.add('available');
    } else if (row.cells[3].dataset.available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', '');
    }

    let gender = row.cells[2].textContent;

    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    let age = Number(row.cells[1].textContent);

    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
