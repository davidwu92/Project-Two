//post.js
const eventList = (events) => {
  document.getElementById('eventListP').innerHTML = ''
  events.forEach(event => {
    let eventElem = document.createElement('div')
    eventElem.innerHTML = `
    <a href = "post.html" class="eventLink pink-text" data-eventtitle = "${event.title}" data-eventid="${event.id}">${event.title}</a>
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
    if (!userName) {
      M.toast({ html: `You must be logged in.` })
    }
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
document.getElementById('test').addEventListener('click', e => {
  if (e.target.className === "eventLink pink-text") {
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
  let eventName = localStorage.getItem('eventTitle')

  if (!userName || !eventName) {
    if (!userName) {
      M.toast({ html: `You must be logged in.` })
    }
    if (!eventName) {
      M.toast({ html: `Please enter the event where the item was found.` })
    }
  } else {
    let item = {
      title: document.getElementById('item').value,
      description: document.getElementById('description').value,
      contact: localStorage.getItem('userEmail'),
      eventId: localStorage.getItem('eventId'),
      userId: localStorage.getItem('userId')
    }
    document.getElementById('item').value = ''
    document.getElementById('description').value = ''
    M.toast({ html: `Item successfully posted!` })
    addItem(item)
  }
})

// Show name 
let renderName = () => {
  let userName = localStorage.getItem('username')
  if (userName) {
    document.getElementById('greeting').textContent = `Welcome ${userName}!`
  } else {
    document.getElementById('greeting').textContent = 'Please sign in to post found items!'
  }
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
  <div class="card small animated flipInX" style="padding: 5px;" >
  <h4 class="pink-text center-align">${item.title}</h4>
  <h5 class="center-align">description:</h5>
  <h5 class="pink-text center-align">${item.description}</h5>
  <h5 class="center-align">Contact Info:</h5>
  <h5 class ="pink-text center-align"><a href="mailto:${item.contact}">${item.contact}</a></h5>
  <br>
  <div class="postBtn" style="padding: 15px;">
  <a class="pink lighten-1 waves-effect waves-light btn-small ${item.isReturned ? 'Returned to owner' : 'Yet to be claimed'}" data-itemId = ${item.id} >${item.isReturned ? 'Returned to owner' : 'Yet to be claimed'}</a>
  </div>
  <a class="btn-floating btn-small waves-effect waves-light pink darken-3"><i class="material-icons delete" data-itemId = ${item.id}>
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

  if (e.target.className.includes('delete')) {
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
let signPost = () => {
  let userName = localStorage.getItem('username')
  if (userName) {
    document.getElementById('logoutBtn').addEventListener('click', e => {
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      localStorage.removeItem('userEmail')
      localStorage.removeItem(`eventId`)
      localStorage.removeItem(`eventTitle`)
      window.location = '/index.html'
    })
  } else {
    document.getElementById('signPost').textContent = 'sign in'
  }

}
signPost()

// delete a posted item
let deletePost = (id) => {

  axios.delete(`/items/${id}`)
    .then(() => {
      postedItems()
    })
    .catch(e => console.log(e))
}




