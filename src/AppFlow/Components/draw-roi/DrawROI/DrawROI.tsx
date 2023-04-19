import React from 'react'
import { Provider, createStore } from './store/useStore'
import { DrawROICore } from './DrawROICore'
import { regionsWithLabel } from '../../../types'

export interface DrawROIProps {
  /**
   * Image to drawROI on
   */
  imgUrl: string | undefined
  /**
   * ROI array; Each region is described in SVG path
   */
  defaultROIs: number[][][]
  /**
   * ROI Object; Each region has their label
   */
  defaultRegionsWithLabel: regionsWithLabel
  /**
   * Callback function when ROIs and labels change
   */
  onROIsChange?: (
    newROIs: number[][][],
    newRegionsWithLabel: regionsWithLabel
  ) => void
  children?: React.ReactNode
}

/**
 * React component to edit regions of interests on an image
 */
export const DrawROI = (props: DrawROIProps): JSX.Element => {
  return (
    <Provider createStore={createStore}>
      <DrawROICore {...props} />
    </Provider>
  )
}
