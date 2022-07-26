// Buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;
startBtn.onclick = alert("Test");


const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;

// Get video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );


    videoOptionsMenu.popup();
}

// Change the videoSource window to record
async function selectSource(source) {

    videoSelectBtn.innerText = source.name;

    const constraints = {
        audo: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    // Create stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Preview
    videoElement.srcObject = stream;
    videoElement.play();
}