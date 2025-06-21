let recorder;
let chunks = [];

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.target !== 'offscreen') return;

  if (message.type === 'stop-recording'){
      stopRecording();
  };

  if (message.type === 'pause-recording'){
    pauseRecording();
     
  };

  if (message.type === 'resume-recording'){
     resumeRecording();
  };
  
  
  if (message.type === 'start-recording') {
          await startRecording(message);
      
  };

  

});



async function startRecording(message) {
  try {
      const media = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: message.data,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: message.data,
        },
      },
    });

    // Continue to play the captured audio to the user.
    const output = new AudioContext();
    const source = output.createMediaStreamSource(media);
    source.connect(output.destination);
      
  
    
    recorder = new MediaRecorder(media,{mimeType:'video/webm'});
    recorder.ondataavailable = (e) => chunks.push(e.data);
    
    

    recorder.onstop = () => {
       const blob =  new Blob(chunks, {type:'video/webm'});
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.style.display = 'none';
       a.href = url;
       a.download = 'recorded_video.webm'; 

     
       document.body.appendChild(a);
       a.click();

      
       URL.revokeObjectURL(url);
       document.body.removeChild(a); 
       
       recorder = undefined;
       chunks = [];
    }

    recorder.start();

      
    } catch (error) {
       console.log(error);
    }


  
    
};


function stopRecording(){
   if (recorder){
    

      recorder.stop()

      recorder.stream.getTracks().forEach((t) => t.stop());
      

      
   };

   
};

function pauseRecording(){
  if (recorder){
      if(recorder.state == "recording"){
        console.log("paused")
        recorder.pause();
        
       
     };
  };
};


function resumeRecording(){
  if (recorder){
      if(recorder.state  == "paused"){
        console.log("resumed")
        recorder.resume();
        
      };
  };

};


 

