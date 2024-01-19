import Prompt from "./Prompt";
import Buttons from "./Buttons";

export default function Menu({partnerPoke, setCurrentMenu}) {
  return (
    <div id="menu">
      <Prompt partnerPoke={partnerPoke} />
      <Buttons setCurrentMenu={setCurrentMenu} />
    </div>
  );
}
