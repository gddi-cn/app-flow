// custom node: https://reactflow.dev/examples/custom-node/

import React, { useCallback, useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { Module, PropObject, regionsWithLabel } from '../types'
import { useStore } from '../store/useStore'
import { ROIDialog } from './ROIDialog'
import { NodeDetail } from './NodeDetail'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface ROINodeBodyProps {
  nodeData: Module
  renderModuleHeaderContent: (nodeData: Module) => JSX.Element
}

export const ROINodeBody = ({
  nodeData,
  renderModuleHeaderContent
}: ROINodeBodyProps): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const {
    modifyModuleProp,
    propEditingDisabled,
    setFetchROIImgLoading,
    fetchROIImgURL,
    roiImgFetcher,
    r
  } = useStore(
    (state) => ({
      modDef: state.moduleDefinitions[nodeData.type],
      modifyModuleProp: state.modifyModuleProp,
      propEditingDisabled: state.propEditingDisabled,
      setFetchROIImgLoading: state.setFetchROIImgLoading,
      fetchROIImgURL: state.fetchROIImgURL,
      roiImgFetcher: state.roiImgFetcher,
      r: state.dictionary.node.roi
    }),
    shallow
  )

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const handleDialogOk = useCallback(
    (okVal: number[][][], okLables: regionsWithLabel) => {
      setDialogOpen(false)
      modifyModuleProp(nodeData.id, 'regions', [...okVal])
      console.log('onOK===okVal,', okVal, okLables)
      if (!okLables) {
        modifyModuleProp(nodeData.id, 'regionsWithLabel', {})
      } else {
        modifyModuleProp(nodeData.id, 'regionsWithLabel', { ...okLables })
      }
    },
    [nodeData.id, modifyModuleProp]
  )

  const handleEditROIClick = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const handleNodePropChange = useCallback(
    (propName, propVal) => {
      modifyModuleProp(nodeData.id, propName, propVal)
    },
    [modifyModuleProp, nodeData.id]
  )

  const propObj = nodeData.props as PropObject
  const regions = propObj['regions'] as number[][][]
  // regions object with their labels
  let regionsWithLabel = {}
  if (
    propObj['regionsWithLabel'] &&
    Object.keys(propObj['regionsWithLabel']).length !== 0
  ) {
    regionsWithLabel = propObj['regionsWithLabel'] as regionsWithLabel
  }
  console.log(
    'init regionsWithLabel in ROIBODY  ,propObj',
    regionsWithLabel,
    propObj
  )

  useEffect(() => {
    setFetchROIImgLoading(true)
    fetchROIImgURL()
  }, [fetchROIImgURL, roiImgFetcher, setFetchROIImgLoading])

  return (
    <Box
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
      className="gddi-aiappcanvas__simplenode"
    >
      <Box className="gddi-aiappcanvas__section gddi-aiappcanvas__header">
        {renderModuleHeaderContent(nodeData)}
      </Box>
      <Button
        className="gddi-aiappcanvas__section roi-edit-button"
        variant="outlined"
        size="large"
        onClick={handleEditROIClick}
      >
        <Box component="span">{nodeData.type}</Box>
        <Box className="filterlabel-display" component="span">
          {r.regions.replace('{NUM}', regions.length + '')}
        </Box>
      </Button>
      <ROIDialog
        readonly={propEditingDisabled}
        open={dialogOpen}
        title={r.dialog.title}
        okTitle={r.dialog.confirm}
        defaultRegions={regions}
        defaultRegionsWithLable={regionsWithLabel}
        onClose={handleDialogClose}
        onOK={handleDialogOk}
      />
      {Object.keys(propObj).length > 1 ? (
        <Box>
          <NodeDetail
            readonly={propEditingDisabled}
            nodeData={nodeData}
            onPropChange={handleNodePropChange}
          />
        </Box>
      ) : null}
    </Box>
  )
}
