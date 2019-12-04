    let renderEvent = () => {
      let eventTitle = localStorage.getItem('eventTitle')
      document.getElementById('eventName').textContent = eventTitle
    }
    renderEvent()

        // working code to search for lost items Just need to find out how to search for words in no order
let buildFound = (items) => {
    document.getElementById('foundItems').innerHTML = ''
  items.forEach(item => {
    let itemElem = document.createElement('div')
    itemElem.innerHTML = `
  <div class="card medium">
  <h4>${item.title}</h4>
  <p>${item.description}</p>
  <p>${item.contact}</p>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Reveal Contact Info if this is your item<i class="material-icons right"></i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${item.contact}<i class="material-icons right">close</i></span>
      <p>Please double check to see if lost item is yours before contacting</p>
    </div>
  </div>
    `
    document.getElementById('foundItems').append(itemElem)
  })
}

    // search for item
let searchItem = (term) => {
  axios.post('/items', term)
    .then(({ data }) => {
      buildFound(data)
    })
    .catch(e => console.log(e))
}

// post to search for lost item
    document.getElementById('search').addEventListener('click', e => {
      e.preventDefault()
      let keywords = document.getElementById('itemDesc').value.split(' ')
      keywords = keywords.filter(word => word !== '').map(word => `%${word}%`)
     
      let term = {
        eventId: localStorage.getItem('eventId') 
      }

      if (document.getElementById('itemName').value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length) {
        term.title =  `%${document.getElementById('itemName').value}%`
      }

      if (keywords.length) {
        term.keywords = keywords
      }

      
      document.getElementById('itemName').value = ''
      document.getElementById('itemDesc').value = ''
      
     searchItem(term)
    })
    