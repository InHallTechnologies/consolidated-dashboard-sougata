import './RaiseExceptionalBugAlert.styles.css';
import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Link, Textarea, useDisclosure } from '@chakra-ui/react';
import RaiseExceptionConfirmation from '../RaiseExceptionConfirmation/RaiseExceptionConfirmation.component';
import { onValue, push, ref, set } from 'firebase/database';
import { firebaseAuth, firebaseDatabase } from '../../backend/firebase-handler';
import exceptionalApproval from '../../entities/exceptionalApproval';
import { sendExceptionalRequestMail } from '../../backend/mail-handler';
import AcceptOrRejectRequest from '../AcceptOrRejectRequest/AcceptOrRejectRequest.component';

const RaiseExceptionalBugAlert = ({ projectId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef();
    const [reasons, setReason] = useState('');
    const handleChange = event => setReason(event.target.value);
    const firebaseUser = firebaseAuth.currentUser;
    const [exceptionalStatus, setExceptionalStatus] = useState("");
    const [statusUpdating, setStatusUpdating] = useState(false);

    useEffect(() => {
      const checkStatus = async () => {
        const approvalRequestRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}`);
        onValue(approvalRequestRef, (dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const request = dataSnapshot.val();
            setExceptionalStatus(request.status)
          }
        }
        )
      }
      checkStatus();
    }, [])

    const handleConfirmed = async () => {
      setStatusUpdating(true);
        const exeptionalRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}`);
        const key = push(exeptionalRef).key;
        const approval = {
            ...exceptionalApproval,
            projectId: projectId,
            reason: reasons,
            requestByUID: firebaseUser.uid,
            requestUID: key,   
        }
        const exeptionalRequestRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}`);
        const response = await sendExceptionalRequestMail(approval)
        if (response){
          await set(exeptionalRequestRef, approval);
          alert("Done");
          onClose();
          setReason("")
        }else {
          alert("Unable to process the request")
        }
        setStatusUpdating(false)
       
    }
    
    return (
      <>
        {
          exceptionalStatus
          ?
          <div>
            <AcceptOrRejectRequest status={exceptionalStatus} projectId={projectId} />
          </div>
          :
          <Link onClick={onOpen}>
            <p className="bug-action-button">Request Exceptional Approval</p>
          </Link>
        }
       
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
              <Button disabled={statusUpdating} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <RaiseExceptionConfirmation statusUpdating={statusUpdating} reason={reasons} projectId={projectId} handleYesClicked={handleConfirmed} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
}

export default RaiseExceptionalBugAlert;
