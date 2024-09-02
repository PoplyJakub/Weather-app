import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TheToggle from '@/shared/components/TheToggle.vue'
import { ref } from 'vue'


vi.mock('@/shared/composables/localStorage/useLocalStorage', () => ({
    useLocalStorage: () => ({
        storedValue: ref(false),
        setValue: vi.fn(),
    })
}))

describe('TheToggle Component', () => {
    it('renders correctly', () => {
        const wrapper = mount(TheToggle)
        expect(wrapper.exists()).toBe(true)
    })



    it('dispatches geolocation-toggle event when checkbox changes', async () => {
        const wrapper = mount(TheToggle)
        const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')

        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setValue(true)


        expect(dispatchEventSpy).toHaveBeenCalled()
        expect(dispatchEventSpy.mock.calls[0][0].type).toBe('geolocation-toggle')
    })
})