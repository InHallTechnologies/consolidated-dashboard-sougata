import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Link, useDisclosure } from "@chakra-ui/react"
import { onValue, ref, set } from "firebase/database";
import React, { useContext, useState } from "react"
import { firebaseDatabase } from "../../backend/firebase-handler";
import { sendExceptionalRequestMail, sendExceptionalRequestResponse } from "../../backend/mail-handler";
import context from '../../context/app-context';

function AcceptOrRejectRequest({ status, projectId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [userData, setUserData] = useContext(context);
    const [disableAction, setDisableAction] = useState(false);

    const handleAcceptOrReject = acceptStatus => _ => {
      setDisableAction(true);
      const exceptionalApprovalRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}/status`);
      set(exceptionalApprovalRef, acceptStatus).then(async() => {
        await sendMail(acceptStatus).then();
        alert("Status updated");
        setDisableAction(false);
        onClose();
      })
      
    }

    const sendMail = (acceptStatus) => {
      const promise = new Promise((resolve, reject) => {
        const exceptionalApprovalRef = ref(firebaseDatabase, `EXCEPTIONAL_APPROVAL_REQUEST/${projectId}`);
        onValue(exceptionalApprovalRef, async (snapshot) => {
          const request = await snapshot.val();
          const status = await sendExceptionalRequestResponse(request, acceptStatus, 'Sougata.choudhury@diageo.com');
          if (status) {
            resolve("Done");
          }else {
            reject("error")
          }
          
        });
      })
      return promise;
    }


    return (
      <>
        <Link colorScheme='red' className="bug-action-button" style={{color:"teal"}} onClick={()=>{if(status==="PENDING")onOpen()}}>
          Exceptional Approval Status: {status === "APPROVED" || status === "PENDING"? status: `${status}ED`}
        </Link>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {
                    userData.accessType === "SECURITY"
                    ?
                    "Accept/Reject"
                    :
                    "Sorry"
                }
                
              </AlertDialogHeader>
  
              <AlertDialogBody>
              {
                userData.accessType === "SECURITY"
                ?
                <p>Please select if you want to Accept or Reject this exceptional approval request</p>
                :
                <p>You do not have the access to accept or reject the request</p>
              }
              </AlertDialogBody>
  
            {
                userData.accessType === "SECURITY"
                ?
                <AlertDialogFooter>
                    <Button disabled={disableAction} ref={cancelRef} onClick={handleAcceptOrReject("REJECT")}>
                      Reject
                    </Button>
                    <Button disabled={disableAction} colorScheme='teal' onClick={handleAcceptOrReject("ACCEPT")} ml={3}>
                      Accept
                    </Button>
                </AlertDialogFooter>
                :
                <AlertDialogFooter>
                    <Button ref={cancelRef} colorScheme='teal' onClick={onClose}>
                      Okay
                    </Button>
                </AlertDialogFooter>
            }
             
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default AcceptOrRejectRequest;