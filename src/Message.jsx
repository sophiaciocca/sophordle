import './Message.scss';

function Message(props) {
  const { message } = props;
  return (
    <div className="message-container">
      <div className="message">{message}</div>
    </div>
  );
}

export default Message;

