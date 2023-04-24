import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useStore } from '../store/useStore'
import shallow from 'zustand/shallow'
import { MyPolygon, MyRay, MyPolygonWithLabel } from '../Controls/graph'
import { Polygon } from '../types'
import { fabric } from 'fabric'

export interface PolygonProps {
  polygon: Polygon
  dataIndex: number
}

export const PolygonComponent = ({
  polygon,
  dataIndex
}: PolygonProps): JSX.Element => {
  const { fabCanvas, polygons, setDialogPolygonOpen, setDialogPolygon } =
    useStore(
      (state) => ({
        fabCanvas: state.fabCanvas,
        polygons: state.polygons,
        setDialogPolygonOpen: state.setDialogPolygonOpen,
        setDialogPolygon: state.setDialogPolygon
      }),
      shallow
    )
  const objRef = useRef<MyPolygonWithLabel | undefined>()
  const rayRef = useRef<MyRay | undefined>()

  const handleClickOpen = useCallback(() => {
    //Init the label value in dialog
    setDialogPolygon({
      ...polygon,
      labelName: polygon?.labelName ? polygon.labelName : '' + dataIndex
    })
    setDialogPolygonOpen(true)
  }, [polygon, polygon.labelName])

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
          textContent: polygon?.labelName ? polygon.labelName : '' + dataIndex,
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
          textContent: polygon?.labelName ? polygon.labelName : '' + dataIndex,
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
  }, [polygon.id])

  // polygon.labelName change effect
  useEffect(() => {
    if (fabCanvas && objRef.current?._text) {
      objRef.current._text.text = polygon?.labelName
        ? polygon.labelName
        : '' + dataIndex
      objRef.current._handleLabelChange = handleClickOpen
      fabCanvas.requestRenderAll()
    }
    if (fabCanvas && rayRef.current?._text) {
      rayRef.current._text.text = polygon?.labelName
        ? polygon.labelName
        : '' + dataIndex
      rayRef.current._handleLabelChange = handleClickOpen
      fabCanvas.requestRenderAll()
    }
  }, [polygon, polygon.labelName])

  return <></>
}
