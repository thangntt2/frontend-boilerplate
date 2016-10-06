
import React, { PropTypes } from 'react'
import { Table, Image } from 'react-bootstrap'
import { find } from 'lodash/collection'
import style from './style.css'

const MetacontentRow = (props) => {
  const { metacontent, channel } = props

  return (
    <tr>
      <td>
        <Image
          className={style.img}
          thumbnail
          src={!(metacontent.image) || (metacontent.image.length === 0)
            ? 'http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
            : (metacontent.image)}
        />
      </td>
      <td>{metacontent.name}</td>
      <td>{metacontent.description}</td>
      <td>{metacontent.category}</td>
      <td>{channel}</td>
    </tr>
  )
}

MetacontentRow.propTypes = {
  metacontent: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  channel: PropTypes.string,
}

const MetacontentsTable = (props) => {
  const { metacontents, channels } = props
  return (
    <div className={style.metacontentsTable}>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Loại</th>
            <th>Kênh</th>
          </tr>
        </thead>
        <tbody>
          {metacontents.map(metacontent => (
            <MetacontentRow
              metacontent={metacontent}
              channel={find(channels, ['id', metacontent.ChannelId]).name}
              key={metacontent.id}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

MetacontentsTable.propTypes = {
  metacontents: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
    })),
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.icon,
    })),
}

export default MetacontentsTable

