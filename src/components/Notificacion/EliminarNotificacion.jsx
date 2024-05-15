import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState } from 'react'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import useFetch from '../../services/hooks/useFetch'
import { IconButton } from '@mui/material'
import { directus } from '../../services/directus'
import { deleteFile } from '@directus/sdk'

const EliminarNotificacion = ({ noti_id,noti_file }) => {
    const { eliminar } = useFetch()
    const [open, setOpen] = useState(false)

    const eliminarArchivo = async () => {
        try {
            await directus.request(deleteFile(noti_file))
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarNoti = async () => {
        try {
            
            await eliminarArchivo()
            // Elimina la Cartilla por su id
            await eliminar(noti_id,'Notificacion','DELETE_NOTI',{})

            
        } catch (error) {
            console.error('Error en la consulta', error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCloseElimnar = async () => {
        await eliminarNoti()
        setOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <IconButton color="" size="large" onClick={handleClickOpen}>
                <DeleteSharpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Eliminar Notificacion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Realmente desea eliminar esta Notificacion?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancelar
                    </Button>
                    <Button autoFocus onClick={handleCloseElimnar}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EliminarNotificacion

