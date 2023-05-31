import type { ComputedRef } from 'vue-demi'
import { computed } from 'vue-demi'
import { toValue } from '../toValue'
import type { MaybeComputedRef } from '../utils'

/**
 * Reactively convert a ref to string.
 *
 * @see https://vueuse.org/useToString
 */
export function useToString(
  value: MaybeComputedRef<unknown>,
): ComputedRef<string> {
  return computed(() => `${toValue(value)}`)
}
