import { Instrument } from "../types";

export { instruments ,classify,musics_}
let musics_ = [{"indexX":3,"indexY":43,"length":1},{"indexX":4,"indexY":44,"length":1},{"indexX":5,"indexY":43,"length":4},{"indexX":9,"indexY":39,"length":4},{"indexX":13,"indexY":44,"length":6},{"indexX":19,"indexY":46,"length":1},{"indexX":20,"indexY":48,"length":1},{"indexX":21,"indexY":46,"length":4},{"indexX":25,"indexY":43,"length":4},{"indexX":29,"indexY":39,"length":6},{"indexX":35,"indexY":38,"length":1},{"indexX":36,"indexY":39,"length":1},{"indexX":37,"indexY":38,"length":4},{"indexX":41,"indexY":34,"length":4},{"indexX":45,"indexY":39,"length":6},{"indexX":51,"indexY":41,"length":1},{"indexX":52,"indexY":43,"length":1},{"indexX":53,"indexY":41,"length":4},{"indexX":57,"indexY":46,"length":4},{"indexX":61,"indexY":39,"length":6}]
let classify = ['钢琴类','色彩打击类','风琴类','吉他类','贝司类','弦乐类','合奏/合唱类','铜管类','笛类','合成主音类','合成音色类','合成效果类','民间乐器类','打击乐器类','声音效果类']
let instruments: Instrument[] = [
  {
    id: 0,
    en: "Acoustic Grand Piano",
    cn: "原生大钢琴"
  }, {
    id: 1,
    en: "Bright Acoustic Piano",
    cn: "明亮钢琴"
  }, {
    id: 2,
    en: " Electric Grand Piano",
    cn: "电钢琴"
  }, {
    id: 3,
    en: "Honky-tonk Piano",
    cn: "酒吧钢琴"
  }, {
    id: 4,
    en: "Rhodes Piano",
    cn: "柔和电钢琴"
  }, {
    id: 5,
    en: "Chorused Piano",
    cn: "合唱电钢琴"
  }, {
    id: 6,
    en: "Harpsichord",
    cn: "拨弦古钢琴"
  }, {
    id: 7,
    en: "Clavichord",
    cn: "击弦古钢琴"
  }, {
    id: 8,
    en: "Celesta",
    cn: "钢片琴"
  }, {
    id: 9,
    en: "Glockenspiel",
    cn: "钟琴"
  }, {
    id: 10,
    en: "Music box",
    cn: "八音盒"
  }, {
    id: 11,
    en: "Vibraphone",
    cn: "颤音琴"
  }, {
    id: 12,
    en: "Marimba",
    cn: "马林巴琴"
  }, {
    id: 13,
    en: "Xylophone",
    cn: "木琴"
  }, {
    id: 14,
    en: "Tubular Bells",
    cn: "管钟"
  }, {
    id: 15,
    en: "Dulcimer",
    cn: "大扬琴"
  }, {
    id: 16,
    en: "Hammond Organ",
    cn: "击杆风琴"
  }, {
    id: 17,
    en: "Percussive Organ",
    cn: "打击式风琴"
  }, {
    id: 18,
    en: "Rock Organ",
    cn: "摇滚风琴"
  }, {
    id: 19,
    en: "Church Organ",
    cn: "教堂风琴"
  }, {
    id: 20,
    en: "Reed Organ",
    cn: "簧管风琴"
  }, {
    id: 21,
    en: "Accordian",
    cn: "手风琴"
  }, {
    id: 22,
    en: "Harmonica",
    cn: "口琴"
  }, {
    id: 23,
    en: "Tango Accordian",
    cn: "探戈手风琴"
  }, {
    id: 24,
    en: "Acoustic Guitar (nylon)",
    cn: "尼龙弦吉他"
  }, {
    id: 25,
    en: "Acoustic Guitar (steel)",
    cn: "钢弦吉他"
  }, {
    id: 26,
    en: "Electric Guitar (jazz)",
    cn: "爵士电吉他"
  }, {
    id: 27,
    en: "Electric Guitar (clean)",
    cn: "清音电吉他"
  }, {
    id: 28,
    en: "Electric Guitar (muted)",
    cn: "闷音电吉他"
  }, {
    id: 29,
    en: "Overdriven Guitar",
    cn: "驱动电吉他"
  }, {
    id: 30,
    en: "Distortion Guitar",
    cn: "失真效电吉他"
  }, {
    id: 31,
    en: "Guitar Harmonics",
    cn: "吉他和音"
  }, {
    id: 32,
    en: "Acoustic Bass",
    cn: "大贝司（声学贝司）"
  }, {
    id: 33,
    en: "Electric Bass(finger)",
    cn: "电贝司（指弹）"
  }, {
    id: 34,
    en: "Electric Bass (pick)",
    cn: "电贝司（拨片）"
  }, {
    id: 35,
    en: "Fretless Bass ",
    cn: "无品贝司"
  }, {
    id: 36,
    en: "Slap Bass 1",
    cn: "掌击贝司 1"
  }, {
    id: 37,
    en: "Synth Bass 2",
    cn: "掌击贝司 2"
  }, {
    id: 38,
    en: "Synth Bass 1",
    cn: "电子合成贝司 1"
  }, {
    id: 39,
    en: "Synth Bass 2",
    cn: "电子合成贝司 2"
  }, {
    id: 40,
    en: "Violin",
    cn: "小提琴"
  }, {
    id: 41,
    en: "Viola",
    cn: "中提琴"
  }, {
    id: 42,
    en: "Cello",
    cn: "大提琴"
  }, {
    id: 43,
    en: "Contrabass ",
    cn: "低音大提琴"
  }, {
    id: 44,
    en: "Tremolo Strings",
    cn: "弦乐群颤音"
  }, {
    id: 45,
    en: "Pizzicato Strings",
    cn: "弦乐群拨弦"
  }, {
    id: 46,
    en: "Orchestral Harp",
    cn: "竖琴"
  }, {
    id: 47,
    en: "Timpani",
    cn: "定音鼓"
  }, {
    id: 48,
    en: "String Ensemble 1",
    cn: "弦乐合奏1"
  }, {
    id: 49,
    en: "String Ensemble 2",
    cn: "弦乐合奏2"
  }, {
    id: 50,
    en: "Synth Strings 1 ",
    cn: "合成弦乐合奏1"
  }, {
    id: 51,
    en: "Synth Strings 2",
    cn: "合成弦乐合奏2"
  }, {
    id: 52,
    en: "Choir Aahs",
    cn: "人声合唱“啊”"
  }, {
    id: 53,
    en: "Voice Oohs",
    cn: "人声“嘟”"
  }, {
    id: 54,
    en: "Synth Voice",
    cn: "合成人声"
  }, {
    id: 55,
    en: "Orchestra Hit",
    cn: "管弦乐敲击齐奏"
  }, {
    id: 56,
    en: "Trumpet",
    cn: "小号"
  }, {
    id: 57,
    en: "Trombone",
    cn: "长号"
  }, {
    id: 58,
    en: "Tuba",
    cn: "大号"
  }, {
    id: 59,
    en: "Muted Trumpet",
    cn: "加弱音器小号"
  }, {
    id: 60,
    en: "French Horn",
    cn: "法国号"
  }, {
    id: 61,
    en: "Brass Section",
    cn: "铜管组"
  }, {
    id: 62,
    en: "Synth Brass 1",
    cn: "合成铜管音色1"
  }, {
    id: 63,
    en: "Synth Brass 2",
    cn: "合成铜管音色2"
  }, {
    id: 64,
    en: "Soprano Sax",
    cn: "高音萨克斯"
  }, {
    id: 65,
    en: "Alto Sax",
    cn: "次中音萨克斯"
  }, {
    id: 66,
    en: "Tenor Sax",
    cn: "中音萨克斯"
  }, {
    id: 67,
    en: "Baritone Sax",
    cn: "低音萨克斯"
  }, {
    id: 68,
    en: "Oboe",
    cn: "双簧管"
  }, {
    id: 69,
    en: "English Horn",
    cn: "英国管"
  }, {
    id: 70,
    en: "Bassoon",
    cn: "巴松"
  }, {
    id: 71,
    en: "Clarinet",
    cn: "单簧管"
  }, {
    id: 72,
    en: "Piccolo",
    cn: "短笛"
  }, {
    id: 73,
    en: "Flute",
    cn: "长笛"
  }, {
    id: 74,
    en: "Recorder",
    cn: "竖笛"
  }, {
    id: 75,
    en: "Pan Flute",
    cn: "排箫"
  }, {
    id: 76,
    en: "Bottle Blow",
    cn: "芦笛"
  }, {
    id: 77,
    en: "Shakuhachi",
    cn: "日本尺八"
  }, {
    id: 78,
    en: "Whistle",
    cn: "口哨声"
  }, {
    id: 79,
    en: "Ocarina",
    cn: "奥卡雷那"
  }, {
    id: 80,
    en: "Lead 1 (square)",
    cn: "合成主音1（方波）"
  }, {
    id: 81,
    en: "Lead 2 (sawtooth)",
    cn: "合成主音2（锯齿波）"
  }, {
    id: 82,
    en: "Lead 3 (caliope lead)",
    cn: "合成主音3"
  }, {
    id: 83,
    en: "Lead 4 (chiff lead)",
    cn: "合成主音4"
  }, {
    id: 84,
    en: "Lead 5 (charang)",
    cn: "合成主音5"
  }, {
    id: 85,
    en: "Lead 6 (voice)",
    cn: "合成主音6 （人声）"
  }, {
    id: 86,
    en: "Lead 7 (fifths)",
    cn: "合成主音7（平行五度）"
  }, {
    id: 87,
    en: "Lead 8 (bass+lead)",
    cn: "合成主音8（贝司加主音）"
  }, {
    id: 88,
    en: "Pad 1 (new age)",
    cn: "合成音色1（新世纪）"
  }, {
    id: 89,
    en: "Pad 2 (warm)",
    cn: "合成音色2 （温暖）"
  }, {
    id: 90,
    en: "Pad 3 (polysynth)",
    cn: "合成音色3"
  }, {
    id: 91,
    en: "Pad 4 (choir)",
    cn: "合成音色4 （合唱）"
  }, {
    id: 92,
    en: "Pad 5 (bowed)",
    cn: "合成音色5"
  }, {
    id: 93,
    en: "Pad 6 (metallic)",
    cn: "合成音色6（金属声）"
  }, {
    id: 94,
    en: "Pad 7 (halo)",
    cn: "合成音色7（光环）"
  }, {
    id: 95,
    en: "Pad 8 (sweep)",
    cn: "合成音色8"
  }, {
    id: 96,
    en: "FX 1 (rain)",
    cn: "合成效果1 雨声"
  }, {
    id: 97,
    en: "FX 2 (soundtrack)",
    cn: "合成效果2 音轨"
  }, {
    id: 98,
    en: "FX 3 (crystal)",
    cn: "合成效果3 水晶"
  }, {
    id: 99,
    en: "FX 4 (atmosphere)",
    cn: "合成效果4 大气"
  }, {
    id: 100,
    en: "FX 5 (brightness)",
    cn: "合成效果5 明亮"
  }, {
    id: 101,
    en: "X 6 (goblins)",
    cn: "合成效果6 鬼怪"
  },{
    id: 102,
    en: "FX 7 (echoes)",
    cn: "合成效果7 回声"
  },{
    id: 103,
    en: "FX 8 (sci-fi)",
    cn: "合成效果8 科幻"
  },{
    id: 104,
    en: "Sitar",
    cn: "西塔尔（印度）"
  },{
    id: 105,
    en: "Banjo",
    cn: "班卓琴（美洲）"
  },{
    id: 106,
    en: "Shamisen",
    cn: "三昧线（日本）"
  },{
    id: 107,
    en: "Koto",
    cn: "十三弦筝（日本）"
  },{
    id: 108,
    en: "Kalimba",
    cn: "卡林巴"
  },{
    id: 109,
    en: "Bagpipe",
    cn: "风笛"
  },{
    id: 110,
    en: "Fiddle",
    cn: "民族提琴"
  },{
    id: 111,
    en: "Shanai",
    cn: "山奈"
  },{
    id: 112,
    en: "Tinkle Bell",
    cn: "叮当铃"
  },{
    id: 113,
    en: "Agogo Agogo",
    cn: "阿勾勾"
  },{
    id: 114,
    en: "Steel Drums",
    cn: "钢鼓"
  },{
    id: 115,
    en: "Woodblock",
    cn: "木鱼"
  },{
    id: 116,
    en: "Taiko Drum",
    cn: "太鼓"
  },{
    id: 117,
    en: "Melodic Tom",
    cn: "通通鼓"
  },{
    id: 118,
    en: "Synth Drum",
    cn: "合成鼓"
  },{
    id: 119,
    en: "Reverse Cymbal",
    cn: "铜钹"
  },{
    id: 120,
    en: "Guitar Fret Noise",
    cn: "吉他换把杂音"
  },{
    id: 121,
    en: "Breath Noise",
    cn: "呼吸声"
  },{
    id: 122,
    en: "Seashore",
    cn: "海浪声"
  },{
    id: 123,
    en: "Bird Tweet",
    cn: "鸟鸣"
  },{
    id: 124,
    en: "Telephone Ring",
    cn: "电话铃"
  },{
    id: 125,
    en: "Helicopter",
    cn: "直升机"
  },{
    id: 126,
    en: "Applause",
    cn: "鼓掌声"
  },{
    id: 127,
    en: "Gunshot",
    cn: "枪声"
  }
]

