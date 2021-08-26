import { makeStyles } from '@material-ui/core/styles';

const useClasses = makeStyles((theme) => ({
    body: {
        padding: 80, 
        '& .buttons *': {

        },
        '& .inputs': {
            margin: '10px 0',
            display: 'block'
        },


    },
    dragNdrop:{
        minHeight: 150,
        marginTop: 10
    },
    dragNdropPreview: {
        minWidth: 120,
        maxWidth: 220
    },
    createButton: {
        position: 'fixed',
        padding: '10px 15px',
        right: '3%',
        bottom: '3%',
        backgroundColor: '#ff2975bb',
        color: '#fff',
        borderRadius: 20,
        minHeight: 45,
        minWidth: 120,
        fontSize: 16,
        '&:hover': {
            transition: 'margin-left 2s ease',
            backgroundColor: '#ff295fdd',
        },

    },

}))

export default useClasses