import type { ComputedRef } from 'vue-demi'
import { computed } from 'vue-demi'
import type { MaybeComputedRef } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'

export interface UsePrecisionOptions {
  /**
   * Method to use for rounding
   *
   * @default 'round'
   */
  math?: 'floor' | 'ceil' | 'round'
}

/**
 * Reactively set the precision of a number.
 *
 * @see https://vueuse.org/usePrecision
 */
export function usePrecision(
  value: MaybeComputedRef<number>,
  digits: MaybeComputedRef<number>,
  options?: MaybeComputedRef<UsePrecisionOptions>,
): ComputedRef<number> {
  return computed<number>(() => {
    const _value = toValue(value)
    const _digits = toValue(digits)
    const power = 10 ** _digits
    return Math[toValue(options)?.math || 'round'](_value * power) / power
  })
}
