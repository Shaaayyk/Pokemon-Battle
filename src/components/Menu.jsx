import Prompt from "./Prompt";
import Buttons from "./Buttons";

export default function Menu({partnerPoke}) {
  return (
    <div id="menu">
      <Prompt partnerPoke={partnerPoke} />
      <Buttons />
    </div>
  );
}
