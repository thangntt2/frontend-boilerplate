
import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const MetacontentsResults = (props) => {
  const { result, handleClick, isSubmitting } = props
  return (
    <div>
      {result.map(metacontent => (
        <Card style={{ marginBottom: '12px' }}>
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
      ))}
    </div>)
}

MetacontentsResults.propTypes = {
  result: PropTypes.array,
  isSubmitting: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

export default MetacontentsResults
