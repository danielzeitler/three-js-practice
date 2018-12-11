function init() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    let renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true;

    let controls = new THREE.OrbitControls(camera)

    createBoundingWall(scene)
    createGroundPlane(scene)
    createHouse(scene)
    createTree(scene)

    let axesHelper = new THREE.AxesHelper(20)
    scene.add(axesHelper)

    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    scene.add(spotLight)

    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    controls.update()

    function animate() {
        requestAnimationFrame(animate);
        controls.update()
        renderer.render(scene, camera)
    }

    animate()
    document.getElementById('threejs-garden').appendChild(renderer.domElement)
    renderer.render(scene, camera)
}

function createBoundingWall(scene) {
    let wallLeft = new THREE.CubeGeometry(70, 2, 2)
    let wallRight = new THREE.CubeGeometry(70, 2, 2)
    let wallTop = new THREE.CubeGeometry(2, 2, 50)
    let wallBottom = new THREE.CubeGeometry(2, 2, 50)

    let wallMaterial = new THREE.MeshLambertMaterial({
        color: 0xa0522d
    })

    let wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial)
    let wallRightMesh = new THREE.Mesh(wallRight, wallMaterial)
    let wallTopMesh = new THREE.Mesh(wallTop, wallMaterial)
    let wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial)

    wallLeftMesh.position.set(15, 1, -25)
    wallRightMesh.position.set(15, 1, 25)
    wallTopMesh.position.set(-19, 1, 0)
    wallBottomMesh.position.set(49, 1, 0)

    scene.add(wallLeftMesh)
    scene.add(wallRightMesh)
    scene.add(wallTopMesh)
    scene.add(wallBottomMesh)
}

function createGroundPlane(scene) {
    let planeGeometry = new THREE.PlaneGeometry(70, 50)
    let planeMesh = new THREE.MeshLambertMaterial({
        color: 0x9acd32
    })

    let plane = new THREE.Mesh(planeGeometry, planeMesh)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)

    scene.add(plane)
}

function createHouse(scene) {
    let roofGeometry = new THREE.ConeGeometry(5, 4)
    let baseGeometry = new THREE.CylinderGeometry(5, 5, 6)

    let roofMesh = new THREE.MeshLambertMaterial({
        color: 0x8b7213
    })

    let baseMesh = new THREE.MeshLambertMaterial({
        color: 0xffe4c4
    })

    let roof = new THREE.Mesh(roofGeometry, roofMesh)
    let base = new THREE.Mesh(baseGeometry, baseMesh)

    roof.position.set(25, 8, 0)
    base.position.set(25, 3, 0)

    roof.receiveShadow = true
    base.receiveShadow = true
    roof.castShadow = true
    base.castShadow = true

    scene.add(roof)
    scene.add(base)
}

function createTree(scene) {
    let trunkGeometry = new THREE.CubeGeometry(1, 6, 1)
    let leavesGeometry = new THREE.SphereGeometry(5, 10)

    let trunkMesh = new THREE.MeshLambertMaterial({
        color: 0x8b4513
    })

    let leavesMesh = new THREE.MeshLambertMaterial({
        color: 0x00FF00
    })

    let trunk = new THREE.Mesh(trunkGeometry, trunkMesh)
    let leaves = new THREE.Mesh(leavesGeometry, leavesMesh)

    trunk.position.set(-10, 3, 0)
    leaves.position.set(-10, 10, 0)

    trunk.castShadow = true;
    trunk.receiveShadow = true;
    leaves.castShadow = true;
    leavesMesh.receiveShadow = true;

    scene.add(trunk)
    scene.add(leaves)
}







