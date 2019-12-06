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
  <div class="card medium">
  <h4>${item.title}</h4>
  <p>${item.description}</p>
  <p>${item.contact}</p>
  <p>${item.isReturned ? 'Returned to owner' : 'Yet to be claimed'}</p>
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
