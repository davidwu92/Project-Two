//app.js
const buildEvent = ({id, title}) => {
  console.log(id)
  console.log(title)
  let eventElem = document.createElement('div')
  event.className = "eventLink" //add event listeners on eventLink classname; PASS DOWN EVENT ID
  eventElem.innerHTML = `
  <p>
    <a data-eventId="${id}">${title}</a>
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