// custom node: https://reactflow.dev/examples/custom-node/

import React, { useCallback, useMemo, useState } from 'react'
import shallow from 'zustand/shallow'
import { Module, PropObject, ModLabelsValueType } from '../types'
import { useStore } from '../store/useStore'
// import { NodeRunner } from './NodeRunner'
import { ModelConfigDialog } from './ModelConfigDialog'
import { NodeDetail } from './NodeDetail'
import './DetectionNodeBody.scss'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

interface DetectionNodeBodyProps {
  nodeData: Module
  renderModuleHeaderContent: (nodeData: Module) => JSX.Element
}

export const DetectionNodeBody = ({
  nodeData,
  renderModuleHeaderContent
}: DetectionNodeBodyProps): JSX.Element => {
  const [modelSelectDialogOpen, setModelSelectDialogOpen] =
    useState<boolean>(false)

  const { modifyModuleProp, propEditingDisabled, d } = useStore(
    (state) => ({
      modifyModuleProp: state.modifyModuleProp,
      propEditingDisabled: state.propEditingDisabled,
      d: state.dictionary.node.detection
    }),
    shallow
  )

  const handleSelectModClick = useCallback(() => {
    setModelSelectDialogOpen(true)
  }, [setModelSelectDialogOpen])

  const handleModSelectClose = useCallback(() => {
    setModelSelectDialogOpen(false)
  }, [])

  const handleModConfigChange = useCallback(
    (newProp: PropObject) => {
      //TODO: modify in global store; modify in ONE action
      Object.keys(newProp).forEach((propName) => {
        modifyModuleProp(
          nodeData.id,
          propName,
          (newProp as Record<string, any>)[propName]
        )
      })
      setModelSelectDialogOpen(false)
    },
    [modifyModuleProp, nodeData.id]
  )

  const handleNodePropChange = useCallback(
    (propName, propVal) => {
      modifyModuleProp(nodeData.id, propName, propVal)
    },
    [modifyModuleProp, nodeData.id]
  )

  const propObj = nodeData.props as PropObject
  const numLabelsChecked = propObj['mod_labels']
    ? Object.values(propObj['mod_labels'] as ModLabelsValueType).filter(
        (label) => label.checked
      ).length
    : 0

  const modelNameDisplay = useMemo(
    () =>
      `${
        propObj['mod_name'] === '' ||
        propObj['mod_name'] === undefined ||
        !propObj['mod_iter_id']
          ? d.noModel
          : propObj['mod_name']
      }`,
    [propObj, d.noModel]
  )

  return (
    <Box
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
      className="gddi-aiappcanvas__simplenode"
    >
      <Box className="gddi-aiappcanvas__section gddi-aiappcanvas__header">
        {renderModuleHeaderContent(nodeData)}
      </Box>
      <Tooltip title={modelNameDisplay}>
        <Button
          className="gddi-aiappcanvas__section model-select-button"
          variant="outlined"
          size="large"
          onClick={handleSelectModClick}
        >
          <Box className="model-name" component="span">
            {modelNameDisplay}
          </Box>
          <Box className="filterlabel-display" component="span">
            {d.labelNum.replace('{NUM}', numLabelsChecked + '')}
          </Box>
        </Button>
      </Tooltip>
      <ModelConfigDialog
        readonly={propEditingDisabled}
        open={modelSelectDialogOpen}
        title={d.dialog.title}
        okTitle={d.dialog.confirm}
        defaultValue={propObj}
        onClose={handleModSelectClose}
        onOK={handleModConfigChange}
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
