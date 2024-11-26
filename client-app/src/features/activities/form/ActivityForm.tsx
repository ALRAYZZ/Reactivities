import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';



export default  observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    //We are doing this to avoid the error of the activity being undefined.
    //If the activity is undefined, we will set the initial state to an empty object.
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    //We do this line to set the activity to the initial state.
    const[activity, setActivity] = useState(initialState);
    
    //This function is to handle the form submit. 
    //It does it by calling the createOrEdit function and passing the activity.
    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    //This function is to handle the input change. It does it by getting the name and value of the input.
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})