import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import { Link, MemoryRouter } from 'react-router-dom'
import { Logo } from '../Logo'
import { ROUTES } from '../../../../router/types'

Enzyme.configure({ adapter: new Adapter() })

describe('Logo component', () => {
  it('Should render Logo component', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render hidden button "Go back"', () => {
    const component = shallow(<Logo />)
    const LinkComponent = component.find(Link)
    expect(LinkComponent.props().className).toEqual(
      'logo__button logo__button_hidden'
    )
  })

  it('Should render visible button "Go back"', () => {
    const component = shallow(<Logo backUrl={ROUTES.MAIN} />)
    const LinkComponent = component.find(Link)
    expect(LinkComponent.props().className).toEqual('logo__button')
  })
})
