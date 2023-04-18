
import React, { Fragment, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Loader from './Loader';
const Home = () => { 
  const navigate = useNavigate();
  let pressedStart = false;
  const weatherResponse = ["It's pleasant outside.You should take a walk.", "Its little gloomy outside", "Its sunny outside,wear your hat"];
  const [response, setResponse] = useState();
  const [lastCleaningTime, setLastCleaningTime] = useState(null);
  const [lastFetchednews, setLastFetchednews] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetch("/api/v1/shoppingList")
        .then((res) => res.json())
        .then((data) => setItems(data));
  },[]);
  const getResponse = (option) => {
    switch (option) {
      case 'start':
        pressedStart = true;
        setResponse("Hello there!, how can i help?");
        break;
      case 'weather':
        const weather = weatherResponse[Math.floor(Math.random() * weatherResponse.length)];
        setResponse(weather);
        break;
      case 'clean':
        const cleanTime = new Date();
        if (lastCleaningTime && cleanTime.getTime() - lastCleaningTime.getTime() < 10 * 60 * 1000) {
          const minutesSinceLastCleaning = Math.floor((cleanTime.getTime() - lastCleaningTime.getTime()) / (60 * 1000));
          setResponse(`I'm sorry, but the room was just cleaned ${minutesSinceLastCleaning} minute(s) ago. I hope it's not dirty again so soon.`);
        } else {
          setLastCleaningTime(cleanTime);
          setResponse('Cleaning the room...');
        }
        break;
      case 'news':
        const newsTime = new Date();
        if (lastFetchednews && newsTime.getTime() - lastFetchednews.getTime() < 1440 * 60 * 1000) {
          setResponse(`I think you don't get another newspaper the same day`);
        } else {
          setLastFetchednews(newsTime);
          setResponse('Fething the news paper');
        }
        break;
      default:
        setResponse("Hey i couldn't get you");
        break;
    }
  }
  const handleRoute = () => {
    navigate('/shoppingList');
  }
  return (
    <Fragment>
      <>
        <h2>Choose your questions from below</h2>
        <p>(checkout our chatbot too ;O)</p>
      </>
      <div className='main'>   
        <div className="e-card" id="basic">
        <CButton type="submit" onClick={() => getResponse('start')} disabled={pressedStart}>Click here to start!!!</CButton>
      <CCard style={{ width: '25rem', border:'3px solid gray'}}>
        <CCardBody>
          <CCardTitle>1</CCardTitle>
          <CCardText>
            How's the weather outside?
          </CCardText>
            <CButton type="submit" onClick={() => getResponse('weather')}>Go!</CButton>
        </CCardBody>
      </CCard>
        <CCard style={{ width: '25rem', border: '3px solid gray' }}>
        <CCardBody>
          <CCardTitle>2</CCardTitle>
          <CCardText>
            Clean my room
          </CCardText>
          <CButton type="submit" onClick={()=>getResponse('clean')}>Go!</CButton>
        </CCardBody>
      </CCard>
        <CCard style={{ width: '25rem', border: '3px solid gray' }}>
        <CCardBody>
          <CCardTitle>4</CCardTitle>
          <CCardText>
            Fetch the newspaper
          </CCardText>
          <CButton type="submit" onClick={()=>getResponse('news')}>Go!</CButton>
        </CCardBody>
      </CCard>
        <CCard style={{ width: '25rem', border: '3px solid gray' }}>
        <CCardBody>
          <CCardTitle>5</CCardTitle>
          <CCardText>
            Click here add more for shopping list
          </CCardText>
              <CButton type="submit" onClick={handleRoute}>Go!</CButton>
        </CCardBody>
          </CCard>
          <div>
            <ul>
              {items.map((item) => (
                <li key={item._id}>
                  {item.name} (saved at {item.savedAt.toString()})
                </li>
              ))}
            </ul>
          </div>
      </div>
        <div className='response' >
          {response ?
            <form >
              <h4>{response}</h4>
            </form>
            : <Loader />
          }
      </div>
      </div>
    </Fragment>
  )
};
export default Home;