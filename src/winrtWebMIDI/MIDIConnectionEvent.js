function _newMIDIConnectionEvent(winRTMIDIPort) {
//    SPEC: http://webaudio.github.io/web-midi-api/#dom-midiconnectionevent

//    An event object implementing this interface is passed to a MIDIAccess' onstatechange
//    handler when a new port becomes available (for example, when a MIDI device is first
//    plugged in to the computer), when a previously-available port becomes unavailable,
//    or becomes available again (for example, when a MIDI interface is disconnected, then
//    reconnected) and (if present) is also passed to the onstatechange handlers for any
//    MIDIPorts referencing the port.
//
//    When a MIDIPort is in the "pending" state and the device is reconnected to the host
//    system, prior to firing a statechange event the algorithm to open a MIDIPort is run
//    on it to attempt to reopen the port. If this transition fails (e.g. the Port is
//    reserved by something else in the underlying system, and therefore unavailable for
//    use), the connection state moves to "closed", else it transitions back to "open".
//    This is done prior to the statechange event for the device state change so that
//    the event will reflect the final connection state as well as the device state.
//
//    Some underlying systems may not provide notification events for device connection
//    status; such systems may have long time delays as they poll for new devices infrequently.
//    As such, it is suggested that heavy reliance on connection events not be used.

//    [Constructor(DOMString type,optional  MIDIConnectionEventInit eventInitDict)]
//    interface MIDIConnectionEvent : Event {

  let MIDIConnectionEvent = new CustomEvent('statechange')
//    readonly attribute MIDIPort port;
      Object.defineProperty(MIDIConnectionEvent, 'port', {value: winRTMIDIPort})

      winRTMIDIPort.dispatchEvent(MIDIConnectionEvent)
}

export { _newMIDIConnectionEvent }