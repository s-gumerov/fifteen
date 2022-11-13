import renderer from 'react-test-renderer';
import { Triangles } from '../Triangles';

describe('Triangles component', () => {
  it('Should render Triangles component', () => {
    const tree = renderer
      .create(<Triangles />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
});