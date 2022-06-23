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
export default function ({ duration = 400, target, onstart, onupdate, onend, oncancel, interpolation }) {
  let animId;
  let run = true
  var ret = {
    value: 0,
    ellapsed: 0,
    cancel() {
      run = false
      cancelAnimationFrame(animId)
      animId = undefined
      oncancel?.(ret)
    }
  }
  const start = document.timeline.currentTime
  function animate() {
    if (duration) {
      animId = requestAnimationFrame(_ => {
        animId = undefined
        ret.ellapsed = Math.min(duration, document.timeline.currentTime - start)
        if (target) ret.value = (interpolation || linear_interpolation)(ret.ellapsed / duration) * target
        onupdate?.(ret)
        if (run) {
          if (ret.ellapsed < duration) {
            animate()
          } else {
            onend?.(ret)
          }
        }
      })
    } else {
      run && onupdate?.(ret)
      run && onend?.(ret)
    }
  }
  onstart?.(ret)
  run && animate()
  return ret
}
