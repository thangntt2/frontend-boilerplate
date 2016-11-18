
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Users from '../../components/Users'
import { loadUsersPage, deleteUser, submitUser } from '../../actions'

class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      openCreate: false,
    }
  }

  componentWillMount() {
    this.props.loadUsersPage()
  }

  handleSubmit(user) {
    this.props.submitUser(user)
  }

  handleDeleteUser(user) {
    this.props.deleteUser(user)
  }

  handleClickCreateButton() {
    this.setState({ openCreate: true })
  }

  render() {
    const { users } = this.props
    return (
      <div>
        {users && users.length > 0 &&
          <Users
            users={users}
            onCreateUser={this.handleClickCreateButton}
            onDeleteUser={this.handleDeleteUser}
            onSubmit={this.handleSubmit}
            open={this.state.openCreate}
            onClose={() => this.setState({ openCreate: false })}
          />
        }
      </div>
    )
  }
}

UsersContainer.propTypes = {
  users: PropTypes.array,
  loadUsersPage: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { entities: { users } } = state
  return {
    users,
  }
}

export default connect(mapStateToProps, {
  loadUsersPage,
  deleteUser,
  submitUser,
})(UsersContainer)
