function init() {
    let stats = initStats()
    
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
    

    let renderer = new THREE.WebGLRenderer()
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
    cube.position.set(-4, 2, 0)
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

    let step = 0;
    function renderScene() {
        stats.update()

        // Let the ball bounce!
        step += 0.04
        sphere.position.x = 20 + 10*(Math.cos(step))
        sphere.position.y = 2 + 10*Math.abs(Math.sin(step))

        // Rotate Cube
        cube.rotation.x += 0.02
        cube.rotation.y += 0.02
        cube.rotation.z += 0.02

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }
    
    renderScene()
}

