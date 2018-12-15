let camera;
let scene;
let renderer;

function init() {
    let stats = initStats()

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
    renderer = new THREE.WebGLRenderer()

    renderer.shadowMap.enabled = true
    renderer.setClearColor(new THREE.Color(0xbaffc9))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // X, Y, Z Axis
    let AxesHelper = new THREE.AxesHelper(20)
    scene.add(AxesHelper)

    function createSprites() {
        for(let x = -15; x < 15; x++) {
            for(let y = -5; y < 5; y++) {
                let spriteMaterial = new THREE.SpriteMaterial({
                    color: Math.random() * 0xFFFFFF
                })

                let sprite = new THREE.Sprite(spriteMaterial)
                sprite.position.set(x * 4, y * 4, 0)
                scene.add(sprite)
            }
        }
    }

    createSprites()

    // Adding Light
    let spotLight = new THREE.SpotLight(0xFFFFFF)
    spotLight.position.set(-40, 40, -15)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    scene.add(spotLight)

    let ambientLight = new THREE.AmbientLight(0x353535)
    scene.add(ambientLight)

    // Setting Camera
    camera.position.set(0, 0, 150)
    camera.lookAt(scene.position)

    document.querySelector("#ball-animation").appendChild(renderer.domElement)
    
    // Resize render on browser size change
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    let trackballControls = initTrackballControls(camera, renderer)
    let clock = new THREE.Clock()

    // Adding dat.gui to control rotation and bouncing animation
    let controls = new function() {
        this.rotationSpeed = 0.02
        this.bouncingSpeed = 0.03
    }

    let gui = new dat.GUI()
    gui.add(controls, 'rotationSpeed', 0, 0.5)
    gui.add(controls, 'bouncingSpeed', 0, 0.5)

    function renderScene() {
        stats.update()

        // Trackball Controls
        trackballControls.update(clock.getDelta())

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }
    
    renderScene()
}

window.addEventListener('vrdisplayactivate', () => {
    renderer.vr.getDevice().requestPresent( [ { source: renderer.domElement } ] );
}, false);