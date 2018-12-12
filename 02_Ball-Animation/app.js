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

    // Add Plane
    let planeGeometry = new THREE.PlaneGeometry(60, 20)
    let planeMesh = new THREE.MeshLambertMaterial({
        color: 0xffdfba
    })
    let plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // Add Cube
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    let cubeMesh = new THREE.MeshLambertMaterial({
        color: 0xffb3ba
    })
    let cube = new THREE.Mesh(cubeGeometry, cubeMesh)
    cube.position.set(-4, 5, 0)
    cube.castShadow = true
    scene.add(cube)

    // Add Sphere
    let sphereGeometry = new THREE.SphereGeometry(3, 20, 20)
    let sphereMesh = new THREE.MeshLambertMaterial({
        color: 0xbae1ff
    })
    let sphere = new THREE.Mesh(sphereGeometry, sphereMesh)
    sphere.castShadow = true
    sphere.position.set(30, 2, 0)
    scene.add(sphere)

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
    camera.position.set(-30, 40, 30)
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

    let step = 0;
    function renderScene() {
        stats.update()

        // Trackball Controls
        trackballControls.update(clock.getDelta())

        // Let the ball bounce!
        sphere.position.x = 20 + 10*(Math.cos(step))
        sphere.position.y = 2 + 10*Math.abs(Math.sin(step))
        
        // Rotate Cube
        cube.rotation.x += controls.rotationSpeed
        cube.rotation.y += controls.rotationSpeed
        cube.rotation.z += controls.rotationSpeed
        step += controls.bouncingSpeed

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }
    
    renderScene()
}

