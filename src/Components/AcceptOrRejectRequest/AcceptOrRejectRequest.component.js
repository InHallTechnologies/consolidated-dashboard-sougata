import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Link, useDisclosure } from "@chakra-ui/react"
import React, { useContext } from "react"
import context from '../../context/app-context';

function AcceptOrRejectRequest({ status }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [userData, setUserData] = useContext(context)
    console.log(userData);
    return (
      <>
        <Link colorScheme='red' onClick={onOpen}>
          Exceptional Pending Status: {status}
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
                    <Button ref={cancelRef} onClick={onClose}>
                      Reject
                    </Button>
                    <Button colorScheme='teal' onClick={onClose} ml={3}>
                      Accept
                    </Button>
                </AlertDialogFooter>
                :
                <AlertDialogFooter>
                    <Button ref={cancelRef} colorScheme='red' onClick={onClose}>
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