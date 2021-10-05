import { Color, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export class App {
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    private readonly controls = new OrbitControls(this.camera, this.renderer.domElement);

    private brick: Mesh;

    constructor() {
        const geometry = new PlaneGeometry(100, 100);
        const material = new MeshBasicMaterial({ color: new Color('rgb(255,25,125)') });
        this.brick = new Mesh(geometry,material);
        this.scene.add(this.brick);
        this.camera.position.set(0, 0, 200);
        this.controls.target.set(0,0,200-1e-10);

        this.controls.domElement = this.renderer.domElement;

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(25,25,125)'));

        this.render();
    }

    private adjustCanvasSize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(() => this.render());
        this.adjustCanvasSize();
    }
}
