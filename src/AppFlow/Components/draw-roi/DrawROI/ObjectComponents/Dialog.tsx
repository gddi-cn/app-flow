import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { Polygon } from '../types'

export interface DialogProps {
  pologon: Polygon
  openDialog: boolean
}
export const PologonDialog = () => {
  return (
    <Dialog open={diaOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Change Label Name</DialogTitle>
    </Dialog>
  )
}
