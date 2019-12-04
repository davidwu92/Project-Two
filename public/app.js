
//app.js
const buildEvent = (events) => {
  document.getElementById('eventList').innerHTML = ''
      events.forEach(event => {
  let eventElem = document.createElement('div')
  eventElem.innerHTML = `
  <p>
    <a href = "./eventPage/event.html" class="eventLink" data-eventtitle = "${event.title}" data-eventid="${event.id}">${event.title}</a>
  </p>
  <br>
  `
    document.getElementById('eventList').append(eventElem)
      })
}


//GET REQUEST FOR EVENTS
let showEvents = () => {
axios.get('/event')
  .then(({ data })=>{
    buildEvent(data)
  })
  .catch(e=>console.error(e))
}
showEvents()


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
                    changeViews()
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
              
                changeViews()
                } else {
                    document.getElementById('rejectLogin').style.display = 'block'
                }
              })
              .then(() => {
                
              })
            
              .catch(e => console.log(e))
            }

      

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

            
          //  logout of homepage
            document.getElementById('logoutBtn').addEventListener('click', e => {
              localStorage.removeItem('userId')
              localStorage.removeItem('username')
              localStorage.removeItem('userEmail')
              localStorage.removeItem(`eventId`)
              localStorage.removeItem(`eventTitle`)
              changeViews()
            })

            const changeViews = () => {
              let username = localStorage.getItem('username')
              let userId = localStorage.getItem('userId')
        
              
              console.log(username)
              console.log(userId)
              
              if (!username && !userId) {
                document.getElementById('login').style.display='block'
                document.getElementById('home').style.display='none'
              } else {
                document.getElementById('login').style.display = 'none'
                document.getElementById('home').style.display = 'block'
                document.getElementById('greeting').textContent = username
              }
            }
            changeViews()
            document.getElementById('emailDiv').style.display = 'none'


//LOADING EVENT PAGE
