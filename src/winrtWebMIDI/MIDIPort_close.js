import { _newMIDIConnectionEvent } from './MIDIConnectionEvent.js';

//   SPEC: http://webaudio.github.io/web-midi-api/#dom-midiport-close
//   close

function _MIDIPort_close(winrtMIDIPort) {
  function close() {
//   Makes the MIDI device corresponding to the MIDIPort explicitly unavailable
//   (subsequently changing the state from "open" to "closed"). Note that successful
//   invocation of this method will result in MIDI messages no longer being delivered
//   to MIDIMessageEvent handlers on a MIDIInput (although setting a new handler will
//   cause an implicit open()).
//
//   The underlying implementation may not need to do anything in response to this call.
//   However, some underlying implementations may not be able to support shared access
//   to MIDI devices, and the explicit close() call enables MIDI applications to ensure
//   other applications can gain access to devices.
//
//    When invoked, this method returns a Promise object representing a request for
//    access to the given MIDI port on the user's system. When the port has been closed
//    (and therefore, in exclusive access systems, the port is available to other
//    applications), the vended Promise is resolved. If the port is disconnected, the
//    Promise is rejected.
//
//    When the close() method is called, the user agent MUST run the algorithm to close a MIDIPort:
//    1. Let promise be a new Promise object and resolver be its associated resolver.
//    2. Return promise and run the following steps asynchronously.
    return new Promise((resolver, reject) => {
//    3. Let port be the given MIDIPort object.
    let port = winrtMIDIPort;
//    4. If the port is already closed (its .connection is "closed" - e.g. the port
//       has not yet been implicitly or explicitly opened, or close() has already 
//       been called on this MIDIPort), jump to the step labeled closed below.
    if (port.connection === 'closed') {
      return resolver(port)
    }

    if (
//    5. If the port is an input port, skip to the next step. 
      port.type !== 'input'
      &&
//       If the output port's .state is not "connected", clear all pending send data
//       and skip to the next step
      port.connection !== 'connected'
    ) {
//       Clear any pending send data in the system with timestamps in the future, then
//       finish sending any send messages with no timestamp or with a timestamp in the
//       past or present, prior to proceeding to the next step.
//    6. Close access to the port in the underlying system if open, and release any blocking
//      resources in the underlying system.
//  TODO: ^^ figure out that
    }
    
//    7. Change the connection attribute of the MIDIPort to "closed"
    port.connection = 'closed'
//      , and enqueue a new MIDIConnectionEvent to the statechange handler of the MIDIAccess
//      and to the statechange handler of the MIDIPort.
    _newMIDIConnectionEvent(port)
//    8. closed: Call resolver's accept(value) method with port as value argument.
    resolver(port)
//    9. Terminate these steps.
  })
  }

  Object.defineProperty(close, 'toString', {
    value: 'function close() { [native code] }'
  })
  
  return close
}

export { _MIDIPort_close }
