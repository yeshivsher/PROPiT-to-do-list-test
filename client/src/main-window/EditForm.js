import React, { useEffect, Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    paperRoot: {
        width: 250
    },
    dialogRoot: {

    },
    dialogContentRoot: {
        padding: '8px 20px'
    },
    dialogContent: {
        // width: '100%'
    },
    title: {
        height: 30
    }
})

const EditForm = (props) => {
    // globals
    const classes = useStyles();

    // props
    const {
        setNotOpenEditForm,
        editTodo,
        elementData
    } = props

    // locals
    const [open, setOpen] = useState(true)
    const [todoItem, setTodoItem] = useState({ ...elementData })

    const handleChange = name => event => {
        setTodoItem({
            ...todoItem,
            [name]: event.target.value,
        })
    }

    const handleSubmit = () => {
        setOpen(false)
        setNotOpenEditForm()
        editTodo(todoItem)
    }

    const handleClose = () => {
        setNotOpenEditForm()
        setOpen(false)
    }

    useEffect(function () {
        console.log('EditForm useEffect -> EditForm')
    }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="todo"
            classes={{
                paper: classes.paperRoot,
                root: classes.dialogRoot
            }}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
        >
            <div id="title" className={classes.title}>
                <DialogTitle className={classes.titleText} >Edit Todo Item</DialogTitle>
            </div>
            <DialogContent
                classes={{
                    root: classes.dialogContentRoot,
                }}
                className={classes.dialogContent}>
                <TextField
                    required
                    margin="dense"
                    id="title"
                    label="title"
                    type="text"
                    value={todoItem.title}
                    onChange={handleChange('title')}
                />
            </DialogContent>
            <DialogActions style={{ padding: 0, background: 'aliceblue' }}>
                <Button onClick={handleSubmit} color="primary">
                    Save
                    </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditForm