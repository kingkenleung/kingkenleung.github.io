
//Panolens.js GitHub: https://pchen66.github.io/panolens.js/docs/
//3D Vector Visualiser: https://www.mikemunkyulee.com/three-vv/
//https://imagecompressor.com/
//https://onlinepngtools.com/convert-png-to-data-uri




////////////////////////////////////////////////////////////////


const progressElement = document.getElementById("progress");
const container = document.getElementById('container');
const panel = document.getElementById('panel');
const hoverFrame = document.getElementById('hoverFrame');
const viewer = new PANOLENS.Viewer({ output: 'console', container });

/**
 * Handler function for menu change
 */
async function onMenuChange(event) {
    // Get the current control method
    let controlType = viewer.getControlId();

    if (event.method !== 'enableControl' || !window.DeviceOrientationEvent || controlType !== 'device-orientation') {
        return;
    }

    // Request permission for using the orientation sensor in iOS.
    try {
        const permissionState = await window.DeviceOrientationEvent.requestPermission?.();

        if (permissionState !== 'granted') {
            console.log('Permission denied');
        }
    } catch (error) {
        console.log(error)
    }
}

viewer.widget.addEventListener('panolens-viewer-handler', onMenuChange);

/**
 * Function to prepare Progress Bar
 */
function onEnter(event) {
    progressElement.style.width = 0;
    progressElement.classList.remove('finish');
}
function onProgress(event) {
    progress = event.progress.loaded / event.progress.total * 100;
    progressElement.style.width = progress + '%';
    if (progress === 100) {
        progressElement.classList.add('finish');
    }
}

/**
 * Function to set settings of a panorama
 */
function setPanorama(path, initialLookAt) {
    console.log('Setting panorama');
    let panorama = new PANOLENS.ImagePanorama(path);
    panorama.addEventListener('enter-fade-start', () => {
        viewer.tweenControlCenter(initialLookAt, 1);
    });
    panorama.addEventListener('progress', onProgress);
    panorama.addEventListener('enter', onEnter);
    console.log('DONE!')
    return panorama;
}
/**
 * Function to set settings of infospots
 */
function addInfospots(infospots, panorama) {
    infospots.forEach((infospotSettings) => {
        //console.log('Setting infospot');
        let { position, link, hoverVideo, hoverText, icon } = infospotSettings;
        let infospot = new PANOLENS.Infospot(100, icon);
        infospot.position.set(position[0], position[1], position[2]);

        // If hoverVideo exists, show it; if not, show hoverText
        if (hoverVideo) {
            hoverFrame.setAttribute('src', hoverVideo);
            infospot.addHoverElement(panel, 100);
        } else {
            infospot.addHoverText(hoverText);
            infospot.addEventListener('click', () => {
                window.open(link);
            });
        }


        panorama.add(infospot);
        //console.log('DONE!');
    });
}

const panoramas = {}

// let i = 0; i < scenes.length; i++
for (const sceneId in scenes) {
    let { path, initialLookAtPosition, infospots } = scenes[sceneId];
    let panorama = setPanorama(path, initialLookAtPosition);
    // panoramas.push(panorama);
    panoramas[sceneId] = panorama
    addInfospots(infospots, panorama);
    viewer.add(panorama);
}

// for (let i = 0; i < scenes.length; i++) {
// 	for (let j = 0; j < scenes[i].sceneLinkage.length; j++) {
// 			panoramas[i].link(panoramas[scenes[i].sceneLinkage[j].id], scenes[i].sceneLinkage[j].direction)
// 	}
// }
for (const id in scenes) {
  let { sceneLinkage } = scenes[id];

  for (let i = 0; i < sceneLinkage.length; i++) {
    panoramas[id].link(panoramas[sceneLinkage[i].id], sceneLinkage[i].direction);
  }
}

const directoryButtons = document.getElementsByClassName('btn');

// Enter panorama when load completes
function onDirectoryButtonClick(targetPanorama) {
  viewer.setPanorama(targetPanorama);
}

for (const directoryButton of directoryButtons) {
    let { destination } = directoryButton.dataset;
    directoryButton.addEventListener('click', () => onDirectoryButtonClick(panoramas[destination]))
}

const menuButton = document.getElementById('menu');
const directoryContainer = document.getElementById('directory-container');

function onMenuButtonClick() {
  directoryContainer.classList.toggle('hide');

  if (directoryContainer.classList.contains('hide')) {
    menuButton.innerHTML = 'menu';
    return;
  }
  menuButton.innerHTML = 'close';
}

menuButton.addEventListener('click', onMenuButtonClick);
// button1.addEventListener( 'click', () => onButtonClick(panoramas['lt1']) );

// button2.addEventListener( 'click', () => onButtonClick(panoramas['lt2']));

// button3.addEventListener( 'click', onButtonClick.bind( this, panorama3 ) );

