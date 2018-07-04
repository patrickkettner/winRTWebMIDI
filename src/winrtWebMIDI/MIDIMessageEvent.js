function _newMIDIMessageEvent(winRTMIDIMessage) {    
//    SPEC: http://webaudio.github.io/web-midi-api/#MIDIMessageEvent
  
  let MIDIMessageEvent = new CustomEvent('midimessage')
  
  Object.defineProperties(MIDIMessageEvent, {
    data: {
      enumerable: true,
// TODO this is almost surely going to break on non key events - TEST!
      value: new Uint8Array([winRTMIDIMessage.type, winRTMIDIMessage.note, winRTMIDIMessage.velocity])
    },
    timeStamp: {
      enumerable: true,
      value: winRTMIDIMessage.timestamp
    }
  })
  
  return MIDIMessageEvent
}

export { _newMIDIMessageEvent }