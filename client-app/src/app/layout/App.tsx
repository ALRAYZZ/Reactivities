import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agents';
import LoadingComponents from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // This code is used to select an activity from the list of activities.
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  //This constant loading is used to simulate the loading of the app.
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    //Configuring the date to be displayed in the format YYYY-MM-DD
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(response);
      //We are setting the loading to false so that the loading screen disappears.
      setLoading(false);
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
    setSubmitting(true);

    //This whole if and else statement is used to check if the activity has an id and 
    //if it does, we will update the activity. If it doesn't, we will create a new activity.
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
    }) 
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } 
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  //We do and if check to see if the app is loading. If it is, we will display the loading screen.
  if (loading) return <LoadingComponents content='Loading app' />

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
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
