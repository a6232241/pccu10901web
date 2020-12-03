let re = new RegExp(/\w{6,}/)
let pwdCheck = false
$('#pwd, #rePwd').on('change', (e) => {
  if (re.test(e.target.value) && $('#rePwd').val() === $('#pwd').val()) {
    pwdCheck = true
  } else {
    pwdCheck = false
  }
})

$('form').on('change', () => {
  //   console.log($('form').serialize())

  $('#result').val(
    `姓名：${$('#myself').val()}
      性別：${$('#male')[0].checked ? '男' : '女'}
      年齡：${$('#age').val()}
      密碼 ${pwdCheck ? 'OK' : 'NO'}
      班級：${$('#class').val()}`
  )
})
