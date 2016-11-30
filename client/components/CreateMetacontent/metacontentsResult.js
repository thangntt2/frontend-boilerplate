
import React, { PropTypes } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

class OnHoverCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
    this.setHover = this.setHover.bind(this)
  }

  setHover(value) {
    this.setState({ hover: value })
  }

  render() {
    const { metacontent, handleClick } = this.props
    return (
      <Card
        key={metacontent.id}
        style={{ marginBottom: '12px' }}
        onClick={() => handleClick(metacontent)}
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        zDepth={this.state.hover ? 3 : 1}
      >
        <CardHeader
          title={metacontent.name}
          subtitle={metacontent.time
            ? `${metacontent.source}-${metacontent.time}`
            : metacontent.source}
          avatar={!(metacontent.image) || (metacontent.image.length === 0)
                  ? 'http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
                  : (metacontent.image)}
        />
        <CardText>
          {metacontent.description}
        </CardText>
      </Card>
    )
  }
}

const MetacontentsResults = (props) => {
  const { result, handleClick, isSubmitting } = props
  return (
    <div style={{ display: 'inline-block' }}>
      {result.length > 0 && result.map(metacontent => (
        <OnHoverCard metacontent={metacontent} handleClick={handleClick} />
      ))}
    </div>)
}

MetacontentsResults.propTypes = {
  result: PropTypes.array,
  isSubmitting: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

export default MetacontentsResults
