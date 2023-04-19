import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import shallow from 'zustand/shallow'
import { MyPolygon, MyRay } from '../Controls/graph'
import { Polygon } from '../types'
import { fabric } from 'fabric'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { MyPolygonWithLabel } from '../Controls/graph/PolygonGroupGraph'

export interface PolygonProps {
  polygon: Polygon
  onLabelChange: (polygon: Polygon, newLabel: string) => void
}

export const PolygonComponent = ({
  polygon,
  onLabelChange
}: PolygonProps): JSX.Element => {
  const { fabCanvas } = useStore(
    (state) => ({ fabCanvas: state.fabCanvas }),
    shallow
  )
  const objRef = useRef<MyPolygonWithLabel | undefined>()
  const rayRef = useRef<fabric.Group | undefined>()
  const [diaOpen, setDiaOpen] = useState<boolean>(false)
  const [labelName, setLabelName] = useState<string>(
    polygon?.labelName ?? 'label_init'
  )

  const handleClickOpen = () => {
    setDiaOpen(true)
  }

  const handleClose = () => {
    setDiaOpen(false)
  }
  const handleOK = () => {
    // TODO 把当前的labelName进行更新
    onLabelChange(polygon, labelName)
    setDiaOpen(false)
  }

  useEffect(() => {
    // console.log(`polygonComponent useEffect`)
    if (fabCanvas === undefined) {
      return
    }
    if (objRef.current === undefined) {
      // TODO 对MyPolygon同样需要新增label的显示和编辑功能

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

  // TODO 在命名这里新增校验；不能为空，是否可以重复 不可以？重复的话需要改结构？
  return (
    <>
      <Dialog open={diaOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Change Label Name</DialogTitle>

        <TextField
          placeholder="Please name a label for this ROI region."
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
