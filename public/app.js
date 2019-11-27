// going to delete this
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
  // eventElem.className = "eventLink"
  //add event listeners on eventLink classname; PASS DOWN EVENT ID
}


//GET REQUEST FOR EVENTS
let showEvents = () => {
axios.get('/event')
  .then(({ data })=>{
    // data.forEach(event => {
    //   storeEvents(event)
    // })
    buildEvent(data)
  })
  .catch(e=>console.error(e))
}
showEvents()


// var events = [];
// let storeEvents = (eventName) => {

// events.push(eventName)
//     localStorage.setItem("eventTitle", JSON.stringify(events));
// }


// //Submit Event
// document.getElementById('submitEvent').addEventListener('click', e=>{
//   e.preventDefault()
//    let newEvent = document.getElementById('newEvent').value

//   let event = {
//     title: document.getElementById('newEvent').value,
//   }
//   document.getElementById('newEvent').value = ""

// // too prevent empty events being created
// if (newEvent === '') {
//   console.log('please try again')
// } else {
//   axios.post('/event', event)
//   .then(() => {
//     console.log(newEvent)
//     showEvents()
//   })
//   .catch(e => console.log(e))
// }
// })

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



//LOADING EVENT PAGE
