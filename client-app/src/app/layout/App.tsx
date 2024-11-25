import { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // This code is used to select an activity from the list of activities.
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5130/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  // This function is used to select an activity from the list of activities.
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }
 // This function is used to cancel the selection of an activity from the list of activities.
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
// This function is used to open the form to create a new activity. 
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
// This function is used to close the form to create a new activity.
  function handleFormClose() {
    setEditMode(false);
  }

  // This function is used to create or edit an activity.
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }


// NavBar and ActivityDashboard are components that are imported 
// from the NavBar.tsx and ActivityDashboard.tsx files, respectively.

// Inside ActivityDashboard we have two components: ActivityList and ActivityDetails.
  return (
    <>
      <NavBar openForm={handleFormOpen} /> 
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
