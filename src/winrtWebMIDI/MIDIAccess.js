import { EventTarget, defineEventAttribute } from 'event-target-shim';
import { initMIDIInputMap } from './MIDIInputMap.js'
import { initMIDIOutputMap } from './MIDIOutputMap.js'
import { MIDIPort } from './MIDIPort.js'
import { _newMIDIConnectionEvent } from './MIDIConnectionEvent.js'
import { isUnsecureContext } from '../isUnsecureContext.js'
import { DOMException } from 'w3c-domcore-errors'

function initMIDIAccess(MIDIOptions) {
  return new Promise((resolve, reject) => {
      Promise.all([initMIDIInputMap(MIDIOptions), initMIDIOutputMap(MIDIOptions)]).then(values => {
        let [MIDIInputMap, MIDIOutputMap] = values;

// SPEC: http://webaudio.github.io/web-midi-api/#MIDIAccess
//       This interface provides the methods to list MIDI input and output devices, and obtain access to an individual device.
        class MIDIAccess extends EventTarget {
          
          constructor(MIDIOptions = {}) {
            super()

            // chrome rejects if sysex is requested and we are in an insecure context, so we copy that behavior
            if (MIDIOptions.sysex && isUnsecureContext) {
              throw new DOMException('sysex was requested on a unsecure page, breaking policy.')
            }

            Object.defineProperties(this, {
//       inputs
//         The MIDI input ports available to the system.
              inputs: {
                enumerable: true,
                value: MIDIInputMap
              },
//       outputs
//         The MIDI output ports available to the system.
              outputs: {
                enumerable: true,
                value: MIDIOutputMap
              },
//       sysexEnabled
//         This attribute informs the user whether system exclusive support is enabled on this MIDIAccess.
              sysexEnabled: {
                enumerable: true,
                value: MIDIOptions.sysex || false
              },
              toString: {
                value: () => "function MIDIAccess() { [native code] }",
              enumerable: false
              }
            })
//       onstatechange
//         The handler called when a new port is connected or an existing port changes the state attribute.
//         This event handler, of type MIDIConnectionEvent, MUST be supported by all objects implementing the MIDIAccess interface.
        }
        }
        
        defineEventAttribute(MIDIAccess.prototype, "statechange")

         resolve(MIDIAccess)
      })
  })
}

export { initMIDIAccess }
