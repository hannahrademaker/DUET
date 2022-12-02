  import axios from 'axios'
  
  const events = (state = [], action)=>{
    if(action.type === 'CONNECT_TICKETMASTER'){
      return action.events
    }
    return state;
  };
  
  export const fetchTicketMasterEvents= ()=>{
    return async(dispatch)=>{
      const response = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=IRoHrGju8dFok59ErhtjYRBISfjoZ3Xy", {
        headers: {
          Host: 'app.ticket.com',
          'X-Target-URI': 'https://app.ticketmaster.com',
          Connection: 'Keep-Alive'
          
        }
      });
      dispatch({ type: 'CONNECT_TICKETMASTER', events: response.data.tems})
    };
  };
  
  export default events;