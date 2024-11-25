import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}


// Here we are adding to the main group Activity dashboard, two columns:
// The first column is the ActivityList component that is receiving the activities as props.
// The second column is the ActivityDetails component that is receiving the first activity from the activities array.
export default function ActivityDashboard({activities, selectActivity, selectedActivity,
     cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                 />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    // Here we are passing the selectedActivity, cancelSelectActivity, and openForm
                    // as props to the ActivityDetails component.
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                    
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}