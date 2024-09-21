// works as of Oct. 2024

function leaveSkypeConversations() {
    const conversations = document.querySelectorAll('[role="listitem"]');
    function rightClickAndLeave(conversation, index) {
        if (!conversation) return;
        const rightClickEvent = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 2,
            buttons: 2
        });
        
        conversation.dispatchEvent(rightClickEvent);
        setTimeout(() => {
            const leaveButton = document.querySelector('button[role="menuitem"][aria-label="Leave"]');
            
            if (leaveButton) {
                leaveButton.click();
                console.log(`Leave button clicked for conversation #${index + 1}`);
                // Wait for the confirmation button to appear
                setTimeout(() => {
                    const confirmButton = document.querySelector('button[role="button"][aria-label="Confirm"]');
                    
                    if (confirmButton) {
                        confirmButton.click();
                        console.log(`Confirmed leaving conversation #${index + 1}`);
                    } else {
                        console.log(`Confirm button not found for conversation #${index + 1}`);
                    }

                    setTimeout(() => {
                        rightClickAndLeave(conversations[index + 1], index + 1);
                    }, 500); 
                }, 500); 
            } else {
                console.log(`Leave button not found for conversation #${index + 1}`);
                setTimeout(() => {
                    rightClickAndLeave(conversations[index + 1], index + 1);
                }, 500);
            }
        }, 500);
    }

    if (conversations.length > 0) {
        rightClickAndLeave(conversations[0], 0);
    } else {
        console.log("No conversations found to leave.");
    }
}
leaveSkypeConversations();
