'use strict'
export default function WebAudioFontReverberator(audioContext) {
	var me = this;
	this.audioContext = audioContext;

	this.output = audioContext.createGain();
	this.input = this.audioContext.createBiquadFilter();
	this.compressor = audioContext.createDynamicsCompressor();
	this.compressorWet = audioContext.createGain();
	this.compressorDry = audioContext.createGain();
	this.convolver = null;
	this.convolverInput = audioContext.createGain();
	this.dry = audioContext.createGain();
	this.wet = audioContext.createGain();

	this.input.type = "lowpass";
	this.input.frequency.setTargetAtTime(18000,0,0.0001);
	this.compressorWet.gain.setTargetAtTime(1.0,0,0.0001);
	this.compressorDry.gain.setTargetAtTime(0.0,0,0.0001);
	var threshold = -35;
	var knee = 35;
	var ratio = 8;
	var attack = 0.02;
	var release = 0.1;
	this.compressor.threshold.setValueAtTime(threshold,0.0001);//-100,0
	this.compressor.knee.setValueAtTime(knee,0.0001);//0,40
	this.compressor.ratio.setValueAtTime(ratio,0.0001);//2,20
	this.compressor.attack.setValueAtTime(attack,0.0001);//0,1
	this.compressor.release.setValueAtTime(release,0.0001);//0,1
	this.dry.gain.setTargetAtTime(0.6,0,0.0001);
	this.wet.gain.setTargetAtTime(0.4,0,0.0001);

	this.input.connect(this.compressorDry);
	this.compressorDry.connect(this.convolverInput);

	this.input.connect(this.compressorWet);
	this.compressorWet.connect(this.compressor);
	this.compressor.connect(this.convolverInput);

	this.convolverInput.connect(this.dry);
	this.dry.connect(this.output);

	this.convolverInput.connect(this.wet);
	
	// var irr= ''
	// var datalen = irr.length / 2;
	// this.irrArrayBuffer = new ArrayBuffer(datalen);
	// var view = new Uint8Array(this.irrArrayBuffer);
	// var decoded = atob(irr);
	// var b;
	// for (var i = 0; i < decoded.length; i++) {
	// 	b = decoded.charCodeAt(i);
	// 	view[i] = b;
	// }
	// this.audioContext.decodeAudioData(this.irrArrayBuffer, function (audioBuffer) {
	// 	me.convolver = audioContext.createConvolver();
	// 	me.convolver.buffer = audioBuffer;
	// 	me.wet.connect(me.convolver);
	// 	me.convolver.connect(me.output);
	// 	console.log('convolver audioBuffer',audioBuffer);
	// });
	return this;
}
// if (typeof module === 'object' && module.exports) {
// 	module.exports = WebAudioFontReverberator;
// }
// if (typeof window !== 'undefined') {
// 	window.WebAudioFontReverberator = WebAudioFontReverberator;
// }
