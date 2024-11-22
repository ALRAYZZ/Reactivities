import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Header, List } from 'semantic-ui-react';


function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5130/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])


  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activities.map((activitiy: any) => (
              <List.Item key={activitiy.id}>
                {activitiy.title}
              </List.Item>
            ))}
        </List>
        <ul>
          
        </ul>        
      
    </div>
  );
}

export default App;
