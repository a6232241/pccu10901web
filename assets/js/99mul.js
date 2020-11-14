let tbody = document.querySelector('tbody')

for (let i = 1; i < 10; i++) {
    let tr = document.createElement('tr')
    for (let j = 1; j < 10; j++) {
        let td = document.createElement('td')
        td.innerHTML = `${j}*${i} = ${i * j}`
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
}