//app.js
const buildEvent = ({title}) => {
  let eventElem = document.createElement('a')
  eventElem.innerHTML = `
  ${title}
  `
}

//GET REQUEST FOR EVENTS
axios.get('/events')
  .then(({data: events})=>{
    events.foreach(event => document.getElementById('eventList').append(buildEvent(event)))
  })