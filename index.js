export const linear_interpolation = t => t
export const exp_interpolation = t => t * t
/**
 * @author Gerald Jaucian <gerald.jaucian@gmail.com>
 * ```js
 * const tween = Tween({
 *    target: 143, duration: 69143,
 *    onstart: o => console.log(`start@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
 *    onupdate: o => console.log(`update@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
 *    onend: o => console.log(`end@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
 *    oncancel: o => console.log(`cancel@ ellapsed: ${o.ellapsed}, value: ${o.value}`),
 *    interpolation: t => t * t
 *  })
 *  tween.cancel()
 * ```
 */
export default function({ duration = 400, target, onstart, onupdate, onend, oncancel, interpolation }) {
  const start = document.timeline.currentTime
  let animId;
  var ret = {
    value: 0,
    ellapsed: 0,
    cancel() {
      cancelAnimationFrame(animId)
      oncancel?.(ret)
    }
  }
  function animate() {
    animId = requestAnimationFrame(_ => {
      ret.ellapsed = Math.min(duration, document.timeline.currentTime - start)
      if (target) ret.value = (interpolation || linear_interpolation)(ret.ellapsed / duration) * target
      onupdate?.(ret)
      if (ret.ellapsed < duration) {
        animate()
      } else {
        onend?.(ret)
        animId = undefined
      }
    })
  }
  animate()
  onstart?.(ret)
  onupdate?.(ret)
  return ret
}