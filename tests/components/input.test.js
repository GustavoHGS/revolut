import React from 'react'
import renderer from 'react-test-renderer'
import Input from '../../src/components/Input'

describe('Input Component', () => {
  it ('matches the input snapshot', () => {
    const nodeTree = renderer.create(<Input />).toJSON()
    expect(nodeTree).toMatchSnapshot()
  })
})
