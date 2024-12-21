import { ref, onMounted, onBeforeUnmount, watch, type Ref } from "vue";
import * as THREE from "three";
import { RAY_Y_POSITIONS, VERTEX_SHADER, FRAGMENT_SHADER } from "./constants";
import { mapRange, colorToRGBA } from "./utils";
import type { GodRaysProps } from "./types";

export function useThreeSetup(props: GodRaysProps) {
  const containerRef = ref<HTMLDivElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);

  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let mesh: THREE.Mesh | null = null;
  let frameId: number | null = null;
  let isAnimating = true;

  const setupScene = () => {
    if (!containerRef.value || !canvasRef.value) return;

    // Initialize renderer with optimized settings
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.value.clientWidth,
      containerRef.value.clientHeight
    );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      containerRef.value.clientWidth / containerRef.value.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const geometry = new THREE.PlaneGeometry(1024, 1024);
    const material = createShaderMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  const createShaderMaterial = () => {
    if (!containerRef.value) return null;

    const colors = computeColors();

    return new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      uniforms: createUniforms(colors),
    });
  };

  const createUniforms = (colors: {
    color1: number[];
    color2: number[];
    opacity: number;
  }) => {
    if (!containerRef.value) return {};

    return {
      u_resolution: {
        value: [
          containerRef.value.clientWidth,
          containerRef.value.clientHeight,
        ],
      },
      u_mouse: { value: [0.5, 0.5] },
      u_time: { value: 0 },
      u_colors: {
        value: [
          new THREE.Vector4(...colors.color1, 1),
          new THREE.Vector4(...colors.color2, 1),
        ],
      },
      u_intensity: { value: mapRange(props.intensity ?? 50, 0, 100, 0, 0.5) },
      u_rays: { value: mapRange(props.rays ?? 30, 0, 100, 0, 0.3) },
      u_reach: { value: mapRange(props.reach ?? 40, 0, 100, 0, 0.5) },
      u_rayPos1: {
        value: [
          ((props.position ?? 80) / 100) *
            (containerRef.value?.clientWidth ?? 0),
          RAY_Y_POSITIONS.RAY_1 * (containerRef.value?.clientHeight ?? 0),
        ],
      },
      u_rayPos2: {
        value: [
          ((props.position ?? 80) / 100 + 0.02) *
            (containerRef.value?.clientWidth ?? 0),
          RAY_Y_POSITIONS.RAY_2 * (containerRef.value?.clientHeight ?? 0),
        ],
      },
    };
  };

  const animate = () => {
    if (!isAnimating || !renderer || !scene || !camera || !mesh) return;

    const material = mesh.material as THREE.ShaderMaterial;
    const time =
      (performance.now() * 0.001 * (props.animation?.speed ?? 10)) / 10;

    material.uniforms.u_time.value = time;
    renderer.render(scene, camera);

    frameId = requestAnimationFrame(animate);
  };

  const cleanup = () => {
    if (frameId != null) {
      cancelAnimationFrame(frameId);
    }

    if (renderer) {
      renderer.dispose();
    }

    if (mesh) {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }
  };

  const handleResize = () => {
    if (!containerRef.value || !renderer || !camera || !mesh) return;

    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    const material = mesh.material as THREE.ShaderMaterial;
    if (material.uniforms) {
      material.uniforms.u_resolution.value = [width, height];
      material.uniforms.u_rayPos1.value = [
        ((props.position ?? 80) / 100) * width,
        RAY_Y_POSITIONS.RAY_1 * height,
      ];
      material.uniforms.u_rayPos2.value = [
        ((props.position ?? 80) / 100 + 0.02) * width,
        RAY_Y_POSITIONS.RAY_2 * height,
      ];
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!mesh || !containerRef.value) return;

    const rect = containerRef.value.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;

    (mesh.material as THREE.ShaderMaterial).uniforms.u_mouse.value = [x, y];
  };

  const computeColors = () => {
    const defaultColors = {
      color1: [0.6, 0.8, 1.0],
      color2: [0.4, 0.6, 0.9],
      opacity: 1.0,
    };

    if (!props.raysColor) {
      return defaultColors;
    }

    switch (props.raysColor.mode) {
      case "single": {
        const [r, g, b, a] = colorToRGBA(props.raysColor.color);
        return {
          color1: [r, g, b],
          color2: [r, g, b],
          opacity: a,
        };
      }

      case "multi": {
        const [r1, g1, b1, a1] = colorToRGBA(props.raysColor.color1);
        const [r2, g2, b2, a2] = colorToRGBA(props.raysColor.color2);
        return {
          color1: [r1, g1, b1],
          color2: [r2, g2, b2],
          opacity: Math.min(a1, a2),
        };
      }

      case "random": {
        return {
          color1: [Math.random(), Math.random(), Math.random()],
          color2: [Math.random(), Math.random(), Math.random()],
          opacity: 1.0,
        };
      }

      default:
        return defaultColors;
    }
  };

  onMounted(() => {
    setupScene();
    animate();

    window.addEventListener("resize", handleResize);
    containerRef.value?.addEventListener("mousemove", handleMouseMove);
  });

  onBeforeUnmount(() => {
    cleanup();
    window.removeEventListener("resize", handleResize);
    containerRef.value?.removeEventListener("mousemove", handleMouseMove);
  });

  // Watch for animation changes
  watch(
    () => props.animation?.animate,
    (newValue) => {
      isAnimating = newValue ?? true;
      if (newValue && frameId === null) {
        animate();
      }
    }
  );

  return {
    containerRef,
    canvasRef,
  };
}
