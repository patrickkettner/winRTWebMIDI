import { MIDIInput } from './MIDIInput.js'
import { MIDIMessageEvent } from './MIDIMessageEvent.js'

function isSysExMessage(msg) {
  return msg.type === window.Windows.Devices.Midi.MidiMessageType.systemExclusive
}

async function initMIDIInputMap(MIDIOptions) {
  let MIDI = window.Windows.Devices.Midi
  let deviceSelector = MIDI.MidiInPort.getDeviceSelector()
  let devices = await window.Windows.Devices.Enumeration.DeviceInformation.findAllAsync(deviceSelector, null)
  
  let returnValue = new MIDIInputMap()

  for (let i = 0; i < devices.length; i++) {
    let device = devices[i]
    let deviceListener = await MIDI.MidiInPort.fromIdAsync(device.id)

    // note: this is getting wired up here instead of in MIDIInput or MIDIMEssageEvent
    // because we need to run it in an async call for WebMIDI in order to call the 
    // async WinRT `fromIdAsync` as well (to establish the connect that enables us
    // to relay the message)
    
    //    SPEC: http://webaudio.github.io/web-midi-api/#dom-midiinput-onmidimessage
    //    This event handler, of type "midimessage", MUST be supported by all objects
    //    implementing MIDIInput interface.
    //
    //    If the handler is set and the state attribute is not "opened", underlying
    //    implementation tries to make the port available, and change the state attribute
    //    to "opened". If succeeded, MIDIConnectionEvent is delivered to the corresponding
    //    MIDIPort and MIDIAccess.
    //
    // NOTE: WinRT handles all of that opening for us (as far as I can tell) so we just ignore
    //       these steps :)
    //
    //    Whenever the MIDI port corresponding to the MIDIInput finishes receiving one or
    //    more MIDI messages, the user agent MUST run the following steps:

    let port = new MIDIInput(device)

    deviceListener.addEventListener('messagereceived', e => {
    //
    //    1. Let port be the MIDIInput.
    // NOTE: assigned just above the listener, to avoid recreating it over and over again

    //    2. If the MIDIAccess did not enable system exclusive access, and the message is a
    //       system exclusive message, abort this process. 
    
    if (MIDIOptions.sysex && isSysExMessage(e.message)) {
      return
    } else {
    //    3. Let event be a newly constructed MIDIMessageEvent, with the timestamp attribute
    //       set to the time the message was received by the system, and with the data
    //       attribute set to a Uint8Array of MIDI data bytes representing a single MIDI message.
  
    //    4. Fire an event named "midimessage" at the port, using the event as the event object.

    //    5. It is specifically noted that MIDI System Real-Time Messages may actually occur in
    //       the middle of other messages in the input stream; in this case, the System Real-Time
    //       messages will be dispatched as they occur, while the normal messages will be buffered
    //       until they are complete (and then dispatched).
      
        let midiMessage = MIDIMessageEvent('midimessage', {}, e.message)
        port.dispatchEvent(midiMessage)
      }
    })

    returnValue.set(device.id, port)
  }

  return returnValue
}

class MIDIInputMap extends Map {
  constructor () {
    super()
  }
}

export { initMIDIInputMap }