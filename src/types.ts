export interface GodRaysProps {
  animation?: {
    animate: boolean;
    speed: number;
  };
  raysColor?: {
    mode: "single" | "multi" | "random";
    color?: string;
    color1?: string;
    color2?: string;
  };
  backgroundColor?: string;
  intensity?: number;
  rays?: number;
  reach?: number;
  position?: number;
  radius?: string;
  style?: Record<string, string | number>;
}
