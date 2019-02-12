import React from 'react'
import renderer from 'react-test-renderer'
import Select from '../../src/components/Select'

describe('Select Component', () => {
  it ('matches the select snapshot', () => {
    const nodeTree = renderer.create(<Select />).toJSON()
    expect(nodeTree).toMatchSnapshot()
  })
})
