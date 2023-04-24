import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { Polygon } from '../types'
import { useStore } from '../store/useStore'
import shallow from 'zustand/shallow'

export interface DialogProps {
  openDialog: boolean
  onLabelChange: (polygon: Polygon, newLabel: string) => void
}
export const PolygonDialog = ({
  openDialog,
  onLabelChange
}: DialogProps): JSX.Element => {
  const { polygons, dialogPolygon, setDialogPolygonOpen } = useStore(
    (state) => ({
      polygons: state.polygons,
      dialogPolygon: state.dialogPolygon,
      setDialogPolygonOpen: state.setDialogPolygonOpen
    }),
    shallow
  )

  const [labelName, setLabelName] = useState<string>(
    dialogPolygon?.labelName ?? 'init_label'
  )
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClose = () => {
    setLabelName(dialogPolygon?.labelName ?? 'init_label')
    setDialogPolygonOpen(false)
    setError(false)
    setErrorMessage('')
  }

  const handleOK = () => {
    if (!error) {
      onLabelChange(dialogPolygon, labelName)
      setDialogPolygonOpen(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curInput = event.target.value.trim()
    if (curInput === '') {
      setError(true)
      setErrorMessage('Label name can not be empty string')
      return
    }

    const otherLables = polygons
      .filter((poly: Polygon) => poly.id !== dialogPolygon.id)
      .map((poly: Polygon, index: number) =>
        poly.labelName ? poly.labelName : '' + index
      )
    if (otherLables.indexOf(curInput) !== -1) {
      setError(true)
      setErrorMessage('Please input a unique label name')
      return
    }

    setError(false)
    setErrorMessage('')
    setLabelName(curInput)
    return
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Change Label Name</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Please name a label for this ROI region."
          defaultValue={labelName}
          onChange={handleInputChange}
          error={error}
          helperText={errorMessage}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOK} disabled={error}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
