/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import Emoji from "../components/emoji"
import Footer from "../components/footer"
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate"
import { Link } from "gatsby"

import SEO from "../components/seo"

const HomePage = () => {
	return (
    <>
      <SEO/>

      <div className="wrapper" style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: 30
      }}>
        <Fade>
          <div>
            <Emoji symbol="👋" label="hand wave emoji" /> I'm Erik
          </div>
        </Fade>
        <Rotate bottom left>
        <div>
          <Link to="/about">About</Link> | <Link to="/blog">Blog</Link> |
          <a href="https://www.github.com/ewhipp" target="_blank">Github</a>
          </div>
          </Rotate>
      </div>

      <Footer/>
    </>
	)
}

export default HomePage
