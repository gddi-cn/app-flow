import React, { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import shallow from 'zustand/shallow'
import { MyPolygon, MyRay } from '../Controls/graph'
import { Polygon } from '../types'
import { fabric } from 'fabric'
export interface PolygonProps {
  polygon: Polygon
}

export const PolygonComponent = ({ polygon }: PolygonProps): JSX.Element => {
  const { fabCanvas } = useStore(
    (state) => ({ fabCanvas: state.fabCanvas }),
    shallow
  )
  const objRef = useRef<MyPolygon | undefined>()
  const rayRef = useRef<fabric.Group | undefined>()

  useEffect(() => {
    // console.log(`polygonComponent useEffect`)
    if (fabCanvas === undefined) {
      return
    }
    if (objRef.current === undefined) {
      objRef.current = new MyPolygon({
        id: polygon.id,
        points: polygon.points,
        isRay: polygon?.isRay || false
      })
      if (polygon?.isRay) {
        const rayObj = new MyRay({
          polygonLineId: polygon.id,
          polygonLine: objRef.current,
          startPoint: polygon.points[0],
          endPoint: polygon.points[1],
          textContent: 'Ray_' + polygon.rayNumber,
          onTextChange: (e) => console.log('eee', e)
        })
        // fabCanvas.selection = true
        rayRef.current = rayObj
        fabCanvas.add(rayRef.current)
      } else {
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

  return <></>
}
