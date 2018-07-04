import { _newMIDIConnectionEvent } from './MIDIConnectionEvent.js';

// SPEC: http://webaudio.github.io/web-midi-api/#dom-midiport-open
// open
//  Makes the MIDI device corresponding to the MIDIPort explicitly available. Note that
// this call is NOT required in order to use the MIDIPort - calling send() on a MIDIOutput
// or attaching a MIDIMessageEvent handler on a MIDIInput will cause an implicit open().
// The underlying implementation may not need to do anything in response to this call.
// However, some underlying implementations may not be able to support shared access to
// MIDI devices, so using explicit open() and close() calls will enable MIDI applications
// to predictably control this exclusive access to devices.
//
//  When invoked, this method returns a Promise object representing a request for access
// to the given MIDI port on the user's system.
//
// If the port device has a state of "connected", when access to the port has been obtained
// (and the port is ready for input or output), the vended Promise is resolved.
//
// If access to a connected port is not available (for example, the port is already in use
// in an exclusive-access-only platform), the Promise is rejected (if any) is invoked.
//
// If open() is called on a port that is "disconnected", the port's .connection will transition
// to "pending", until the port becomes "connected" or all references to it are dropped.

function _MIDIPort_open(winrtMIDIPort) {
  function open() {
// When this method is called, the user agent MUST run the algorithm to open a MIDIPort:
//   1. Let promise be a new Promise object and resolver be its associated resolver.
//   2. Return promise and run the following steps asynchronously.
  return new Promise((resolve, reject) => {
//   3. Let port be the given MIDIPort object.
    let port = winrtMIDIPort;
//   4. If the device's connection is already "open" (e.g. open() has already been
//      called on this MIDIPort, or the port has been implicitly opened), jump to
//      the step labeled success below.
    if (port.connection === 'open') {
      return _MIDIPort_open_success(resolve, port)
    }
//   5. If the device's connection is "pending" (i.e. the connection had been opened and
//      the device was subsequently disconnected), jump to the step labeled success below.
    if (port.connection === 'pending') {
      return _MIDIPort_open_success(resolve, port)
    }
//   6. If the device's state is "disconnected", change the connection attribute of the
//      MIDIPort to "pending", and enqueue a new MIDIConnectionEvent to the statechange
//      handler of the MIDIAccess and to the statechange handler of the MIDIPort and jump
//      to the step labeled success below.
    if (port.connection !== 'disconnected') {
      port.connection = 'pending';
      _newMIDIConnectionEvent(port)
    }
//    7. Attempt to obtain access to the given MIDI device in the system. If the
//       device is unavailable (e.g. is already in use by another process and cannot be
//       opened, or is disconnected), jump to the step labeled failure below. If the
//       device is available and access is obtained, continue the following steps.
    if (false) {
// TODO: I think we just need to ensure it is still connected here, right? I dont
// see any way to validate access to it...

//     failure: Let error be a new DOMException. This exception's .name should be 
//     "InvalidAccessError" if the port is unavailable.
      let error = new DOMException('InvalidAccessError')
      return reject(error)
    }
//    8. Change the connection attribute of the MIDIPort to "open"
    port.connection = 'open'
//    and enqueue a new MIDIConnectionEvent to the statechange handler of the
//    MIDIAccess and to the statechange handler of the MIDIPort.
    _newMIDIConnectionEvent(port)
//    If this port is an output port and has any pending data that is waiting to be
//    sent, asynchronously begin sending that data.
//  TODO ^^
    _MIDIPort_open_success(resolve, port)
//   Terminate these steps.
  })


  function _MIDIPort_open_success(resolve, val) {
//    success: Call resolver's accept(value) method with port as value argument.
    resolve(val)
  }
  }
  
  Object.defineProperty(open, 'toString', {
    value: 'function open() { [native code] }',
    enumerable: true
  })
  
  return open
}

export { _MIDIPort_open }
