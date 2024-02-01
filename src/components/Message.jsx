export default function Message({ messages, setMessages }) {
  function handleClick(messages) {
    messages.shift()
    const updatedMessages = [...messages]
    setMessages(updatedMessages)
  }
  return (
    <div id="messageContainer">
      <p className="message">{messages.length && messages[0]}</p>
      <p className="arrow" onClick={() => handleClick(messages)}>&#9660;</p>
    </div>
  )
}
