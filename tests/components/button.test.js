import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from '../../src/components/Button'

describe('Button Component', () => {
  it ('matches the button snapshot', () => {
    const nodeTree = renderer.create(<Button />).toJSON()
    expect(nodeTree).toMatchSnapshot()
  })

  it('render props correctly', () => {
    const wrapper = shallow(<Button label="test" />)
    expect(wrapper.props().children).toEqual('test')
    expect(wrapper.find('button').contains('test')).toEqual(true)
  })
  it('has default button classname', () => {
    const wrapper = shallow(<Button label="test" />)
    expect(wrapper.hasClass('button')).toEqual(true)
  })
})
