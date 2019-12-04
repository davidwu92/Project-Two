
//Submit Event
document.getElementById('submitEvent').addEventListener('click', e=>{
  e.preventDefault()
   let userName = localStorage.getItem('username')
   let newEvent = document.getElementById('newEvent').value

  let event = {
    title: document.getElementById('newEvent').value,
  }
  document.getElementById('newEvent').value = ""

// too prevent empty events being created or people not logged in
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

//CLICKING AN EVENT LINK
let eventInfo = {} 
document.addEventListener('click', e=>{
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

// post item
document.getElementById('post').addEventListener('click', e => {
  e.preventDefault()
  
  let userName = localStorage.getItem('username')

  if (!userName) {
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

// show event
    let showEvent = () => {
      let eventTitle = localStorage.getItem('eventTitle')
      document.getElementById('eventNameP').textContent = eventTitle
    }
    showEvent()

    // found items

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
    .then(({data })=> {
      buildPosted(data)
      
    })
    .catch(e => console.log(e))
}
postedItems()

