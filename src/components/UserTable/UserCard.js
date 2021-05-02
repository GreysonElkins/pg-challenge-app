import './UserCard.scss'

const UserCard = ({ id, firstName, lastName, email, avatar, products }) => (
  <div className="UserCard">
      <img src={avatar} alt={`${firstName}'s avatar`} className="avatar"/>
      <div className="profile-name">{firstName} {lastName}</div>
      <div className="email">{email}</div>
  </div>
)

export default UserCard