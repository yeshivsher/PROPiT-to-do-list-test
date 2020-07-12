import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';


const DONE_COLOR = '#4caf50'

const useStyles = makeStyles(theme => ({
    root: {

    },
    doneButton: {
        background: DONE_COLOR
    },
    doneIcon: {
        color: DONE_COLOR,
    },
    listItemContainer: {
        margin: 15,
    },
    listItem: {
        height: 50
    },
    listItemText: {
        width: '25%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: 15
    },
    fab: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    fabDone: {
        height: 40,
        alignSelf: 'center',
        width: 40,

    },
    fabRoot: {
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2)'
    }
}));

const TodoList = props => {
    const { todos, deleteTodo, setTodoDone, setOpenEditForm, setElementData } = props
    const classes = useStyles();

    const getDateDisplayFormat = (date) => {
        let toJsonFormat = new Date(date)

        toJsonFormat = toJsonFormat.toString()
        toJsonFormat = toJsonFormat.substr(0, toJsonFormat.indexOf('GMT'))

        return toJsonFormat
    }

    return (
        <Fragment>
            <Paper
                key="titles"
                className={classes.listItemContainer}>
                <ListItem
                    dense
                    button
                    className={classes.listItem}
                    style={{ background: '#cecece' }}
                >
                    <ListItemText primary="Title" className={classes.listItemText} />
                    <ListItemText primary="Created Date" className={classes.listItemText} />
                    <ListItemText primary="Modified Date" className={classes.listItemText} />
                    <ListItemText primary="" className={classes.listItemText} />
                </ListItem>
            </Paper>
            <List>
                {
                    todos.map((todo, index) => {
                        let createdDateFormated = getDateDisplayFormat(todo.createdDate)
                        let modifiedDateFormated = getDateDisplayFormat(todo.modifiedDate)

                        return (
                            <Paper
                                key={todo._id.toString()}
                                className={classes.listItemContainer}>
                                <ListItem dense button className={classes.listItem}>
                                    {/* <Checkbox tabIndex={-1} disableRipple /> */}
                                    <ListItemText primary={todo.title} className={classes.listItemText} />
                                    <ListItemText primary={createdDateFormated} className={classes.listItemText} />
                                    <ListItemText primary={modifiedDateFormated} className={classes.listItemText} />
                                    <div className={classes.listItemText} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Fab className={classes.fabDone}
                                            classes={{ root: classes.fabRoot }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setTodoDone(todo)
                                            }}
                                            style={{ color: todo.done ? DONE_COLOR : 'gray' }}>
                                            <DoneIcon />
                                        </Fab>
                                        <Fab
                                            classes={{ root: classes.fabRoot }}
                                            className={classes.fab}
                                            color="primary"
                                            aria-label="delete"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteTodo(todo._id)
                                            }}>
                                            <DeleteIcon />
                                        </Fab>
                                        <Fab
                                            classes={{ root: classes.fabRoot }}
                                            className={classes.fab}
                                            color="secondary"
                                            aria-label="edit"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setElementData(todo)
                                                setOpenEditForm()
                                            }}>
                                            <EditIcon />
                                        </Fab>
                                    </div>
                                </ListItem>
                            </Paper>
                        )
                    })
                }
            </List>
        </Fragment >
    )
}

export default TodoList;
