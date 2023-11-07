export default function Toolbox ({setActiveTool} : { setActiveTool : (tool : string) => void}) {

  return (
    <div className="tool-box">
      <div className="tool">
        <button className="choose-waves-count" id="choose-waves-count" onClick={()=> {
          setActiveTool("range-slider");
        }}>
          <img src="/img/frequency.svg" alt="Frequency Icon"/>
        </button>
      </div>
      <div className="tool divider"></div>
      <div className="tool " onClick={() => {
        setActiveTool("color-picker");
      }}>
        <button className="pick-color" id="pick-color"></button>
      </div>
    </div>
  )
}
