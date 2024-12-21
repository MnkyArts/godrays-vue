import { App } from "vue";
import GodRaysComponent from "./GodRays.vue";

export const GodRays = GodRaysComponent;
export type { GodRaysProps } from "./types";

export function install(app: App) {
  app.component("GodRays", GodRaysComponent);
}

export default {
  install,
};
