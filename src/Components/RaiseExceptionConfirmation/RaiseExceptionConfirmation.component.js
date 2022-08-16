import React from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';


function RaiseExceptionConfirmation({ projectId, reason, handleYesClicked }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button colorScheme='teal' ml={3} onClick={onOpen}>
            Submit
        </Button>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Alert</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                You are raising request for exceptional approval for project <strong>{projectId}</strong> with below mentioned reason:
                <br/>
                <p style={{ fontFamily:'Cutive Mono', backgroundColor:'#' }}>
                    {reason}
                </p>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme='teal' ml={3} onClick={handleYesClicked}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  export default RaiseExceptionConfirmation;