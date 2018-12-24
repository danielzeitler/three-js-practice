function init() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    let gui = new dat.GUI();

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    camera.lookAt(new THREE.Vector3(0, 0, 0))
    
    let renderer = new THREE.WebGLRenderer()

    
    let enableFog = false
    
    if(enableFog) {
        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.2)
    }
    
    // Geometry
    // let box = getBox(1, 1, 1)
    // box.position.y = box.geometry.parameters.height / 2 
    // scene.add(box)

    let boxGrid = getBoxGrid(10, 1.5)

    
    
    let plane = getPlane(30)    
    plane.name = 'plane-1'
    plane.rotation.x = Math.PI / 2
    
    // let pointLight = getPointLight(1)
    // pointLight.position.y = 2
    // pointLight.intensity = 2
    // scene.add(pointLight)
    // pointLight.add(sphere)
    let sphere = getSphere(0.05)
    
    // let spotLight = getSpotLight(1)
    // spotLight.position.y = 4
    // spotLight.intensity = 2
    // scene.add(spotLight)
    // spotLight.add(sphere)
    
    let directionalLight = getDirectionalLight(1)
    directionalLight.position.x = 13
    directionalLight.position.y = 10
    directionalLight.position.z = 10
    directionalLight.intensity = 2
    scene.add(directionalLight)
    directionalLight.add(sphere)
    
    
    let helper = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(helper)

    let ambientLight = getAmbientLight(1)
    scene.add(ambientLight)

    // gui.add(pointLight, 'intensity', 0, 10)
    // gui.add(pointLight.position, 'y', 0, 5)
    // gui.add(spotLight, 'intensity', 0, 10)
    // gui.add(spotLight.position, 'x', 0, 20)
    // gui.add(spotLight.position, 'y', 0, 20)
    // gui.add(spotLight.position, 'z', 0, 20)
    // gui.add(spotLight, 'penumbra', 0, 1)

    gui.add(directionalLight, 'intensity', 0, 10)
    gui.add(directionalLight.position, 'x', 0, 20)
    gui.add(directionalLight.position, 'y', 0, 20)
    gui.add(directionalLight.position, 'z', 0, 20)
    
    scene.add(plane)
    scene.add(boxGrid)
    
    
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('rgb(120, 120, 120)')    
    document.getElementById("webgl").appendChild(renderer.domElement)

    let controls = new THREE.OrbitControls(camera, renderer.domElement)

    update(renderer, scene, camera, controls)

}

function getBox(width, height, depth) {
    let geometry = new THREE.BoxGeometry(width, height, depth)
    let material = new THREE.MeshPhongMaterial({ color: 'rgb(120, 120, 120)' })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true

    return mesh
}

function getSphere(size) {
    let geometry = new THREE.SphereGeometry(size, 24, 24)
    let material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 255, 255)' })
    let mesh = new THREE.Mesh(geometry, material)

    return mesh
}

function getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size)
    let material = new THREE.MeshPhongMaterial({ color: 'rgb(120, 120, 120)', side: THREE.DoubleSide })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    
    return mesh
}

function getBoxGrid(amount, separationMultiplier) {
    let group = new THREE.Group()

    for(let i = 0; i < amount; i++) {
        let obj = getBox(1, 1, 1)
        obj.position.x = i * separationMultiplier
        obj.position.y = obj.geometry.parameters.height / 2
        group.add(obj)

        for(let j = 1; j < amount; j++) {
            let obj = getBox(1, 1, 1)
            obj.position.x = i * separationMultiplier
            obj.position.y = obj.geometry.parameters.height / 2
            obj.position.z = j * separationMultiplier
            group.add(obj)
        }
    }

    group.position.x = -(separationMultiplier * (amount - 1)) / 2
    group.position.z = -(separationMultiplier * (amount - 1)) / 2
    
    return group
}

function getAmbientLight(intensity) {
    let light = new THREE.AmbientLight('rgb(10, 30, 50)', intensity)

    return light
}

function getPointLight(intensity) {
    let light = new THREE.PointLight(0xFFFFFF, intensity)
    light.castShadow = true

    return light
}

function getSpotLight(intensity) {
    let light = new THREE.SpotLight(0xFFFFFF, intensity)
    light.castShadow = true
    light.shadow.bias = 0.001
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048

    return light
}

function getDirectionalLight(intensity) {
    let light = new THREE.DirectionalLight(0xFFFFFF, intensity)
    light.castShadow = true

    light.shadow.camera.left = -10
    light.shadow.camera.bottom = -10
    light.shadow.camera.right = 10
    light.shadow.camera.top = 10

    return light;
}

function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera)
    
    // let plane = scene.getObjectByName('plane-1')
    // plane.rotation.y += 0.001
    // plane.rotation.z += 0.001

    // scene.traverse((child) => {
    //     child.scale.x += 0.001
    // })

    controls.update()
    
    requestAnimationFrame(() => {
        update(renderer, scene, camera, controls)
    })
}









