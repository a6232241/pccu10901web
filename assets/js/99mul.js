let tbody = document.querySelector('tbody')

let rgb = Math.pow(256, 2) - 1
let rgbAvg = Math.ceil(255 / 9)

for (let i = 1; i < 10; i++) {
  let tr = document.createElement('tr')

  let beforeColor = Math.floor(Math.random() * (rgb - 256) + 256)
  let afterColor = 255

  for (let j = 1; j < 10; j++) {
    let td = document.createElement('td')
    td.innerHTML = `${j}*${i} = ${i * j}`

    td.style.backgroundColor = `#${beforeColor.toString(16)}${afterColor.toString(16)}`
    afterColor -= rgbAvg

    tr.appendChild(td)
  }
  tbody.appendChild(tr)
}
