# Vue GodRays Component 🌟

![GodRays Effect Demo](https://i.imgur.com/cBGQcKv.gif)

A stunning and customizable God Rays (Light Rays) effect component for Vue applications. Create atmospheric lighting effects with ease, perfect for adding dramatic flair to your web projects.

## ✨ Features

- 🎨 Multiple color modes (single, multi, random)
- ⚡ Smooth animation controls
- 🎛️ Fully customizable rays (count, reach, intensity)
- 📱 Responsive design
- 🎯 Precise positioning control
- 🎨 Custom background color support

## 📦 Installation

```bash
npm install vue-godrays
# or
yarn add vue-godrays
```

## 🚀 Quick Start

```vue
<template>
  <GodRays
    :animation="{ animate: true, speed: 1 }"
    :raysColor="{ mode: 'single', color: '#ffffff' }"
    :intensity="0.8"
    :rays="20"
  />
</template>

<script>
import { GodRays } from 'vue-godrays'

export default {
  components: {
    GodRays
  }
}
</script>
```

## 🎮 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `Object` | `{ animate: true, speed: 1 }` | Controls animation state and speed |
| `raysColor` | `Object` | `{ mode: 'single', color: '#ffffff' }` | Defines ray coloring mode and colors |
| `backgroundColor` | `string` | `'#000000'` | Background color of the component |
| `intensity` | `number` | `0.7` | Intensity of the rays (0.0 - 1.0) |
| `rays` | `number` | `15` | Number of light rays |
| `reach` | `number` | `1` | How far the rays extend |
| `position` | `number` | `0.5` | Center position of rays (0.0 - 1.0) |
| `radius` | `string` | `'50%'` | Radius of the light source |
| `style` | `Object` | `{}` | Additional CSS styles |

### 🎨 Color Modes

The component supports three color modes through the `raysColor` prop:

1. **Single Color Mode**
```javascript
:raysColor="{ mode: 'single', color: '#ffffff' }"
```

2. **Multi Color Mode**
```javascript
:raysColor="{ 
  mode: 'multi',
  color1: '#ff0000',
  color2: '#00ff00'
}"
```

3. **Random Color Mode**
```javascript
:raysColor="{ mode: 'random' }"
```

## 🎯 Examples

### Basic Usage
```vue
<GodRays
  :animation="{ animate: true, speed: 1 }"
  :raysColor="{ mode: 'single', color: '#ffffff' }"
  :intensity="0.8"
  :rays="20"
/>
```

### Dramatic Effect
```vue
<GodRays
  :animation="{ animate: true, speed: 0.5 }"
  :raysColor="{ mode: 'multi', color1: '#ff0000', color2: '#ffd700' }"
  :intensity="1"
  :rays="30"
  :reach="1.5"
  backgroundColor="#000000"
/>
```

### Subtle Background Effect
```vue
<GodRays
  :animation="{ animate: true, speed: 0.3 }"
  :raysColor="{ mode: 'single', color: '#4a90e2' }"
  :intensity="0.4"
  :rays="15"
  :reach="0.8"
  backgroundColor="rgba(0,0,0,0.8)"
/>
```

## 🛠️ TypeScript Support

The component includes full TypeScript support with the following interface:

```typescript
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
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## 📝 License

[MIT License](link-to-license) - feel free to use this component in your projects!

## 🙏 Credits

Developed with ❤️ by [Your Name/Organization]

---

If you find this component useful, please consider giving it a ⭐️ on GitHub!
