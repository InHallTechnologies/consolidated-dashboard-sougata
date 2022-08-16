import './RaiseExceptionalBugAlert.styles.css';
import React, { useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Link, Textarea, useDisclosure } from '@chakra-ui/react';
import RaiseExceptionConfirmation from '../RaiseExceptionConfirmation/RaiseExceptionConfirmation.component';
import { push, ref, set } from 'firebase/database';
import { firebaseAuth, firebaseDatabase } from '../../backend/firebase-handler';
import exceptionalApproval from '../../entities/exceptionalApproval';

const RaiseExceptionalBugAlert = ({ projectId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef();
    const [reasons, setReason] = useState('');
    const handleChange = event => setReason(event.target.value);
    const firebaseUser = firebaseAuth.currentUser;

    const handleConfirmed = async () => {
        onClose();
        const exeptionalRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}/${firebaseUser.uid}`);
        const key = push(exeptionalRef).key;
        const approval = {
            ...exceptionalApproval,
            projectId: projectId,
            reason: reasons,
            requestByUID: firebaseUser.uid,
            requestUID: key
        }
        const exeptionalRequestRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}/${firebaseUser.uid}/${key}`);
        await set(exeptionalRequestRef, approval);
        onClose();
        setReason("")
    }
    
    return (
      <>
        <Link onClick={onOpen}>
            <p className="bug-action-button">Request Exceptional Approval</p>
        </Link>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Request Exceptional Approval</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <p>Type the reason here:</p>
              <Textarea className='text-area' fontSize={'0.9rem'} fontWeight='bold' value={reasons} onChange={handleChange} />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <RaiseExceptionConfirmation reason={reasons} projectId={projectId} handleYesClicked={handleConfirmed} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
}

export default RaiseExceptionalBugAlert;
