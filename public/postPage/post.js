//post.js
const eventList = (events) => {
  document.getElementById('eventListP').innerHTML = ''
  events.forEach(event => {
    let eventElem = document.createElement('div')
    eventElem.innerHTML = `
  <p>
    <a href = "post.html" class="eventLink" data-eventtitle = "${event.title}" data-eventid="${event.id}">${event.title}</a>
  </p>
  <br>
  `
    document.getElementById('eventListP').append(eventElem)
  })
}

//Get Request for Events
let showList = () => {
  axios.get('/event')
    .then(({ data }) => {
      eventList(data)
    })
    .catch(e => console.error(e))
}
showList()

//Submit Event
document.getElementById('submitEvent').addEventListener('click', e => {
  e.preventDefault()
  let userName = localStorage.getItem('username')
  let newEvent = document.getElementById('newEvent').value

  let event = {
    title: document.getElementById('newEvent').value,
  }
  document.getElementById('newEvent').value = ""

  // to prevent empty events being created or people not logged in
  if (newEvent === '' || !userName) {
    console.log('please try again')
  } else {
    axios.post('/event', event)
      .then(() => {
        console.log(newEvent)
       showList()
      })
      .catch(e => console.log(e))
  }
})

//Clicking an Event Link
let eventInfo = {}
document.addEventListener('click', e => {
  if (e.target.className === "eventLink") {
    let eTitle = e.target.dataset.eventtitle
    let eId = e.target.dataset.eventid
    localStorage.setItem(`eventId`, eId)
    localStorage.setItem(`eventTitle`, eTitle)
    console.log(eId)
    console.log(eTitle)
    eventInfo = {
      eTitle,
      eId
    }
  }
})

let addItem = (item) => {
  axios.post('/item', item)
    .then(() => {
      postedItems()
    })
    .catch(e => console.log(e))
}

// Post item
document.getElementById('post').addEventListener('click', e => {
  e.preventDefault()

  let userName = localStorage.getItem('username')
  let eventName = localStorage

  if (!userName && !eventName) {
    console.log('need to be logged in!')
  } else {

    let item = {
      title: document.getElementById('item').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      contact: localStorage.getItem('userEmail'),
      eventId: localStorage.getItem('eventId'),
      userId: localStorage.getItem('userId')
    }
    document.getElementById('item').value = ''
    document.getElementById('description').value = ''
    document.getElementById('date').value = ''
    addItem(item)
  }
})

// Show name 
let renderName = () => {
  let userName = localStorage.getItem('username')
  document.getElementById('greeting').textContent = userName
}
renderName()

// Show event
let showEvent = () => {
  let eventTitle = localStorage.getItem('eventTitle')
  document.getElementById('eventNameP').textContent = eventTitle
}
showEvent()

// Found items
let buildPosted = (items) => {
  document.getElementById('postedItems').innerHTML = ''
  items.forEach(item => {
    console.log(item)
    let itemElem = document.createElement('div')
    itemElem.className = item.isReturned ? 'claimed' : 'unclaimed'
    itemElem.innerHTML = `
  <div class="card medium">
  <h4>${item.title}</h4>
  <p>description: ${item.description}</p>
  <p>contact: ${item.contact}</p>
  <br>
  <a class="waves-effect waves-light btn-small ${item.isReturned ? 'Returned to owner' : 'Yet to be claimed'}" data-itemId = ${item.id} >${item.isReturned ? 'Returned to owner' : 'Yet to be claimed'}</a>
  <a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons delete" data-itemId = ${item.id}>
delete</i></a>
  </div>
    `
    document.getElementById('postedItems').append(itemElem)
  })
}

let isFound = id => {
  axios.put(`/items/${id}`)
    .then(() => {
      parent.className = parent.className === 'Yet to be claimed' ? '' : 'Returned to owner'
      postedItems()
    })
    .catch(e => console.log(e))
}
// change item to found
document.addEventListener('click', e => {
if (e.target.className.includes('Yet to be claimed') || e.target.className.includes('Returned to owner')) {
  let itemId = e.target.dataset.itemid
 isFound(itemId)
}

if(e.target.className.includes('delete')) {
  let deleteId = e.target.dataset.itemid
  deletePost(deleteId)
}
})


let postedItems = () => {

  let userId = localStorage.getItem('userId')
  let eventId = localStorage.getItem('eventId')

  axios.get(`/items/${userId}/${eventId}`)
    .then(({ data }) => {
      buildPosted(data)

    })
    .catch(e => console.log(e))
}
postedItems()

// logout 
//  logout of homepage
document.getElementById('logoutBtn').addEventListener('click', e => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('userEmail')
  localStorage.removeItem(`eventId`)
  localStorage.removeItem(`eventTitle`)
  window.location = '/index.html'
})

// delete a posted item
let deletePost = (id) => {

  axios.delete(`/items/${id}`)
  .then(() => {
    postedItems()
  })
  .catch(e => console.log(e))
}




