
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Users from '../../components/Users'
import DeleteComfirm from '../../components/Users/deleteComfirm'
import CreateUser from '../../components/CreateUser'
import { loadUsersPage, deleteUser, submitUser } from '../../actions'


class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this)
    this.state = {
      openCreate: false,
    }
  }

  componentWillMount() {
    if (this.props.auth.level === 'admin') {
      this.props.loadUsersPage()
    }
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

  handleDeleteSubmit(delUser, pw) {
    const user = {
      ...delUser,
      password: pw,
    }
    this.props.deleteUser(user)
  }

  render() {
    const { users, auth, submiting, deletting } = this.props
    if (auth.level !== 'admin') {
      return (
        <header>
          Bạn không có quyền truy cập vào trang này!
        </header>
      )
    }
    return (
      <div>
        {users && users.length > 0 &&
          <div>
            <Users
              users={users}
              onCreateUser={this.handleClickCreateButton}
              onDeleteUser={(user) => {
                this.setState({
                  openDeleteComfirm: true,
                  selectedDelUser: user,
                })
              }}
            />
            <CreateUser
              onSubmit={this.handleSubmit}
              open={this.state.openCreate}
              onClose={() => this.setState({ openCreate: false })}
              isSubmit={submiting}
            />
            <DeleteComfirm
              onSubmit={this.handleDeleteSubmit}
              open={this.state.openDeleteComfirm}
              onClose={() => this.setState({ openDeleteComfirm: false })}
              user={this.state.selectedDelUser}
              isSubmit={deletting}
            />
          </div>
        }
      </div>
    )
  }
}

UsersContainer.propTypes = {
  users: PropTypes.array,
  auth: PropTypes.object,
  loadUsersPage: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
  submiting: PropTypes.bool,
  deletting: PropTypes.bool,
}

function mapStateToProps(state) {
  const { auth, entities: { users } } = state
  const { submitData: { submiting } } = state
  const { deleteData: { deletting } } = state
  return {
    auth,
    users,
    submiting,
    deletting,
  }
}

export default connect(mapStateToProps, {
  loadUsersPage,
  deleteUser,
  submitUser,
})(UsersContainer)
