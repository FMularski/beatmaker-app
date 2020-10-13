class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play');
        
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;

        this.currentKick = './sounds/kick-electro02.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';

        this.selects = document.querySelectorAll('select');
        this.muteButtons = document.querySelectorAll('.mute');
    }

    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        let step = this.index % 8;
        const activePads = document.querySelectorAll(`.b${step}`);
        activePads.forEach(pad => {
            pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (pad.classList.contains('active')){
                if (pad.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }

                if (pad.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                    
                if (pad.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }

    start(){
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying){
            this.isPlaying = setInterval( () => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }

        this.updateButton();
    }

    updateButton(){
        if(this.isPlaying) {
            this.playButton.innerText = "PAUSE";
            this.playButton.classList.add("active");
        } else {
            this.playButton.innerText = "PLAY";
            this.playButton.classList.remove("active");
        }
    }

    changeSound(event){
        const selectName = event.target.name;
        const selectValue = event.target.value;

        switch(selectName){
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
                break;
        }
    }

    mute(event){
        const muteIndex = event.target.getAttribute('data-track');
        event.target.classList.toggle('active');

        if(event.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function (){
        this.style.animation = "";
    })
})

drumKit.playButton.addEventListener('click', function(){
    drumKit.start();
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(event){
        drumKit.changeSound(event);
    })
})

drumKit.muteButtons.forEach(button => {
    button.addEventListener('click', function(event){
        drumKit.mute(event);
    })
})