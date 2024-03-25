import "./homePage.css";
import { configData } from "./homePageData";

export function CardGrid() {
  return (
    <div className="force-tocenter">
      <div className="mygrid-layout">
        {configData.map((configRecord) => (
          <DisplayCard key={configRecord.cardLabel} card={configRecord} />
        ))}
      </div>
    </div>
  );
}

function DisplayCard({
  card,
}: {
  card: {
    cardLabel: string;
    cardDescription: string;
    buttonLabel: string;
    buttonHref: string;
  };
}) {
  return (
    <a href={card.buttonHref}>
      <div className="mycard">
        <div className="mycard-inner">
          <div className="mycard-inner-Label">{card.cardLabel}</div>
          <div className="mycard-inner-cardDescription">
            {card.cardDescription}
          </div>
        </div>
      </div>
    </a>
  );
}

// function Button({
//   button,
// }: {
//   button: { buttonLabel: string; buttonHref: string };
// }) {
//   return (
//     <a href={button.buttonHref}>
//       <button className="mybutton-style">{button.buttonLabel}</button>
//     </a>
//   );
// }
