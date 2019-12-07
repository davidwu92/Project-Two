//  logout of homepage
let signAbout = () => {
  let userName = localStorage.getItem('username')
  if(userName) {
document.getElementById('logoutBtn').addEventListener('click', e => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('userEmail')
  localStorage.removeItem(`eventId`)
  localStorage.removeItem(`eventTitle`)
  window.location = '/index.html'
})
} else {
  document.getElementById('signAbout').textContent = 'sign in'
}

}
signAbout()