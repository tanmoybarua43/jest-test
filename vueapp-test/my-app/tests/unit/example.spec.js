// tests/unit/MessageComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import MessageComponent from '@/components/MessageComponent.vue';

describe('MessageComponent', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(MessageComponent, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
