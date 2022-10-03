import { Logo, Triangles } from '../../components/ui'
import './styles.scss';

export const MainLayout = (props: {children: JSX.Element, logoClass: string}): JSX.Element => (
    <div className="content-wrap">
      <Logo logoClass={props.logoClass}/>
      <div className="content-center">{props.children}</div>
      <Triangles />
    </div>
  )