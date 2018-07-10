import { EventTarget, defineEventAttribute } from 'event-target-shim';
import { _MIDIPort_open } from './MIDIPort_open.js';
import { _MIDIPort_close } from './MIDIPort_close.js';

// the GUID given to WinRT MIDI Input Ports, extracted from Windows.Devices.Midi.MidiInPort.getDeviceSelector()
let winRTMIDIInPortGUID = '504BE32C-CCF6-4D2C-B73F-6F8B3747E22B'

class MIDIPort extends EventTarget {
  constructor(winrtMIDIPort) {
    super()
  // SPEC: http://webaudio.github.io/web-midi-api/#MIDIPort
  // This interface represents a MIDI input or output port.
    Object.defineProperties(this, {
  // id
  //   A unique ID of the port. This can be used by developers to remember ports the
  //   user has chosen for their application. The User Agent MUST ensure that the id
  //   is unique to only that port. The User Agent SHOULD ensure that the id is
  //   maintained across instances of the application - e.g., when the system is
  //   rebooted - and when a device is removed from the system. Applications may want
  //   to cache these ids locally to re-create a MIDI setup. Some systems may not
  //   support completely unique persistent identifiers; in such cases, it will be
  //   more challenging to maintain identifiers when another interface is added or
  //   removed from the system. (This might throw off the index of the requested
  //   port.) It is expected that the system will do the best it can to match a port
  //   across instances of the MIDI API: for example, an implementation may opaquely
  //   use some form of hash of the port interface manufacturer, name and index as the
  //   id, so that a reference to that port id is likely to match the port when
  //   plugged in. Applications may use the comparison of id of MIDIPorts to test for
  //   equality.    
    id: {
      value: winrtMIDIPort.id,
      enumerable: true
    },
  // manufacturer
  //  The manufacturer of the port.
    manufacturer: {
      // TODO: there doesnt seem to be a way to get this from the WinRT API :(
      value: '',
      enumerable: true
    },
  // name
  //  The system name of the port.
    name: {
      // TODO: the version provided by the WinRT API is bit weird, try to figure out if
      //       there is a way to extract it from the driver like chrome does
      value: winrtMIDIPort.name,
      enumerable: true    
    },
  // type
  //  A descriptor property to distinguish whether the port is an input or an output port.
    type: {
  //  For MIDIOutput, this MUST be "output". For MIDIInput, this MUST be "input".      
      value: winrtMIDIPort.id.toUpperCase().includes(winRTMIDIInPortGUID) ? 'input' : 'output',
      enumerable: true    
    },
  // version
  //  The version of the port.
    version: {
  // TODO: this appears to always be an empty string in chrome. Ask Chris?
      value: '',
      enumerable: true
    },
  // state
  //  The state of the device.
    state: {
  // TODO: faking it as connected by default for now. Is there a way to check if a device is
  //       still connected without requerying the device?
      value: 'connected',
      enumerable: true
    },
  // connection
  //  The state of the connection to the device.
    connection: {
      value: 'disconnected',
      enumerable: true,
      writable: true
    },
    open: {
      enumerable: true,
      value: _MIDIPort_open(this)
      },
    close: {
      enumerable: true,
      value: _MIDIPort_close(this)
      }    
    })
  }
  
}

  // onstatechange
  //   The handler called when an existing port changes its state or connection attributes.
defineEventAttribute(MIDIPort.prototype, "statechange")

export { MIDIPort }