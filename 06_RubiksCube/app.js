function init() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    let axesHelper = new THREE.AxesHelper(20)
    scene.add(axesHelper)

    let group = new THREE.Mesh()
    let mats = []

    mats.push(new THREE.MeshLambertMaterial({color: 0x00FFFF}))
    mats.push(new THREE.MeshLambertMaterial({color: 0xFF00FF}))
    mats.push(new THREE.MeshLambertMaterial({color: 0xFFFF00}))
    mats.push(new THREE.MeshLambertMaterial({color: 0xFF0000}))
    mats.push(new THREE.MeshLambertMaterial({color: 0x00FF00}))
    mats.push(new THREE.MeshLambertMaterial({color: 0x0000FF}))

    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            for(let z = 0; z < 3; z++) {
                let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9)
                let cube = new THREE.Mesh(cubeGeom, mats)
                cube.position.set(x * 5 - 5, y * 5 - 5, z * 5 - 5)

                group.add(cube)
            }
        }
    }

    group.scale.copy(new THREE.Vector3(2,2,2))
    scene.add(group)

    camera.position.set(0, 80, 80)
    camera.lookAt(scene.position)

    // Init Light
    initLight(scene)

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    })

    document.querySelector("#rubiks-scene").appendChild(renderer.domElement)
    
    let trackBallControls = initTrackballControls(camera, renderer)
    let clock = new THREE.Clock()

    function render() {
        trackBallControls.update(clock.getDelta())

        group.rotation.x += 0.01
        group.rotation.y += 0.01
        group.rotation.z += 0.01

        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }

    render()
}

function initLight(scene) {
    let ambientLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambientLight)

    let spotLight = new THREE.SpotLight(0xFFFFFF)
    spotLight.position.set(35, 30, 0)

    let spotLightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotLightHelper)

    scene.add(spotLight)
}












