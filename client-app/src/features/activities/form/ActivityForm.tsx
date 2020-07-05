import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
    setEditMode, 
    activity: initialFormState, 
    createActivity, 
    editActivity,
    submitting
}) => {
    
    const initializeForm = () => {
        if(initialFormState) {
            return initialFormState;
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id:uuid()
            }
            createActivity(newActivity);
        }
        else editActivity(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    name='title'
                    onChange={handleInputChange}
                    placeholder='Title'
                    value={activity.title}
                />
                <Form.TextArea
                    name='description'
                    onChange={handleInputChange}
                    rows={2}
                    placeholder='Description'
                    value={activity.description}
                />
                <Form.Input
                    name='category'
                    onChange={handleInputChange}
                    placeholder='Category'
                    value={activity.category}
                />
                <Form.Input
                    type='dateTime-local'
                    name='date'
                    onChange={handleInputChange}
                    placeholder='Date'
                    value={activity.date}
                />
                <Form.Input
                    name='city'
                    onChange={handleInputChange}
                    placeholder='City'
                    value={activity.city}
                />
                <Form.Input
                    name='venue'
                    onChange={handleInputChange}
                    placeholder='Venue'
                    value={activity.venue}
                />
                <Button loading={submitting} floated='right' positive type='submit' content='submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' positive type='submit' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm;
