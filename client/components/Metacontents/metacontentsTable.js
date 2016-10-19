
import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { find } from 'lodash/collection'
import FlatButton from 'material-ui/FlatButton'
import style from './style.css'

const MetacontentRow = (props) => {
  const { metacontent, channel, onDeleteMetacontent, ...otherProps } = props

  return (
    <TableRow {...otherProps} >
      <TableRowColumn>
        <img
          className={style.img}
          thumbnail
          src={!(metacontent.image) || (metacontent.image.length === 0)
            ? 'http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716'
            : (metacontent.image)}
        />
      </TableRowColumn>
      <TableRowColumn
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
      >
        {metacontent.name}
      </TableRowColumn>
      <TableRowColumn
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
      >
        {metacontent.description}
      </TableRowColumn>
      <TableRowColumn>{metacontent.category}</TableRowColumn>
      <TableRowColumn>{channel.name}</TableRowColumn>
      <TableRowColumn>
        <FlatButton
          secondary
          className={style.button}
          onClick={() => onDeleteMetacontent(metacontent, channel)}
        >
          Xóa
        </FlatButton>
      </TableRowColumn>
    </TableRow>
  )
}

MetacontentRow.propTypes = {
  metacontent: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  channel: PropTypes.object,
  onDeleteMetacontent: PropTypes.func.isRequired,
}

const MetacontentsTable = (props) => {
  const { metacontents, channels, onDeleteMetacontent } = props
  return (
    <div className={style.metacontentsTable}>
      <Table fixedHeader>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Ảnh</TableHeaderColumn>
            <TableHeaderColumn>Tên</TableHeaderColumn>
            <TableHeaderColumn>Mô tả</TableHeaderColumn>
            <TableHeaderColumn>Loại</TableHeaderColumn>
            <TableHeaderColumn>Kênh</TableHeaderColumn>
            <TableHeaderColumn>T.Tác</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows
          showRowHover
        >
          {metacontents.map(metacontent => (
            <MetacontentRow
              metacontent={metacontent}
              channel={find(channels, ['id', metacontent.ChannelId])}
              key={metacontent.id}
              onDeleteMetacontent={onDeleteMetacontent}
            />
          ))}
        </TableBody>
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
  onDeleteMetacontent: PropTypes.func.isRequired,
}

export default MetacontentsTable

