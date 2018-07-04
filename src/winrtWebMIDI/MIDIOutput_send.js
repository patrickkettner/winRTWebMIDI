// winRTMessageType is an object of all midi message types with the keys being the name of the type of message
// and the value being the int of that code (e.g. noteOn: 144). We want to quickly lookup
if (window.Windows) {
  var winMIDI = window.Windows.Devices.Midi
  var winRTMessageType = winMIDI.MidiMessageType

  var winRTInvertedMessageTypes = {}
  Object.keys(winRTMessageType).forEach( t => winRTInvertedMessageTypes[winRTMessageType[t]] = t)
}

function MIDIOutput_send(winrtMIDIOutPort, winrtDeviceListener, port) {
  
  function send (sequence) {
    sequence  = window.Uint8Array.from(sequence)
    let messageSequence = sequence.subarray(1)
    let thisMessageType = sequence[0];
    let message;
    
    //    send
    //      Enqueues the message to be sent to the corresponding MIDI port. The underlying
    //      implementation will (if necessary) coerce each member of the sequence to an
    //      unsigned 8-bit integer. The use of sequence rather than a Uint8Array enables
    //      developers to use the convenience of output.send( [ 0x90, 0x45, 0x7f ] );
    //      rather than having to create a Uint8Array,
    //      e.g. output.send( new Uint8Array( [ 0x90, 0x45, 0x7f ] ) ); - while still
    //      enabling use of Uint8Arrays for efficiency in large MIDI data scenarios
    //      (e.g. reading Standard MIDI Files and sending sysex messages).
    //
    //      The data contains one or more valid, complete MIDI messages. Running status is
    //      not allowed in the data, as underlying systems may not support it.
    //
    //      If data is not a valid sequence or does not contain a valid MIDI message, throw a TypeError exception.
    
    
    
    if (thisMessageType in winRTInvertedMessageTypes) {
      // thisMessageType is the first number of the WebMIDI message. It's value can be used to look up
      // the string representation of the type of message (e.g. if thisMessageType == 144, then it will
      // map to noteOn. We insert this string name into the name of the message type to create the winrt message
      // (e.g. winMIDI.MidiNoteOnMessage). since thisMessageType's lookup will be camelCase, we need to uppercase
      // the first letter to make it CamelCase to fit into the naming convetnion for the winrt message api name.
      let messageType = winRTInvertedMessageTypes[thisMessageType].replace(/^\w/, c => c.toUpperCase());
      
      // 0 here represents the channel. We are naively assuming it is always channel 0 for now. 
      message = winMIDI[`Midi${messageType}Message`](0, ...messageSequence)
    } else {
      throw new Error(`TypeError - ${thisMessageType} is not a valid MIDI message type`)
    }

    winrtDeviceListener.sendMessage(message)

    //      If the port is "disconnected", throw an InvalidStateError exception.
    if (port.state === 'disconnected') {
      throw new Error('InvalidStateError')
    }
    
    //      If the port is "connected" but the connection is "closed", asynchronously try to open the port.
  }

  Object.defineProperty(send, 'toString', {
    value: 'function send() { [native code] }'
  })
  
  return send
}


export {MIDIOutput_send}