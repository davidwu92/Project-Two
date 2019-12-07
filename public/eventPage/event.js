//event js
let renderEvent = () => {
  let eventTitle = localStorage.getItem('eventTitle')
  document.getElementById('eventName').textContent = eventTitle
}
renderEvent()

// Search for lost items 
let buildFound = (items) => {
  document.getElementById('foundItems').innerHTML = ''
  items.forEach(item => {
    let itemElem = document.createElement('div')
    itemElem.innerHTML = `
  <div class="card-panel">
  <h4 class="pink-text center-align">${item.title}</h4>
    <div class="card-content">
      <h5 class="center-align">Description:</h5>
      <h5 class="pink-text center-align">${item.description}</h5>
      <h5 class="center-align">Contact Info:</h5>
     <h6 class="pink-text center-align"><a href="mailto:${item.contact}">${item.contact}</a></h6>
    </div>
  </div>
    `
    document.getElementById('foundItems').append(itemElem)
  })
}

// Search for item
let searchItem = (term) => {
  axios.post('/items', term)
    .then(({ data }) => {
      buildFound(data)
    })
    .catch(e => console.log(e))
}

// Post to search for lost item
document.getElementById('search').addEventListener('click', e => {
  e.preventDefault()
  let keywords = document.getElementById('itemDesc').value.split(' ')
  keywords = keywords.filter(word => word !== '').map(word => `%${word}%`)

  let term = {
    eventId: localStorage.getItem('eventId')
  }

  if (document.getElementById('itemName').value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length) {
    term.title = `%${document.getElementById('itemName').value}%`
  }

  if (keywords.length) {
    term.keywords = keywords
  }


  document.getElementById('itemName').value = ''
  document.getElementById('itemDesc').value = ''

  searchItem(term)
})

// logout to homepage
document.getElementById('logoutBtn').addEventListener('click', e => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('userEmail')
  localStorage.removeItem(`eventId`)
  localStorage.removeItem(`eventTitle`)
  window.location = '/index.html'
})
