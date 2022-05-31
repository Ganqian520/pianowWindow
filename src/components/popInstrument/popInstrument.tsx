import { useEffect, useRef } from "react";
import { instruments, classify } from '../../lib/instruments'
export default function popInstrument() {

  //切换乐器
  function changeIns(i: number) {
    // insIndex = i
    // document.getElementById('ins-name')!.innerText= instruments[i].cn
    // document.getElementById('pop-instrument')!.style.visibility = 'hidden'
    // loadIns(i)
    // draw(0,0)
  }

  return (
    <div className="container">
      <div className="left">

      </div>
      <div className="right">
        {
          instruments.map((v, i) => {
            return (
              <div className="instrument-item" key={i} onClick={() => (changeIns(i))}>{i}{instruments[i].cn}</div>
            )
          })
        }
      </div>
    </div>
  )
}