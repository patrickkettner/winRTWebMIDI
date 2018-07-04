import { EventTarget, defineEventAttribute } from 'event-target-shim';
import { MIDIOutput_send } from './MIDIOutput_send.js'
import { MIDIPort } from './MIDIPort.js'

//   SPEC: http://webaudio.github.io/web-midi-api/#dom-midioutput

class MIDIOutput extends MIDIPort {
  constructor(winrtMIDIOutPort, deviceListener) {
    super(winrtMIDIOutPort)
//    interface MIDIOutput : MIDIPort {
  
  Object.defineProperties(this, {
//      void send(sequence<octet> data,optional  DOMHighResTimeStamp timestamp = 0);
    send: {
      enumerable: true,
      value: MIDIOutput_send(winrtMIDIOutPort, deviceListener, this)
    },
//      void clear();
    clear: {
      enumerable: true,
      value: () => {
//    clear
//      Clears any pending send data that has not yet been sent from the MIDIOutput's queue. The
//      implementation will need to ensure the MIDI stream is left in a good state, so if the output
//      port is in the middle of a sysex message, a sysex termination byte (0xf7) should be sent.
// TODO: ^
      }
    }
      
    
  })
}
}

export { MIDIOutput }