import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import shallow from 'zustand/shallow'
import { MyPolygon, MyRay, MyPolygonWithLabel } from '../Controls/graph'
import { Polygon } from '../types'
import { fabric } from 'fabric'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'

export interface PolygonProps {
  polygon: Polygon
  dataIndex: number
  onLabelChange: (polygon: Polygon, newLabel: string) => void
}

export const PolygonComponent = ({
  polygon,
  dataIndex,
  onLabelChange
}: PolygonProps): JSX.Element => {
  const { fabCanvas, polygons } = useStore(
    (state) => ({
      fabCanvas: state.fabCanvas,
      polygons: state.polygons
    }),
    shallow
  )
  const objRef = useRef<MyPolygonWithLabel | undefined>()
  const rayRef = useRef<fabric.Group | undefined>()
  const [diaOpen, setDiaOpen] = useState<boolean>(false)
  const [labelName, setLabelName] = useState<string>(
    polygon?.labelName ?? 'init_label_' + dataIndex
  )
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClickOpen = () => {
    setDiaOpen(true)
  }

  const handleClose = () => {
    // click dialog close button, reInit the label value in dialog
    setLabelName(polygon?.labelName ?? 'init_label_' + dataIndex)
    setDiaOpen(false)
    setError(false)
    setErrorMessage('')
  }

  const handleOK = () => {
    if (!error) {
      onLabelChange(polygon, labelName)
      setDiaOpen(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      'handle input change',
      polygons
        .filter((poly: Polygon) => poly.id !== polygon.id)
        .map((poly: Polygon, index: number) =>
          poly.labelName ? poly.labelName : 'init_label_' + index
        )
    )
    const curInput = event.target.value.trim()
    if (curInput === '') {
      setError(true)
      setErrorMessage('Label name can not be empty string')
      return
    }

    const otherLables = polygons
      .filter((poly: Polygon) => poly.id !== polygon.id)
      .map((poly: Polygon, index: number) =>
        poly.labelName ? poly.labelName : 'init_label_' + index
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

  useEffect(() => {
    // console.log(`polygonComponent useEffect`)
    if (fabCanvas === undefined) {
      return
    }
    if (objRef.current === undefined) {
      if (polygon?.isRay) {
        const currentObj = new MyPolygon({
          id: polygon.id,
          points: polygon.points,
          isRay: polygon?.isRay || false
        })
        const rayObj = new MyRay({
          polygonLineId: polygon.id,
          polygonLine: currentObj,
          startPoint: polygon.points[0],
          endPoint: polygon.points[1],
          textContent: labelName,
          handleLabelChange: handleClickOpen
        })
        rayRef.current = rayObj
        fabCanvas.add(rayRef.current)
      } else {
        const currentObj = new MyPolygon({
          id: polygon.id,
          points: polygon.points,
          isRay: polygon?.isRay || false
        })
        const curObjWithlabel = new MyPolygonWithLabel({
          polygon: polygon,
          polygonObj: currentObj,
          textContent: labelName,
          handleLabelChange: handleClickOpen
        })
        objRef.current = curObjWithlabel
        fabCanvas.add(objRef.current)
      }

      fabCanvas.requestRenderAll()
    }

    return () => {
      // console.log(`polygonComponent useEffect - return`)
      if (fabCanvas && objRef.current) {
        fabCanvas.remove(objRef.current)
        objRef.current = undefined
      }
      if (fabCanvas && rayRef.current) {
        fabCanvas.remove(rayRef.current)
        rayRef.current = undefined
      }
    }
  }, [polygon.id, polygon.labelName])

  // TODO 逻辑画新线的时候显示让其输入文本？
  // TODO 将对话框提取出来，传入开关状态和要修改的对象，去控制。
  return (
    <>
      <Dialog open={diaOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Change Label Name</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Please name a label for this ROI region."
            // value={labelName}
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
    </>
  )
}
