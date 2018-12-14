let camera, scene, renderer, cube, trackBallControls, clock;

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)    
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Helper axes
    let axesHelper = new THREE.AxesHelper(20)
    scene.add(axesHelper)

    let cubeGeom = new THREE.BoxGeometry(10, 10, 10) 
    let meshMaterial1 = createMaterial("vertex-shader", "fragment-shader-1");
    let cubeMesh = new THREE.MeshStandardMaterial({ color: 0x00FFFF, metalness: 0.9, roughness: 0.9 })
    cube = new THREE.Mesh(cubeGeom, meshMaterial1)
    cube.position.set(-4, 4, 4)
    scene.add(cube)

    // Initialize the light
    initLight()

    // Setting camera
    // let cameraHelper = new THREE.CameraHelper(camera)
    // scene.add(cameraHelper)

    camera.position.set(-45, 50, 50)
    camera.lookAt(scene.position)
    
    window.addEventListener('resize', resize)
    document.querySelector('#shader-scene').appendChild(renderer.domElement)

    trackBallControls = initTrackballControls(camera, renderer)
    clock = new THREE.Clock()

    render()
}

function render() {
    trackBallControls.update(clock.getDelta())
    cube.rotation.x += 0.01
    cube.rotation.z += 0.01
    cube.rotation.y += 0.01

    cube.material.uniforms.time.value += 0.01

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

function initLight() {
    let ambienLight = new THREE.AmbientLight(0x3a3a3a)
    scene.add(ambienLight)

    let spotLight1 = new THREE.SpotLight(0xFFFFFF)
    spotLight1.intensity = 3
    spotLight1.angle = 0.3
    spotLight1.distance = 70
    spotLight1.position.set(10, 50, 20);

    let spotLight2 = new THREE.SpotLight(0xFFFFFF)
    spotLight2.intensity = 3
    spotLight2.angle = 0.3
    spotLight2.distance = 70
    spotLight2.position.set(-10, 50, 20);

    let helper1 = new THREE.SpotLightHelper(spotLight1)
    let helper2 = new THREE.SpotLightHelper(spotLight2)
    // scene.add(helper1)
    // scene.add(helper2)
    scene.add(spotLight1)
    scene.add(spotLight2)
}

function createMaterial(vertexShader, fragmentShader) {
    let vertShader = document.getElementById(vertexShader).innerHTML;
    let fragShader = document.getElementById(fragmentShader).innerHTML;

    let attributes = {};
    let uniforms = {
        time: {
            type: 'f',
            value: 0.2
        },
        scale: {
            type: 'f',
            value: 0.2
        },
        alpha: {
            type: 'f',
            value: 0.6
        },
        resolution: {
            type: 'v2',
            value: new THREE.Vector2()
        }
    }

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    let meshMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        transparent: true
    })

    return meshMaterial
}
