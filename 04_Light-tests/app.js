function init() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  let renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;

  axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);

  let planeGeometry = new THREE.PlaneGeometry(30, 30);
  let planeMesh = new THREE.MeshLambertMaterial({ color: 0xcccccc });
  let plane = new THREE.Mesh(planeGeometry, planeMesh);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  let cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
  let cubeMesh = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  let cube = new THREE.Mesh(cubeGeometry, cubeMesh);
  cube.position.set(0, 8, 0);
  cube.castShadow = true;
  scene.add(cube);

  // Init Lights
  let ambienLight = new THREE.AmbientLight(0x292929);
  // scene.add(ambienLight);

  let target = new THREE.Object3D();
  target.position = new THREE.Vector3(5, 0, 0);

  let spotLight = new THREE.SpotLight(0xcccccc);
  spotLight.position.set(-10, 25, 0);
  spotLight.castShadow = true;
  spotLight.angle = 0.1;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 45;
  spotLight.shadow.camera.fov = 20;
  spotLight.intensity = 2
  scene.add(spotLight);

  let pp = new THREE.SpotLightHelper(spotLight);
  scene.add(pp);

  let debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);
  // scene.add(debugCamera)

  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  document.querySelector("#light-scene").appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  let invert = 1;
  let phase = 0;
  function render() {
    trackballControls.update(clock.getDelta());

    if (phase > 2 * Math.PI) {
      invert = invert * -1;
      phase -= 1 * Math.PI;
    } else {
      phase += 0.02;
    }
    spotLight.position.z = -(3 * Math.sin(phase));
    spotLight.position.x = -(8 * Math.cos(phase));
    spotLight.position.y = 30;

    if (invert < 0) {
      var pivot = 14;
      spotLight.position.x = invert * (spotLight.position.x - pivot) + pivot;
    }

    //spotLight.position.copy(camera.position);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}