import React from 'react'
import renderer from 'react-test-renderer'
import Chip from '../../src/components/Chip'

describe('Input Component', () => {
  it ('matches the chip snapshot', () => {
    const nodeTree = renderer.create(<Chip />).toJSON()
    expect(nodeTree).toMatchSnapshot()
  })
})
