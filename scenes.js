// Define Scenes
/**
 * Object structure:
 * path { String } The path to the image of the scene
 * initialLookAtPosition { THREE.Vector3 }
 * infospot { Array } Settings for infospots
 *  position { Array } 3D coordinates of the infospot
 *  hoverVideo { String } URL of the YouTube Video to show when the infospot is hovered
 *  hoverText { String } Text to show when the infospot is hovered
 *  link { String } The link the infospot will link to
 *  icon { String } The source of the icon of the infospot
 * sceneLinkage { Array }
 * 	id { int }
 * 	direction { Object } 3D coordinates of the arrow (equivalent to infospot)
 */

/* 

Three.Vector3(x,y,z)

	Forward is positive
					^
					|
					|
x: along axis of lens
					|
					|
					v
 Backward is negative

y: vertical axis

Left is positive <--- z: perpendicular to axis of lens ---> Right is negative

12 o'clock: (1500,0,0)
9 o'clock: (0,0,1500)
6 o'clock: (-1500,0,0)
3 o'clock: (0,0,-1500)
*/

//Inventory Table: 
//https://docs.google.com/spreadsheets/d/119Pk9acU5favxD0pep7ospn2rLY_mHyDWzQSoFurpWA/edit#gid=0
const scenes = [
  { //id:0
    path: 'pic/LT_1.JPG',
    initialLookAtPosition: new THREE.Vector3(-1500, 0, 0),
    infospots: [
      {
        position: [-150, 0, 250],
				hoverVideo: 'https://www.youtube.com/embed/A9cr7IFqnxk',
        hoverText: 'Shatin Pui Ying College',
        link: '',
        icon: PANOLENS.DataImage.Play
      },
			{
        position: [-150, 0, -250],
				hoverVideo: 'https://www.youtube.com/embed/dGBsOLnjDxM',
        hoverText: 'Shatin Pui Ying College 2',
        link: '',
        icon: PANOLENS.DataImage.Play
      },
    ],
		sceneLinkage: [
			{id: 1, direction: new THREE.Vector3(-1200,-560,0)},
		]
  },

  { //id:1
    path: 'pic/LT_2.JPG',
    initialLookAtPosition: new THREE.Vector3(-1500, 0, 0),
    infospots: [
      {
        position: [400, 0, 0],
				hoverVideo: 'https://www.youtube.com/embed/ZL0DU4_pcpQ',
        hoverText: 'Shatin Pui Ying College',
        link: '',
        icon: PANOLENS.DataImage.Play
      },
    ],
		sceneLinkage: [
			{id: 0, direction: new THREE.Vector3(400, -300, 1000)},
		]
  },
	
]