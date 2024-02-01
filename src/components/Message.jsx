export default function Message({ messages, setMessages }) {
  function handleClick(messages) {
    messages.shift()
    const updatedMessages = [...messages]
    setMessages(updatedMessages)
  }
  return (
    <div>
      <p>{messages.length && messages[0]}</p>
      <p onClick={() => handleClick(messages)}>&#9660;</p>
    </div>
  )
}
