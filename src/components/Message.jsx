export default function Message({
  messages,
  setMessages,
  partnerPoke,
  wildPoke,
  setPartnerPokeHp,
  setWildPokeHp,
}) {
  function handleClick(messages) {
    const currentMessage = messages.shift();
    if (currentMessage?.attackingPoke === partnerPoke?.name) {
      setWildPokeHp(currentMessage?.defendingPokeHp)
    }
    if (currentMessage?.attackingPoke === wildPoke?.name) {
      setPartnerPokeHp(currentMessage?.defendingPokeHp)
    }
    const updatedMessages = [...messages];
    setMessages(updatedMessages);
  }
  return (
    <div id="messageContainer">
      <p className="message">{messages.length && messages[0].message}</p>
      <p className="arrow" onClick={() => handleClick(messages)}>
        &#9660;
      </p>
    </div>
  );
}
