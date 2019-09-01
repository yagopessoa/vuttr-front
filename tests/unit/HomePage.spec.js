import HomePage from '@/components/HomePage.vue'

describe('HomePage', () => {
  
  it('sets the correct default data', () => {

    expect(typeof HomePage.data).toBe('function')
    const defaultData = HomePage.data()

    expect(defaultData.mounted).toBe(false)
    expect(defaultData.apiError).toBe(false)
    expect(defaultData.tools).toEqual([])
    expect(defaultData.searchTagsOnly).toBe(false)
    expect(defaultData.loading).toBe(true)
    expect(defaultData.removeDialog).toBe(false)
    expect(defaultData.selectedTool).toEqual({
      title: '',
      link: '',
      description: '',
      tags: []
    })
    expect(defaultData.addToolDialog).toBe(false)
    expect(defaultData.titleFormValid).toBe(true)
    expect(defaultData.linkFormValid).toBe(true)
    expect(defaultData.addToolTitle).toBe('')
    expect(defaultData.addToolLink).toBe('')
    expect(defaultData.addToolDescription).toBe('')
    expect(defaultData.addToolTags).toBe('')

  })

})
