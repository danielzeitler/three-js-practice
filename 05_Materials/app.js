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
    scene.add(plane)

    // Materials
    let sphereGeo = new THREE.SphereGeometry(5, 20, 20)
    let sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        specular: 0xFFFFFF,
        shininess: 70
    })
    let sphere = new THREE.Mesh(sphereGeo, sphereMaterial)
    sphere.position.set(0, 7, 0)
    scene.add(sphere)

    let sphereGeo1 = new THREE.SphereGeometry(5, 20, 20)
    let sphereMaterial1 = new THREE.MeshStandardMaterial({
        color: 0x2194ce,
        roughness: 0.7,
        metalness: 0.84,
    })
    let sphere1 = new THREE.Mesh(sphereGeo1, sphereMaterial1)
    sphere1.position.set(-20, 7, 0)
    scene.add(sphere1)



    // add Spotlight
    let spotLight = new THREE.SpotLight(0xFFFFFF, 1.2, 150, 120)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // subtle ambient lighting
    let ambienLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambienLight)

    camera.position.set(-45, 50, 50)
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

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    renderScene()
}
