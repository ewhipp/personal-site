/** @jsx jsx */
import { jsx } from 'theme-ui'

const date = new Date().getFullYear();

const Footer = () => (
  <footer 
    className="site-footer"
    sx={{
      bg: 'primary'
    }}
  >
    <div className="container">
      <p>Erik Whipp &#9400; Copyright {date}</p>
    </div>
  </footer>
)

export default Footer