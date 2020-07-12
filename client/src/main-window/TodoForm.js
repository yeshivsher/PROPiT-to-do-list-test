import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        alignSelf: 'center'
    },
}));

const TodoForm = ({ saveTodo }) => {
    const classes = useStyles();

    const [value, setValue] = useState('');

    const handleSubmit = (value) => {
        return e => {
            e.preventDefault();
            saveTodo(value);
            setValue('');
        };
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit(value)}>
            <TextField
                onChange={(e) => setValue(e.target.value)}
                value={value}
                variant="outlined"
                placeholder="Add todo"
                margin="normal" />
        </form>
    );
};

export default TodoForm;