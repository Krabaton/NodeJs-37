import './message.css'

const Message = ({ item, currentUser }) => {
  const classMessage =
    item.user === currentUser ? 'alert alert-primary' : 'alert alert-dark'
  return (
    <div className="message-container">
      <span className={classMessage}>
        {item.user}: {item.text}
      </span>
    </div>
  )
}

export default Message
