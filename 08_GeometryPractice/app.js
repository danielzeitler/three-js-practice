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

    // Helper for the x, y, z axes
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
    // scene.add(plane)


    let sphereGeom = new THREE.SphereGeometry(5, 20, 20, 0, Math.PI, 0, Math.PI);
    let sphereMesh = new THREE.MeshNormalMaterial({ color: 0x0000FF, side: THREE.DoubleSide })
    let sphere = new THREE.Mesh(sphereGeom, sphereMesh)
    sphere.position.set(0, 10, 0)
    scene.add(sphere)

    // add Spotlight
    let spotLight = new THREE.SpotLight(0xFFFFFF, /* 1.2, 150, 120 */)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // subtle ambient lighting
    let ambienLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambienLight)

    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // addGui()

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

        sphere.rotation.x += 0.02
        sphere.rotation.y += 0.02

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()
}
