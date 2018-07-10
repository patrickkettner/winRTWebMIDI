class MIDIMessageEvent extends Event {
  constructor(type, eventInitDict, winRTMIDIMessage={}) {
    super('MIDIMessageEvent', eventInitDict)

    // setting Symbol.toStringTag makes the event appear as [object MIDIConnectionEvent]
    // rather than [object Event] inside of the developer tools
    this[Symbol.toStringTag] = 'MIDIMessageEvent'

    Object.defineProperties(this, {
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
  }
}
  
export { MIDIMessageEvent }