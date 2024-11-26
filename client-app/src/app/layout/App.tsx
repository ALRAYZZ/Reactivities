import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);



  //We do and if check to see if the app is loading. If it is, we will display the loading screen.
  if (activityStore.loadingInitial) return <LoadingComponents content='Loading app' />

// NavBar and ActivityDashboard are components that are imported 
// from the NavBar.tsx and ActivityDashboard.tsx files, respectively.

// Inside ActivityDashboard we have two components: ActivityList and ActivityDetails.
  return (
    <>
      <NavBar /> 
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
