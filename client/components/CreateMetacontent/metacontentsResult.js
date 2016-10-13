
import React, { PropTypes } from 'react'
import { Panel, ListGroup, ListGroupItem, Row, Col, Image } from 'react-bootstrap'
import Spinner from 'react-spinkit'
import style from './style.css'

const MetacontentsResults = (props) => {
  const { result, handleClick, isSubmitting } = props
  return (
    <div className={style.centerbody}>
      {isSubmitting
      ? <Spinner spinnerName="three-bounce" />
      : (
        <Panel>
          <ListGroup>
            {result.map(metacontent => (
              <ListGroupItem
                key={metacontent.url}
                onClick={() => handleClick(metacontent)}
              >
                <Row className="show-grid">
                  <Col md={1}>
                    <Image
                      thumbnail
                      src={!(metacontent.image) || (metacontent.image.length === 0)
                        ? 'http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
                        : (metacontent.image)}
                    />
                  </Col>
                  <Col md={11}>
                    {metacontent.source}{metacontent.time && `-${metacontent.time}`}
                    <br />
                    <b>{metacontent.name}</b>
                    <br />
                    {metacontent.description}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Panel>
      )
    }
    </div>)
}

MetacontentsResults.propTypes = {
  result: PropTypes.array,
  isSubmitting: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

export default MetacontentsResults
