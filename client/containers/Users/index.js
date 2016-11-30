
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Users from '../../components/Users'
import DeleteComfirm from '../../components/Users/deleteComfirm'
import CreateUser from '../../components/CreateUser'
import CreateNewsProviders from '../../components/CreateNewsProvider'
import { loadUsersPage, deleteUser, submitUser, loadNewsPage, submitNewsp, deleteNewsp } from '../../actions'


class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this)
    this.handleChangebtm = this.handleChangebtm.bind(this)
    this.handleClickCreateNewspButton = this.handleClickCreateNewspButton.bind(this)
    this.handleNewspSubmit = this.handleNewspSubmit.bind(this)
    this.state = {
      openCreate: false,
      openNewspCreate: false,
      openDeleteComfirm: false,
      selectedbtm: 0,
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

  handleClickCreateNewspButton() {
    this.setState({ openNewspCreate: true })
  }

  handleDeleteSubmit(delUser, pw) {
    const user = {
      ...delUser,
      password: pw,
    }
    this.props.deleteUser(user)
  }

  handleChangebtm(index) {
    this.setState({ selectedbtm: index })
    if (index === 1) {
      this.props.loadNewsPage()
    }
  }

  handleNewspSubmit(newsp) {
    this.props.submitNewsp(newsp)
  }

  render() {
    const { users, auth, submiting, deletting, newsp } = this.props
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
              newsp={newsp}
              selectedbtm={this.state.selectedbtm}
              onCreateUser={this.handleClickCreateButton}
              onCreateNewsp={this.handleClickCreateNewspButton}
              onchangebtm={this.handleChangebtm}
              onDeleteUser={(user) => {
                this.setState({
                  openDeleteComfirm: true,
                  selectedDelUser: user,
                })
              }}
              onDeleteNewsp={(newsprovider) => {
                this.props.deleteNewsp(newsprovider)
              }}
            />
            <CreateUser
              onSubmit={this.handleSubmit}
              open={this.state.openCreate}
              onClose={() => this.setState({ openCreate: false })}
              isSubmit={submiting}
            />
            <CreateNewsProviders
              onSubmit={this.handleNewspSubmit}
              open={this.state.openNewspCreate}
              onClose={() => this.setState({ openNewspCreate: false })}
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
  newsp: PropTypes.array,
  auth: PropTypes.object,
  loadUsersPage: PropTypes.func.isRequired,
  loadNewsPage: PropTypes.func.isRequired,
  submitNewsp: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
  deleteNewsp: PropTypes.func.isRequired,
  submiting: PropTypes.bool,
  deletting: PropTypes.bool,
}

function mapStateToProps(state) {
  const { auth, entities: { users, newsp } } = state
  const { submitData: { submiting } } = state
  const { deleteData: { deletting } } = state
  return {
    auth,
    users,
    newsp,
    submiting,
    deletting,
  }
}

export default connect(mapStateToProps, {
  loadUsersPage,
  deleteUser,
  submitUser,
  loadNewsPage,
  submitNewsp,
  deleteNewsp,
})(UsersContainer)
