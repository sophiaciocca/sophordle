import classNames from 'classnames/bind';
import './Message.scss';

function Message(props) {
  const { message } = props;
  return (
    <div className="message-container">
      <div className={classNames({
        'message': true,
        'success': message.type === 'success',
        'error': message.type === 'error',
        'loss': message.type === 'loss',
      })}>{message.text}</div>
    </div>
  );
}

export default Message;

