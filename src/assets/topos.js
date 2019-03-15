module.exports = function() {
  var data = { users: [] }
  // crear 1000 users
  for (var i = 0; i < 10; i++) {
    data.users.push({ name: 'user' + i,username: i,email:"tihomir_alcudia3@hotmail.com"+i,id:(i*100) })
  }
  return data
}