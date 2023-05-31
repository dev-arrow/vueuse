import { ref } from 'vue-demi'
import { useRefHistory } from '.'
import { renderHook } from '../../_docs/tests'

describe('useRefHistory', () => {
  test('should record', () => {
    renderHook(() => {
      const v = ref(0)
      const { prev } = useRefHistory(v)

      expect(prev.length).toBe(1)
      expect(prev[0].value).toBe(0)

      v.value = 2

      expect(prev.length).toBe(2)
      expect(prev[0].value).toBe(2)
      expect(prev[1].value).toBe(0)
    })
  })

  test('should be able to undo and redo', () => {
    renderHook(() => {
      const v = ref(0)
      const { undo, redo, prev } = useRefHistory(v)

      v.value = 2
      v.value = 3
      v.value = 4

      expect(v.value).toBe(4)
      expect(prev.length).toBe(4)
      undo()
      expect(v.value).toBe(3)
      undo()
      expect(v.value).toBe(2)
      redo()
      expect(v.value).toBe(3)
      redo()
      expect(v.value).toBe(4)
      redo()
      expect(v.value).toBe(4)
    })
  })
})
