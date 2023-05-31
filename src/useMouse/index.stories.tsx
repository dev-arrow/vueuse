import 'vue-tsx-support/enable-check'
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { createComponent } from '../api'
import { ShowDocs } from '../dev/storybook'
import { useMouse } from '.'

const Demo = createComponent({
  setup () {
    return {
      ...useMouse(),
    }
  },

  render (this: Vue & any) {
    const {
      x,
      y,
    } = this

    // @ts-ignore
    const Docs: any = <ShowDocs md={require('./index.md')} />

    return (
      <div>
        <div id='demo' ref='demo'>
          <pre lang='json'>{JSON.stringify({
            x,
            y,
          }, null, 2)}</pre>
        </div>
        {Docs}
      </div>
    )
  },
})

storiesOf('Sensors', module)
  .add('useMouse', () => Demo as any)
