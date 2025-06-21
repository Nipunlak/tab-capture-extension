

chrome.runtime.onMessage.addListener( async (message, sender, sendResponse) => {
    if (message == 'record'){
        
        const existingContexts = await chrome.runtime.getContexts({});

        const offscreenDocument = existingContexts.find(
            (c) => c.contextType === 'OFFSCREEN_DOCUMENT'
        );

        if (!offscreenDocument) {
            // Create an offscreen document.
            await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['USER_MEDIA'],
            justification: 'Recording from chrome.tabCapture API',
            });
        };
        
        let tabId = await new Promise(resolve => {
            chrome.tabs.query({active:true, currentWindow:true}, tabs =>{
                resolve(tabs[0].id)
            })
        }).catch(error => {
            console.log(error);
        })
        
        try {
            
            const streamId = await chrome.tabCapture.getMediaStreamId({
                targetTabId: tabId
            });

            // Send the stream ID to the offscreen document to start recording.
            chrome.runtime.sendMessage({
                type: 'start-recording',
                target: 'offscreen',
                data: streamId
            });
        } catch (error) {
          
            chrome.notifications.create({
                type: 'basic',
                iconUrl: "images/error-icon.png",
                title: `Screen Capture Already Running`,
                message: "Unable to start a new screen capture while another session is active. Please stop the current session before starting a new one.",
                priority: 1
                });
        };
    
    };

    if (message == 'stop'){
        chrome.runtime.sendMessage({
            type:'stop-recording',
            target:'offscreen', 
           
        });
    };

    if (message == 'pause'){
        chrome.runtime.sendMessage({
            type:'pause-recording',
            target:'offscreen',
        })
    };

    if (message == 'resume'){
        chrome.runtime.sendMessage({
            type:'resume-recording',
            target:'offscreen',
        })
    }
});





