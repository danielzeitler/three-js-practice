let scene;
let camera;
let renderer;

function init() {
    let stats = initStats()

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
    renderer = new THREE.WebGLRenderer()

    renderer.shadowMap.enabled = true
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight)

    let axesHelper = new THREE.AxesHelper(20)
    scene.add(axesHelper)

    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
    let planeMesh = new THREE.MeshLambertMaterial({
        color: 0xCCCCCC
    })
    let plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // add Spotlight
    let spotLight = new THREE.SpotLight(0xFFFFFF, /* 1.2, 150, 120 */)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // controls for GUI
    let controls = new function() {
        this.rotationSpeed = 0.02
        this.numberOfObjects = scene.children.length

        this.addCube = () => {
            let cubeSize = Math.ceil(Math.random() * 3)
            let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
            let cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xFFFFFF
            })

            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.castShadow = true
            cube.name = `cube-${scene.children.length}`
            
            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width))
            cube.position.y = Math.round((Math.random() * 5))
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height))

            scene.add(cube)
            this.numberOfObjects = scene.children.length
        }

        this.outputObjects = () => {
            console.log(scene.children)
        }

        this.removeCube = () => {
            let allChildren = scene.children
            let lastObject = allChildren[allChildren.length - 1]

            if(lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject)
                this.numberOfObjects = scene.children.length
            }
        }
    }

    // addGui
    addGui(controls)

    // subtle ambient lighting
    let ambienLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambienLight)

    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    document.querySelector('#cube-scene').appendChild(renderer.domElement)

    // Adjust scene on browser resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(camera, scene)
    })
    
    // add TrackballControls
    let trackballControls = initTrackballControls(camera, renderer)
    let clock = new THREE.Clock()

    // Render scene with animations
    function renderScene() {
        stats.update()
        trackballControls.update(clock.getDelta())
        
        scene.traverse((element) => {
            if(element instanceof THREE.Mesh && element != plane) {
                element.rotation.x += controls.rotationSpeed
                element.rotation.y += controls.rotationSpeed
                element.rotation.z += controls.rotationSpeed
            }
        })

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()
}

function addGui(controls) {
    let gui = new dat.GUI()
    gui.add(controls, 'addCube')
    gui.add(controls, 'removeCube')
    gui.add(controls, 'outputObjects')
    gui.add(controls, 'numberOfObjects').listen()
}