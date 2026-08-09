import { Link } from "react-router";

import './_heading-section.scss';

const HeadingSection = ({heading, body, includeBack = false}) => {
  const parseBody = (value) => {
    if (typeof value === 'string') {
      return <p className="body">{value}</p>
    } else if (Array.isArray(value)) {
      return (
        <>
          {value.map( (t, i) => {
            return <p key={i} className="body">{t}</p>
          })}
        </>
      )
    } else {
      console.log("The body value inputted in the HeaderSection is not a string or an array");
    }
  }

  return (
    <section className="heading-container">
      <div className="container">
        <div className="row">
          {
            includeBack &&

            <Link
              to={'/'}
              className="home-link"
            >
              Back to Menu
            </Link>
          }
          <h1 className="heading">{heading}</h1>

          {
            parseBody(body)
          }
        </div>
      </div>
    </section>
  )
}

export default HeadingSection;