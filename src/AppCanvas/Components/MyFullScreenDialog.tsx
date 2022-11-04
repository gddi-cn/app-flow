import React, { useCallback, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

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

export interface MyFullScreenDialogProps {
  open: boolean
  title: string
  okTitle: string
  onClose: () => void
  onOK: (okVal: any) => void
  renderContent: (props: ContentProps) => JSX.Element
}

export const MyFullScreenDialog = ({
  open,
  title,
  okTitle,
  onClose,
  onOK,
  renderContent
}: MyFullScreenDialogProps): JSX.Element => {
  const [contentVal, setContentVal] = useState(undefined)
  const handleClose = useCallback(() => {
    onClose()
  }, [])
  const handleContentValChange = useCallback((val) => {
    setContentVal(val)
  }, [])
  const handleOk = useCallback(() => {
    onOK(contentVal)
  }, [])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
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
          <Button autoFocus color="inherit" onClick={handleOk}>
            {okTitle}
          </Button>
        </Toolbar>
      </AppBar>
      {renderContent({ val: contentVal, onValChange: handleContentValChange })}
    </Dialog>
  )
}
