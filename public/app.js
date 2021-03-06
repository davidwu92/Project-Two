//app.js
const buildEvent = (events) => {
  document.getElementById('eventList').innerHTML = ''
  events.forEach(event => {
    let eventElem = document.createElement('tr')
    eventElem.innerHTML = `
    <td>
    <a href = "./eventPage/event.html" class="eventLink pink-text" data-eventtitle = "${event.title}" data-eventid="${event.id}">${event.title}</a>
    </td>
  `
    document.getElementById('eventList').append(eventElem)
  })
}

//Get Request for Events
let showEvents = () => {
  axios.get('/event')
    .then(({ data }) => {
      buildEvent(data)
    })
    .catch(e => console.error(e))
}
showEvents()

//Clicking an Event
let eventInfo = {}
document.addEventListener('click', e => {
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

// switch text content from events to search
document.getElementById('eventName').addEventListener('click', e => {

if (e.target.firstChild.textContent === 'Click to search for events') {
 document.getElementById('eventName').innerHTML = 'events'
} else if (e.target.firstChild.textContent === 'events') {
  document.getElementById('eventName').innerHTML = 'Click to search for events'
}

})


// signIn/signUp javascript
let method = 'Sign In'

const toggleMethod = bool => {
  method = bool ? "Sign up" : "Sign In"
  document.getElementById('emailDiv').style.display = bool ? 'block' : 'none'
  document.getElementById('methodName').textContent = bool ? 'Up' : 'In'
}

// changes from Sign In to Sign up and back
document.getElementById('method').addEventListener('click', e => {
  e.target.checked ? toggleMethod(true) : toggleMethod(false)
})

// sign up
const signUp = user => {
  axios.post('/users', user)
    .then(({ data: user }) => {
      localStorage.setItem(`userId`, user.id)
      localStorage.setItem(`username`, user.username)
      localStorage.setItem(`userEmail`, user.email)
      localStorage.removeItem(`eventId`)
      localStorage.removeItem(`eventTitle`)
      window.location = './postPage/post.html'
      // changeViews()
    })
}


// sign in
const signIn = (username, password) => {
  axios.get(`/users/${username}/${password}`)
    .then(({ data: user }) => {
      if (user) {
        localStorage.setItem(`userId`, user.id)
        localStorage.setItem(`username`, user.username)
        localStorage.setItem(`userEmail`, user.email)
        localStorage.removeItem(`eventId`)
        localStorage.removeItem(`eventTitle`)

        // testing
        let username = localStorage.getItem('username')
        let userId = localStorage.getItem('userId')
        let userEmail = localStorage.getItem('userEmail')
        console.log(username)
        console.log(userId)
        console.log(userEmail)

        // changeViews()
        window.location = './postPage/post.html'
      } else {
        document.getElementById('rejectLogin').style.display = 'block'
      }
    })
    .then(() => {

    })
    .catch(e => console.log(e))
}


// Sign In Btn Click Event
document.getElementById('loginBtn').addEventListener('click', e => {
  e.preventDefault()
  method === 'Sign In' ? signIn(document.getElementById('username').value, document.getElementById('password').value
  ) : signUp({
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  })
  document.getElementById('username').value = ''
  document.getElementById('email').value = ''
  document.getElementById('password').value = ''
})


// Sign In / Sign Up Card Display
const changeViews = () => {
  let username = localStorage.getItem('username')
  let userId = localStorage.getItem('userId')

  console.log(username)
  console.log(userId)

  if (!username && !userId) {
    //Display sign in/sign up
    document.getElementById('login').style.display = 'block'

    // Events Collapsible Card Click event if not signed in
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.collapsible')
      var instances = M.Collapsible.init(elems, {
        inDuration: 100,
        outDuration: 100
      })
    })
  } else {
    //Remove sign in/sign out once signed in
    document.getElementById('login').style.display = 'none'
    document.getElementById('accountMsg').style.display = 'none'

    // Events Collapsible Card auto opens when signed in
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelector('.collapsible');
      var instances = M.Collapsible.init(elems);
      document.getElementById('eventName').innerHTML = 'events'
      instances.open();
    })
  }
}
document.getElementById('emailDiv').style.display = 'none'
changeViews()


// lost items count show
let showLost = () => {
  axios.get('/items')
    .then(({ data }) => {
      document.getElementById('lostItems').innerHTML = `<h5 class="logo">Total items lost: ${data.length}</h5>`
    })
    .catch(e => console.log(e))
}
showLost()

// found items count show
let showFound = () => {
  axios.get('/itemsfound')
    .then(({ data }) => {
      document.getElementById('foundItems').innerHTML = `<h5 class="logo">Total items returned: ${data.length}</h5>`
    })
    .catch(e => console.log(e))
}
showFound()

//  logout of homepage
let signHome = () => {
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
  document.getElementById('signHome').textContent = 'sign in'
}

}
signHome()



