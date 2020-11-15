const changePage = (page) => {
  $('.active').removeClass('active')
  $(`.${page}`).addClass('active')
  $('.page').hide()
  $(`#${page}Page`).show()
  //   history.pushState(null, null, page)
}

let menu = document.querySelectorAll('#menu')
const className = ['announcement', 'course', 'example', 'photo', 'aboutMe']

// 在 li 新增 className、href、event
const addChangePageEvent = () => {
  for (let ul of menu) {
    for (let i = 0; i < ul.children.length; i++) {
      let li = ul.children[i]
      $(li).addClass(className[i])
      $(li.children[0]).attr('href', `#${className[i]}`)
      li.onclick = () => changePage(className[i])
    }
  }
}

addChangePageEvent()

changePage('announcement')
// window.addEventListener('hashchange', function () {
//   changePage(location.hash)
// })
