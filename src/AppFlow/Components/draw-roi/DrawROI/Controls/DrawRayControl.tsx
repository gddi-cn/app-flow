import React, { useCallback, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import shallow from 'zustand/shallow'
import { useStore } from '../store/useStore'
import { ControlsElementType } from './ControlType'
import { Box, ToggleButton, Tooltip } from '@mui/material'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { Point, Polygon } from '../types'
import { getRandomId } from '../helpers'
import { DrawRayAssistant, MyCircle } from './graph'

export const DrawRayControl: ControlsElementType = ({ disabled }) => {
  // gain values and functions from store
  const {
    controlMode,
    setControlMode,
    fabCanvas,
    imgWH,
    addPolygons,
    setMouseDownHandler,
    setMouseMoveHandler
  } = useStore(
    (state) => ({
      controlMode: state.controlMode,
      setControlMode: state.setControlMode,
      fabCanvas: state.fabCanvas,
      imgWH: state.imgWH,
      addPolygons: state.addPolygons,
      setMouseDownHandler: state.setMouseDownHandler,
      setMouseMoveHandler: state.setMouseMoveHandler
    }),
    shallow
  )

  const assistRef = useRef<DrawRayAssistant | undefined>(undefined)

  const handleToggleChange = useCallback(() => {
    if (controlMode !== 'drawRay') {
      setControlMode('drawRay')
    } else {
      setControlMode('default')
    }
  }, [setControlMode, setControlMode])

  const clearUpHelpers = useCallback(() => {
    if (fabCanvas === undefined) {
      return
    }
    // clear up the helpers
    if (assistRef.current) {
      assistRef.current.removeFromCanvas()
    }
    assistRef.current = undefined
  }, [fabCanvas, assistRef.current])

  const addRoIRay = useCallback(
    ({
      xBegin,
      yBegin,
      xEnd,
      yEnd
    }: {
      xBegin: number
      yBegin: number
      xEnd: number
      yEnd: number
    }) => {
      const points: Point[] = [
        { x: xBegin, y: yBegin },
        { x: xEnd, y: yEnd }
      ]
      const newLine: Polygon = {
        id: getRandomId(),
        points,
        isRay: true
      }
      console.log('addRoIRay,newLine', newLine)
      addPolygons([newLine])
      clearUpHelpers()
    },
    [clearUpHelpers]
  )

  const onMouseDown = useCallback(
    (opt: fabric.IEvent) => {
      console.log('mouse down')
      if (fabCanvas !== undefined) {
        if (assistRef.current === undefined) {
          assistRef.current = new DrawRayAssistant()
        }
        const pt = fabCanvas.getPointer(opt.e as any)
        if (assistRef.current.Status === 'init') {
          assistRef.current.setPoint(pt.x, pt.y)
          assistRef.current.addToCanvas(fabCanvas)
          fabCanvas.requestRenderAll()
        } else if (assistRef.current.Status === 'pt1') {
          // end draw -- create new line
          assistRef.current.setPoint(pt.x, pt.y)
          // add lineEnd
          const { xBegin, yBegin, xEnd, yEnd } = assistRef.current.endDraw()
          addRoIRay({ xBegin, yBegin, xEnd, yEnd })
        }
      }
    },
    [addRoIRay]
  )

  const onMouseMove = useCallback(
    (opt: fabric.IEvent) => {
      if (fabCanvas) {
        if (assistRef.current !== undefined) {
          const evt = opt.e as any
          const pt = fabCanvas.getPointer(evt)
          if (assistRef.current.Status === 'pt1')
            assistRef.current.setPoint(pt.x, pt.y)
          fabCanvas.requestRenderAll()
        }
      }
    },
    [fabCanvas]
  )

  useEffect(() => {
    if (controlMode === 'drawRay') {
      setMouseDownHandler(onMouseDown)
      setMouseMoveHandler(onMouseMove)
    } else {
      clearUpHelpers()
      if (controlMode === 'default') {
        setMouseDownHandler(undefined)
        setMouseMoveHandler(undefined)
      }
    }
  }, [
    controlMode,
    onMouseDown,
    onMouseMove,
    setMouseDownHandler,
    setMouseMoveHandler
  ])

  return (
    <Box className="DR-control1">
      <Tooltip title="draw ray">
        <ToggleButton
          disabled={disabled === true}
          sx={{
            backgroundColor: 'white'
          }}
          value="drawRay"
          selected={controlMode === 'drawRay'}
          onChange={handleToggleChange}
        >
          <HorizontalRuleIcon />
        </ToggleButton>
      </Tooltip>
    </Box>
  )
}
