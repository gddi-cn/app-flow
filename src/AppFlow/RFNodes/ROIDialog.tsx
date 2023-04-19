import React, { useCallback, useEffect, useState } from 'react'

import { ROIEditContent } from './../AsyncContents'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { regionsWithLabel } from '../types'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface ContentProps {
  val: any
  onValChange: (okVal: any) => void
}

export interface ROIDialogProps {
  readonly?: boolean
  open: boolean
  title: string
  okTitle: string
  defaultRegions: number[][][]
  defaultRegionsWithLable: regionsWithLabel
  onClose: () => void
  onOK: (
    newRegions: number[][][],
    newRegionsWithLabel: regionsWithLabel
  ) => void
}

export const ROIDialog = ({
  readonly,
  open,
  title,
  okTitle,
  defaultRegions,
  defaultRegionsWithLable,
  onClose,
  onOK
}: ROIDialogProps): JSX.Element => {
  const [regions, setRegions] = useState<number[][][]>([])
  const [regionsWithLabel, setRegionsWithLabel] = useState<regionsWithLabel>({})

  // TODO 处理defaultRegionsWithlable的逻辑
  const handleClose = useCallback(() => {
    setRegions([...defaultRegions])
    setRegionsWithLabel({ ...defaultRegionsWithLable })
    onClose()
  }, [defaultRegions, defaultRegionsWithLable])

  const handleOk = useCallback(() => {
    onOK(regions, regionsWithLabel)
  }, [regions, regionsWithLabel])

  const handleRegionsChange = useCallback(
    (newR: number[][][], newRLable: regionsWithLabel) => {
      setRegions((old) => [...newR])
      setRegionsWithLabel({ ...newRLable })
      console.log('====newR,newRLable', newR, newRLable)
    },
    [setRegions, setRegionsWithLabel]
  )

  useEffect(() => {
    setRegions([...defaultRegions])
    setRegionsWithLabel({ ...defaultRegionsWithLable })
  }, [defaultRegions, defaultRegionsWithLable])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar variant={'dense'}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button
            autoFocus
            disabled={readonly === true}
            color="inherit"
            onClick={handleOk}
          >
            {okTitle}
          </Button>
        </Toolbar>
      </AppBar>
      <ROIEditContent
        regions={defaultRegions}
        regionsWithLabel={defaultRegionsWithLable}
        onRegionsChange={handleRegionsChange}
      />
    </Dialog>
  )
}
