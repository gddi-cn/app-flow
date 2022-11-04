import React, { useState, useMemo, useEffect } from 'react'
import { Provider, createStore } from './store/useStore'
import {
  Pipeline,
  ModuleDefinitions,
  AIAppType,
  ModelListFetcher,
  ROIImgFetcher
} from './types'
import { AppFlowChild } from './AppFlowChild'
import { ColorModeContext } from './context'
import { getDesignTokens } from './theme'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Lang } from './types/dictionary'

// import './AppFlow.scss'

export interface AppFlowProps {
  /**
   * UI Language
   * cn by default
   */
  lang?: Lang
  /**
   * Set dark theme when component loaded
   */
  dark?: boolean
  /**
   * Hide the button for toggling dark mode
   */
  hideDarkModeButton?: boolean
  /**
   * Object to define different types of modules
   */
  moduleDefinitions: ModuleDefinitions
  /**
   * Default value (App pipeline)
   */
  defaultValue?: Pipeline
  /**
   * Layout Nodes Vertically - default false
   */
  layoutVertically?: boolean
  /**
   * Callback when the AppFlow get loaded
   */
  onLoad?: (app: AIAppType) => void
  /**
   * Callback when the content (value) of the AppFlow changed
   */
  onValueChange?: (newValue: Pipeline) => void
  /**
   * async fetch models
   */
  fetchModelList?: ModelListFetcher
  /**
   * async fetch image for drawing ROIs
   */
  fetchROIImg?: ROIImgFetcher
  /**
   * Disable graph editing (adding modules, deleting modules, connect modules, etc.)
   * false by default
   */
  graphEditingDisabled?: boolean
  /**
   * Disable module property editing.
   * false by default
   */
  propEditingDisabled?: boolean
}

/**
 * React component to visualize GDDi's AI APPs in flow chart fashion.
 */
export const AppFlow = ({
  lang,
  dark,
  hideDarkModeButton,
  defaultValue,
  moduleDefinitions,
  layoutVertically,
  onLoad,
  onValueChange,
  fetchModelList,
  fetchROIImg,
  graphEditingDisabled,
  propEditingDisabled
}: AppFlowProps): JSX.Element => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  useEffect(() => {
    setMode(dark === true ? 'dark' : 'light')
  }, [dark])

  return (
    <Provider createStore={createStore}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AppFlowChild
            lang={lang || 'cn'}
            defaultValue={defaultValue}
            hideDarkModeButton={hideDarkModeButton}
            layoutVertically={layoutVertically}
            moduleDefinitions={moduleDefinitions}
            onLoad={onLoad}
            onValueChange={onValueChange}
            fetchModelList={fetchModelList}
            fetchROIImg={fetchROIImg}
            graphEditingDisabled={graphEditingDisabled}
            propEditingDisabled={propEditingDisabled}
          />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}
