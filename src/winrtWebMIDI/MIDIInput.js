import { EventTarget, defineEventAttribute } from 'event-target-shim';
import { MIDIPort } from './MIDIPort.js'
//   SPEC: http://webaudio.github.io/web-midi-api/#dom-midiinput

//    interface MIDIInput : MIDIPort {
class MIDIInput extends MIDIPort {
  constructor(winrtMIDIInPort) {
    super(winrtMIDIInPort)
  }
}

//    This event handler, of type "midimessage", MUST be supported by all objects
//    implementing MIDIInput interface.
//
//    If the handler is set and the state attribute is not "opened", underlying
//    implementation tries to make the port available, and change the state attribute
//    to "opened". If succeeded, MIDIConnectionEvent is delivered to the corresponding
//    MIDIPort and MIDIAccess.
//

defineEventAttribute(MIDIInput.prototype, "midimessage")


export { MIDIInput }