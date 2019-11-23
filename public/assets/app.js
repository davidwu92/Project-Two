//app.js
const buildEvent = ({id, title}) => {
  let eventElem = document.createElement('div')
  // eventElem.className = "eventLink"
  //add event listeners on eventLink classname; PASS DOWN EVENT ID
  eventElem.innerHTML = `
  <p>
    <a class="eventLink" data-eventtitle = "${title}" data-eventid="${id}">${title}</a>
  </p>
  <br>
  `
  return eventElem
}

//GET REQUEST FOR EVENTS
axios.get('/event')
  .then(({data: events})=>{
    events.forEach(event => document.getElementById('eventList').append(buildEvent(event)))
  })
  .catch(e=>console.error(e))

//Submit Event
document.getElementById('submitEvent').addEventListener('click', e=>{
  e.preventDefault()
  let event = {
    title: document.getElementById('newEvent').value,
  }
  axios.post('/event', event)
  .then(() => {
    document.getElementById('eventList').append(buildEvent(event))
    document.getElementById('newEvent').value = ""
  })
  .catch(e=>console.log(e))
})

//CLICKING AN EVENT LINK
let eventInfo = {} 
document.addEventListener('click', e=>{
  if (e.target.className === "eventLink") {
    let eTitle = e.target.dataset.eventtitle
    let eId = e.target.dataset.eventid
    console.log(eId)
    console.log(eTitle)
    eventInfo = {
      eTitle,
      eId
    }
  }
})

//LOADING EVENT PAGE
