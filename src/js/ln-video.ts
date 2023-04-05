function VideoPlayer(src:string) {
    let content = `<div class="ln-video-container">
    <video src="${src}"></video>
    <div class="ln-controls">
        <div class="ln-row">
            <div class="ln-time-view start">
                00:00
            </div>
            <div class="ln-progressbar thumb vid">
                <div class="ln-time-view full">00:00</div>
            </div>
            <div class="ln-time-view full">
                00:00
            </div>
        </div>
        <div class="ln-row">
            <button class="ln-btn">
                <i class="ln-icon ln-play ln-smx"></i>
            </button>
            <button class="ln-btn">
                <i class="ln-icon ln-fast-rewind ln-smx"></i>
            </button>
            <button class="ln-btn">
                <i class="ln-icon ln-fast-forward ln-smx"></i>
            </button>
            <div class="ln-vol-container">
                <button class="ln-btn">
                    <i class="ln-icon ln-volume ln-smx"></i>
                </button>
                <div class="ln-progressbar thumb mini vol"></div>
            </div>
            <button class="ln-btn end" >
                <i class="ln-icon ln-fullscreen ln-smx"></i>
            </button>
        </div>
    </div>
</div>`;

    let tempEl: HTMLElement = document.createElement('div');
    tempEl.innerHTML = content;
    let main_:HTMLElement = tempEl.querySelector(".ln-video-container");
    let video:HTMLVideoElement = main_.querySelector('video');
    let progressbar:HTMLElement = main_.querySelector('.ln-progressbar.vid');
    let volumebar:HTMLElement = main_.querySelector('.ln-progressbar.vol');
    let playBtn:HTMLElement = main_.querySelector('.ln-btn:has(.ln-play)');
    let fullscreenBtn:HTMLElement = main_.querySelector('.ln-btn:has(.ln-fullscreen)');
    let currentTime:HTMLElement = main_.querySelector('.ln-time-view.start');
    let duration:HTMLElement = main_.querySelector('.ln-time-view.full');
    let muteBtn:HTMLElement = main_.querySelector('.ln-btn:has(.ln-volume)');
    let controls:HTMLElement = main_.querySelector('.ln-controls');
    let previewTime:HTMLElement = main_.querySelector('.ln-progressbar.vid .ln-time-view');
    let rewindBtn:HTMLElement = main_.querySelector('.ln-btn:has(.ln-fast-rewind)');
    let forwardBtn:HTMLElement = main_.querySelector('.ln-btn:has(.ln-fast-forward)');
    
    const decimalFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2
    });
    
    function formatTime(time: number) {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600);
    
        if (hours === 0){
            return `${minutes}:${decimalFormatter.format(seconds)}`;
        }else{
            return `${hours}:${decimalFormatter.format(minutes)}:${decimalFormatter.format(seconds)}`;
        }
    }
    
    video.addEventListener('durationchange', () => {
        duration.textContent = formatTime(video.duration);
    });
    
    video.addEventListener('loadedmetadata', () => {
        volumebar.style.setProperty('--ln-progressbar-value', video.volume.toString());
        duration.textContent = formatTime(video.duration);
    });
    
    
    playBtn.addEventListener('click', () => {
        if(video.paused) {
            video.play();
        }else {
            video.pause();
        }
        playBtn.querySelector('.ln-icon').classList.toggle('ln-play', video.paused);
        playBtn.querySelector('.ln-icon').classList.toggle('ln-pause', !video.paused);
    });
    
    video.addEventListener('timeupdate', ()=> {
        const percentage: number = video.currentTime/video.duration;
    
        if(percentage >= 1) {
            playBtn.querySelector('.ln-icon').classList.toggle('ln-play', true);
            playBtn.querySelector('.ln-icon').classList.toggle('ln-pause', false); 
        }
        currentTime.textContent = formatTime(video.currentTime);
        progressbar.style.setProperty('--ln-progressbar-value', percentage.toString());
    });
    
    progressbar.addEventListener('click', (e) => {
        let rect = progressbar.getBoundingClientRect();
        let offsetX =  Math.max(e.x - rect.x, 0)/rect.width;
        video.currentTime = offsetX * video.duration;
        
    })
    
    progressbar.addEventListener('mousemove', (e) => {
        let rect = progressbar.getBoundingClientRect();
        let offsetX =  Math.max(e.x - rect.x, 0)/rect.width;
        previewTime.textContent = formatTime(offsetX * video.duration);
    })
    
    volumebar.addEventListener('click', (e) => {
        let rect = volumebar.getBoundingClientRect();
        let offsetX =  Math.max(e.x - rect.x, 0)/rect.width;
        video.volume = offsetX;
        volumebar.style.setProperty('--ln-progressbar-value', offsetX.toString());
        
    });
    
    fullscreenBtn.addEventListener('click', () => {
        if(document.fullscreenElement === main_) {
            document.exitFullscreen();
        }else{
            main_.requestFullscreen();
        }
    
    });
    
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.querySelector('.ln-icon').classList.toggle('ln-volume', !video.muted);
        muteBtn.querySelector('.ln-icon').classList.toggle('ln-volume-off', video.muted);
    
    });
    
    let timeOut = null;
    
    main_.addEventListener('mousemove', ()=> {
        main_.classList.toggle('no-cursor', false);
        controls.classList.toggle('initial', false);
        clearTimeout(timeOut);
        timeOut = setTimeout(()=> {
            main_.classList.toggle('no-cursor', (document.fullscreenElement === main_));
            controls.classList.toggle('initial', true);
        }, 3000);
    });
    
    document.addEventListener('fullscreenchange', () => {
        let shouldChange = document.fullscreenElement === main_;
        fullscreenBtn.querySelector('.ln-icon').classList.toggle('ln-close-fullscreen', shouldChange);
        fullscreenBtn.querySelector('.ln-icon').classList.toggle('ln-fullscreen', !shouldChange);
    });
    
    forwardBtn.addEventListener('click', () => {
        video.currentTime += video.currentTime + 10;
    })
    
    rewindBtn.addEventListener('click', () => {
        video.currentTime += video.currentTime - 10;
    })    

    return main_;
}




