document.addEventListener('DOMContentLoaded', function(){
    const recored_btn = document.getElementById('recored');
    const stop_btn = document.getElementById('stop');
    const pause = document.getElementById('pause');
    const resume = document.getElementById('resume');

    const btns = document.querySelectorAll('.btn');


    btns.forEach(btn => {
        btn.addEventListener('click',function(){
            chrome.runtime.sendMessage(btn.id);
        })
    });

   
  
});


