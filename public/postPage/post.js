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
    console.log('please try again')
  } else {
    axios.post('/event', event)
      .then(() => {
        console.log(newEvent)
        // showEvents()
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
  </div>
    `
    document.getElementById('postedItems').append(itemElem)
  })
}


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


