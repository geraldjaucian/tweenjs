# tweenjs

simple tween using requestAnimationFrame

> npm i @porkchappie/tweenjs

```js
import Tween from '@porkchappie/tweenjs'

const tween = Tween({
  target: 143, duration: 69143,
  onstart: o => console.log(`start@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
  onupdate: o => console.log(`update@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
  onend: o => console.log(`end@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
  oncancel: o => console.log(`cancel@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
  interpolation: t => t * t
})
tween.cancel()
```