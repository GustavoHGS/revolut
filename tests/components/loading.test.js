import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Loading from '../../src/components/Loading'

describe('Loading Component', () => {
  const initialState = { application: { isApplicationLoading: false } }
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore(initialState)
  })

  it ('matches the loading snapshot', () => {
    const nodeTree = renderer.create(<Provider store={store}><Loading /></Provider>).toJSON()
    expect(nodeTree).toMatchSnapshot()
  })
})
