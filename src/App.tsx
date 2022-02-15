import { useEffect} from 'react'
import './app.scss'
import { Music, Cursor,Instrument} from './types'
import {instruments} from './lib/instruments'

export default function App() {


  let a = import.meta.globEager('./lib/audiofont/player.js')
  let b = a['./lib/audiofont/player.js']
  // let a = import.meta.globEager('./test.js')
  // let b = a['./test.js']
  let Player = b.WebAudioFontPlayer
  let zones = {}
  
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let unitW: number = 20  //最小格子宽高
  let unitH: number = 20
  let squareA: number = 50 //左上角方块的边长
  let originX: number = 0 //画布原点相对初始原点的坐标
  let originY: number = -88 * unitH / 2 + 300
  let count: number = 1000 //方块横向个数，纵向为88
  let diaoHao: number = 1 //调号，1~24
  let bpm = 120 //bpm
  let isKeyX: boolean = false //键是否按下中
  let isKeyY: boolean = false
  let isMouseLeftDown = false
  let isMoved = false //判断是否移动过，移动过就不算作点击
  let isNumber = true //音符显示数字还是字母
  let isPlay = false //是否播放中
  let musics: Music[] = [{ indexX: 0, indexY: 48, length: 4 }, { indexX: 4, indexY: 46, length: 4 }, { indexX: 8, indexY: 44, length: 4 },
  { indexX: 12, indexY: 43, length: 4 }, { indexX: 16, indexY: 41, length: 4 }, { indexX: 20, indexY: 39, length: 4 }
    , { indexX: 24, indexY: 37, length: 4 }, { indexX: 28, indexY: 36, length: 16 },] //音乐数据
  let newMusicLength = 4 //每次添加时的音乐时值
  let cursor: Cursor = Cursor.miss //鼠标类型
  let accX: number = 0 //鼠标累计移动
  let accY: number = 0
  let indexAlive: number = -1 //鼠标按下时命中的音乐块序号
  let indexX: number //鼠标按下时的位置
  let indexY: number
  let interval: any //周期定时器，每隔16音符时长检查一下是否播放
  let current = 0 //当前播放位置
  let breakPoints: number[] = [] //循环断点
  let insIndex = 0 //乐器序号
  let actx:AudioContext 
  let player = new Player() 
  let instrumentJS: null = null

  useEffect(() => {
    init()
    initInstrument()
    draw(0, 0)
    loadIns(insIndex)
  }, [])

  //加载乐器资源
  async function loadIns(index = 0){
    let instrument = instruments[index]
    let path = `https://surikov.github.io/webaudiofontdata/sound/${instrument.file}`
    setTimeout(() => {
      console.log('2s')
      actx = new AudioContext()
      player.loader.decodeAfterLoading(actx, '_tone_0250_SoundBlasterOld_sf2')
    }, 2000);
    // player.loader.startLoad(actx, path, instrument.variable);
    // player.loader.waitLoad = ()=>{
    //   instrumentJS = (window as any)[instrument.variable]   
    //   console.log('加载成功')
    //   console.log(instrumentJS)
    // }
    // fetch(path).then(res=>{
    //   console.log(res)
    //   res.text()
    // }).then(res=>{
    //   console.log(res)
    // })
    // setInterval(() => {
    //   console.log(player.loader.progress())
    // }, 1000);
  }
  //发出声音
  function makeSound(indexY: number, length: number) {
    player.queueWaveTable(actx, actx.destination, zones, 0, 87-indexY, 60/bpm*length/4,0.5);
  }
  //点击播放,暂停
  function play() {
    isPlay = !isPlay
    let maxUnit = 0
    musics.forEach((v) => {
      maxUnit = Math.max(maxUnit, v.indexX + v.length)
    })
    if (isPlay) {
      document.getElementById('play')!.innerHTML = '暂停'
      interval = setInterval(() => {
        //断点循环模式
        if (breakPoints.length == 2) {
          if (current < breakPoints[0] || current >= breakPoints[1]) {
            current = breakPoints[0]
          }
          musics.forEach((v) => {
            v.indexX == current && makeSound(v.indexY, v.length)
          })
          draw(0, 0)
          current++
          return
        }
        //播放完自动暂停
        if (current == maxUnit) {
          current = 0
          isPlay = false
          document.getElementById('play')!.innerHTML = '播放'
          clearInterval(interval)
          draw(0, 0)
          return
        }
        musics.forEach((v) => {
          v.indexX == current && makeSound(v.indexY, v.length)
        })
        draw(0, 0)
        current++
      }, 60 / bpm / 4 * 1000)
    } else {
      document.getElementById('play')!.innerHTML = '播放'
      clearInterval(interval)
    }
  }
  //监听鼠标悬停
  function initInstrument(){
    let div1 = document.getElementById('instrument')!
    let div2 = document.getElementById('pop-instrument')!
    div1.onmouseenter = ()=>{
      if(div2!=null) div2.style.visibility = 'visible'
    }
    div1.onmouseleave = ()=>{
      if(div2!=null) div2.style.visibility = 'hidden'
    }
  }
  //初始化
  function init(): void {
    canvas = document.getElementById('canvas')!! as HTMLCanvasElement
    canvas.width = innerWidth
    canvas.height = innerHeight - 50
    ctx = canvas.getContext('2d')!!
    window.addEventListener('keydown', (e) => {
      if (e.code == 'KeyX') isKeyX = true
      if (e.code == 'KeyY') isKeyY = true
    })
    window.addEventListener('keyup', (e) => {
      if (e.code == 'KeyX') isKeyX = false
      if (e.code == 'KeyY') isKeyY = false
    })
    window.oncontextmenu = (e) => {
      e.preventDefault()
    }
    window.onresize = ()=>{
      draw(0,0)
    }
    let json: string | null = localStorage.getItem('music_list_pianowwindow')
    if (json) musics = JSON.parse(json)
  }
  //鼠标按下
  function mousedown(e: any) {
    if (e.button == 0) {
      isMouseLeftDown = true
    }
    judgeCursor(e)
  }
  //鼠标移动
  function mousemove(e: any) {
    if (isMouseLeftDown) {
      isMoved = true
      if (cursor == Cursor.position) {
        accY += e.movementY
        accX += e.movementX
        if (Math.abs(accX) >= unitW) {
          musics[indexAlive].indexX += accX / Math.abs(accX)
          accX = 0
          draw(0, 0)
        }
        if (Math.abs(accY) >= unitH) {
          musics[indexAlive].indexY += accY / Math.abs(accY)
          accY = 0
          draw(0, 0)
        }
      } else if (cursor == Cursor.length) {
        accX += e.movementX
        if (Math.abs(accX) >= unitW) {
          musics[indexAlive].length += accX / Math.abs(accX)
          if (musics[indexAlive].length < 1) musics[indexAlive].length = 1
          newMusicLength = musics[indexAlive].length
          accX = 0
          draw(0, 0)
        }
      } else if (cursor == Cursor.miss) {
        draw(e.movementX, e.movementY)
      }
    }
  }
  //鼠标松开
  function mouseup(e: any) {
    let x = e.nativeEvent.offsetX
    let y = e.nativeEvent.offsetY
    //点击琴键
    if (e.button == 0 && x < squareA && y > squareA) {
      let index = Math.floor((y  - squareA - originY) / unitH)
      makeSound(index, 4)
    }
    //控制断点
    if (e.button == 0 && !isMoved && x > squareA && y < squareA) {
      let index = Math.floor((x - squareA) / unitW)
      let isExist = false
      for (let i = 0; i < breakPoints.length; i++) {
        if (breakPoints[i] == index) {
          breakPoints.splice(i, 1)
          draw(0, 0)
          isExist = true
          break
        }
      }
      if (!isExist && breakPoints.length < 2) {
        breakPoints.push(index)
        breakPoints.sort((a, b) => a - b)
        draw(0, 0)
      }
    }
    //删除乐块
    if (e.button == 2 && cursor != Cursor.miss) {
      musics.splice(indexAlive, 1)
      draw(0, 0)
    }
    //添加乐块
    if (e.button == 0 && cursor == Cursor.miss && !isMoved && x > squareA && y > squareA) {
      musics.push({ indexX, indexY, length: newMusicLength })
      draw(0, 0)
    }
    //保存
    if (x > 0 && x < squareA && y > 0 && y < squareA) {
      localStorage.setItem('music_list_pianowwindow', JSON.stringify(musics))
      alert('保存成功')
    }
    isMoved = false
    isMouseLeftDown = false
    cursor = Cursor.miss
  }
  //鼠标滚轮
  function mousewheel(e: any) {
    let unit = 3
    if (isKeyY) {
      if (e.deltaY > 0) {
        let indexY = Math.floor((e.nativeEvent.offsetY - originY - squareA) / unitH)
        let remainder = (e.nativeEvent.offsetY - originY - squareA) % unitH
        let add2 = unit * (remainder / unitH)
        if (unitH < 50) {
          unitH += unit
        } else {
          return
        }
        draw(0, -(indexY * unit + add2))
      } else {
        let indexY = Math.floor((e.nativeEvent.offsetY - originY - squareA) / unitH)
        let remainder = (e.nativeEvent.offsetY - originY - squareA) % unitH
        let add2 = unit * (remainder / unitH)
        if (unitH > 10) {
          unitH -= unit
        } else {
          return
        }
        draw(0, (indexY * unit + add2))
      }
    }
    if (isKeyX) {
      if (e.deltaY > 0) {
        let indexX = Math.floor((e.nativeEvent.offsetX - originX - squareA) / unitW)
        let remainder = (e.nativeEvent.offsetX - originX - squareA) % unitW
        let add2 = unit * (remainder / unitW)
        if (unitW < 50) {
          unitW += unit
        } else {
          return
        }
        draw(-(indexX * unit + add2), 0)
      } else {
        let indexX = Math.floor((e.nativeEvent.offsetX - originX - squareA) / unitW)
        let remainder = (e.nativeEvent.offsetX - originX - squareA) % unitW
        let add2 = unit * (remainder / unitW)
        if (unitW > 15) {
          unitW -= unit
        } else {
          return
        }
        draw((indexX * unit + add2), 0)
      }
    }
  }
  //判断鼠标样式，伸缩|移动|未命中
  function judgeCursor(e: any) {
    indexX = Math.floor((e.nativeEvent.offsetX - originX - squareA) / unitW)
    indexY = Math.floor((e.nativeEvent.offsetY - originY - squareA) / unitH)
    for (let i = 0; i < musics.length; i++) {
      if (indexX >= musics[i].indexX && indexX < musics[i].indexX + musics[i].length && indexY == musics[i].indexY) {
        let remainder = (e.nativeEvent.offsetX - originX - squareA) - unitW * musics[i].indexX
        if (remainder < unitW * musics[i].length * 0.5) {
          cursor = Cursor.position
        } else {
          cursor = Cursor.length
        }
        indexAlive = i
        break
      } else {
        cursor = Cursor.miss
      }
    }
  }
  //绘制
  function draw(movX: number, movY: number): void {
    initAndCheck(movX, movY)
    drawMiddleBackGround()
    drawMiddleBlock()
    drawTopGraduation()
    drawLeftPiano()
    drawLeftTop()
  }
  //重置画布，检查越界
  function initAndCheck(movX: number, movY: number): void {
    canvas.width = innerWidth
    canvas.height = innerHeight
    originX += movX
    originY += movY
    if (originX > 0) originX = 0
    if (originY > 0) originY = 0
    if (originY < -(unitH * 88 - innerHeight)) originY = -(unitH * 88 - innerHeight)
    ctx.translate(originX, originY)
  }
  //画中间背景
  function drawMiddleBackGround() {
    ctx.save()
    ctx.translate(squareA, squareA)
    for (let i = 0; i < 88; i++) {
      let str = tf(i)
      ctx.fillStyle = str.charAt(0) == '#' ? 'rgb(46,62,72)' : 'rgb(52,68,78)'
      ctx.fillRect(0, i * unitH, count * unitW, unitH)
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.lineWidth = 0.5
      ctx.moveTo(0, unitH * i)
      ctx.lineTo(unitW * count, unitH * i)
      ctx.stroke()
    }
    for (let i = 0; i < count; i++) {
      ctx.beginPath()
      ctx.moveTo(unitW * i, 0)
      ctx.lineTo(unitW * i, unitH * 88)
      ctx.stroke()
    }
    ctx.fillStyle = 'cyan'
    ctx.fillRect(current * unitW, 0, unitW, 88 * unitH)
    ctx.restore()
  }
  //画中间音乐块
  function drawMiddleBlock(): void {
    ctx.save()
    ctx.translate(squareA, squareA)
    musics.forEach((item, i) => {
      ctx.fillStyle = 'SlateGray'
      ctx.fillRect(item.indexX * unitW, item.indexY * unitH, item.length * unitW, unitH)
      ctx.fillStyle = 'black'
      ctx.rect(item.indexX * unitW, item.indexY * unitH, item.length * unitW, unitH)
      ctx.lineWidth = 0.3
      ctx.stroke()
      ctx.fillStyle = 'white'
      ctx.textBaseline = 'middle'
      ctx.font = "15px ''"
      ctx.textAlign = 'left'
      ctx.fillText(tf(item.indexY), item.indexX * unitW, (item.indexY + 0.5) * unitH)
      ctx.textAlign = 'right'
      ctx.fillText(item.length.toString(), item.indexX * unitW + item.length * unitW, (item.indexY + 0.5) * unitH)
    })
    ctx.restore()
  }
  //画上边刻度
  function drawTopGraduation(): void {
    ctx.save()
    ctx.translate(squareA, -originY)
    ctx.fillStyle = 'rgba(40,40,40)'
    ctx.fillRect(0, 0, unitW * count, squareA)
    for (let i = 0; i < count / 16; i++) {
      ctx.beginPath()
      ctx.moveTo(unitW * i * 16, 0)
      ctx.lineTo(unitW * i * 16, squareA)
      ctx.stroke()
      ctx.fillStyle = 'white'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillText(`${i + 1}`, unitW * 16 * (i + 0.5), squareA / 2)
    }
    ctx.fillStyle = 'cyan'
    breakPoints.forEach((v) => {
      ctx.beginPath()
      ctx.arc((v + 0.5) * unitW, squareA - 8, 5, 0, 2 * Math.PI)
      ctx.fill()
    })
    ctx.restore()
  }
  //画左边钢琴条
  function drawLeftPiano(): void {
    ctx.save()
    ctx.translate(-originX, squareA)
    for (let i = 0; i < 88; i++) {
      let str = tf(i)
      //背景
      ctx.fillStyle = str.charAt(0) == '#' ? 'black' : 'white'
      ctx.fillRect(0, unitH * i, squareA, unitH)
      //线
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.lineWidth = 0.5
      ctx.moveTo(0, unitH * i)
      ctx.lineTo(squareA, unitH * i)
      ctx.stroke()
      //文字
      ctx.font = "15px ''"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = str.charAt(0) != '#' ? 'black' : 'white'
      ctx.fillText(str, squareA / 2, unitH * (i + 0.5))
    }
    ctx.restore()
  }
  //画左上角
  function drawLeftTop() {
    ctx.save()
    ctx.translate(-originX, -originY)
    ctx.fillStyle = 'rgb(20,20,20)'
    ctx.fillRect(0, 0, squareA, squareA)
    ctx.font = "15px ''"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'white'
    ctx.fillText('保存', squareA / 2, squareA / 2)
    ctx.restore()
  }
  //根据0~77返回对应音符：数字和标点,注意是倒序传入，中央c为c5
  function tf(index: number): string {
    index = 88 - 1 - index
    index += 10
    index -= diaoHao % 12 - 1
    let remainder = index % 12
    let quotient = Math.floor(index / 12)
    if (remainder == 0) {
      remainder = 12
      quotient -= 1
    }
    if (diaoHao > 12) remainder += 12
    if (isNumber) {
      let list = ['1', '#1', '2', '#2', '3', '4', '#4', '5', '#5', '6', '#6', '7', '1', '#1', '2', '3', '#3', '4', '#4', '5', '6', '#6', '7', '#7']
      return `${list[remainder - 1]}|${-4 + quotient}`
    } else {
      let list = ['C', '#C', 'D', '#D', 'E', 'F', '#F', 'G', '#G', 'A', '#A', 'B', 'C', '#C', 'D', 'E', '#E', 'F', '#F', 'G', 'A', '#A', 'B', '#B']
      return `${list[remainder - 1]}${-4 + quotient + 5}`
    }
  }
  //中央c为c4,
  function calNote(index:number):string {
    index = 88 - 1 - index
    index += 10
    let remainder = index % 12
    let quotient = Math.floor(index / 12)
    if (remainder == 0) {
      remainder = 12
      quotient -= 1
    }
    let list = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B', 'C', 'Cs', 'D', 'E', 'Es', 'F', 'Fs', 'G', 'A', 'As', 'B', 'Bs']
    // return `https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments/samples/${instrument}/${list[remainder - 1]}${-4 + quotient + 4}.mp3`
    return `${list[remainder - 1]}${-4 + quotient + 4}`
  }
  //调号改变
  function diaoHaoChange(e: any) {
    let list = ["C大调", "#C大调", "D大调", "#D大调", "E大调", "F大调", "#F大调", "G大调", "#G大调", "A大调", "#A大调", "B大调",
      "c小调", "#c小调", "d小调", "e小调", "#e小调", "f小调", "#f小调", "g小调", "a小调", "#a小调", "b小调", "#b小调",]
    diaoHao = e.nativeEvent.target.value
    draw(0, 0)
    document.getElementById('text')!.innerHTML = list[diaoHao - 1]
  }
  //音符模式改变
  function changeMode() {
    let dom = document.getElementById('mode')
    isNumber = !isNumber
    dom!.innerHTML = isNumber ? '数字' : '字母'
    draw(0, 0)
  }
  //设置bpm
  function bpmChange(e: any) {
    bpm = e.nativeEvent.target.value
    document.getElementById('bpm')!.innerHTML = `bpm:${bpm}`
  }
  //切换乐器
  function changeIns(i:number){
    // instrument = i
    // document.getElementById('ins-name')!.innerText= ins_cn[i]
    // document.getElementById('pop-instrument')!.style.visibility = 'hidden'
    // draw(0,0)
  }

  return (
    <div className="app">
      <div className="menu">
        <div id="instrument" className="mode">
          <div id="ins-name">{}</div>
          <div className="pop-instrument" id="pop-instrument">
            {
              instruments.map((v,i)=>{
                return (
                  <div className="instrument-item" key={i} onClick={()=>(changeIns(i))}>{}</div>
                )
              })
            }
          </div>
        </div>   
        <div id="play" className="mode" onClick={play}>播放</div>
        <div id="mode" className="mode" onClick={changeMode}>数字</div>
        <div className="dioHao">
          <div id="text" className="text">C大调</div>
          <input className="input_range" min="1" max="24" onChange={diaoHaoChange} type="range" />
        </div>
        <div className="dioHao">
          <div id="bpm" className="text">bpm：120</div>
          <input className="input_range" min="60" max="200" onChange={bpmChange} type="range" />
        </div>
      </div>
      <canvas id="canvas" onMouseDown={mousedown} onMouseMove={mousemove} onMouseUp={mouseup} onWheel={mousewheel}></canvas>
      
    </div>
  )
}
