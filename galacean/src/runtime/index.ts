import {
  Animator,
  BlinnPhongMaterial,
  Camera,
  Entity,
  GLTFResource,
  MeshRenderer,
  PrimitiveMesh,
  Vector3,
  WebGLEngine
} from '@galacean/engine';
import { LottieAnimation } from '@galacean/engine-lottie';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import { Stats } from "@galacean/engine-toolkit-stats";

export async function createLottie() {
  const engine = new WebGLEngine('canvas');
  engine.canvas.resizeByClientSize();

  const root = engine.sceneManager.activeScene.createRootEntity();

  const cameraEntity = root.createChild('camera');
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(0, 0, 10);
  cameraEntity.addComponent(OrbitControl);
  cameraEntity.addComponent(Stats);
  engine.resourceManager
    .load<Entity>({
      urls: [
        'https://gw.alipayobjects.com/os/bmw-prod/84c13df1-567c-4a67-aa1e-c378ee698c55.json',
        'https://gw.alipayobjects.com/os/bmw-prod/965eb2ca-ee3c-4c54-a502-7fdc0673f1d7.atlas'
      ],
      type: 'lottie'
    })
    .then(async (lottieEntity) => {
      root.addChild(lottieEntity);
      lottieEntity.transform.setPosition(0, -3, 0);
      const lottie = lottieEntity.getComponent(LottieAnimation);

      lottie.repeats = 2;
      await lottie.play('beforePlay');
      lottie.repeats = 1;
      await lottie.play('onPlay');
      lottie.play('afterPlay');
    });

  engine.run();
}
export function createRuntime() {
  const engine = new WebGLEngine('canvas');
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // init camera
  const cameraEntity = rootEntity.createChild('camera');
  cameraEntity.addComponent(Camera);
  const pos = cameraEntity.transform.position;
  pos.set(10, 10, 10);
  cameraEntity.transform.position = pos;
  cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

  // init light
  scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
  scene.ambientLight.diffuseIntensity = 1.2;

  // init cube
  const cubeEntity = rootEntity.createChild('cube');
  const renderer = cubeEntity.addComponent(MeshRenderer);
  const mtl = new BlinnPhongMaterial(engine);
  const color = mtl.baseColor;
  color.r = 0.0;
  color.g = 0.8;
  color.b = 0.5;
  color.a = 1.0;
  renderer.mesh = PrimitiveMesh.createCuboid(engine);
  renderer.setMaterial(mtl);

  engine.run();
}
export function createGLft() {
  const engine = new WebGLEngine("canvas");
  engine.canvas.resizeByClientSize();
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(3, 3, 3);
  cameraEntity.addComponent(OrbitControl);
  cameraEntity.addComponent(Stats);
  
  engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
  
  engine.resourceManager
    .load<GLTFResource>(
      "/revenge.gltf"
    )
    .then((gltf) => {
      const {
        animations,
        defaultSceneRoot
      } = gltf;
      rootEntity.addChild(defaultSceneRoot);
    });
  
  engine.run();
}