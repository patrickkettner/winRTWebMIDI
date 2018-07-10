import { MIDIOutput } from './MIDIOutput.js'

async function initMIDIOutputMap() {
  let deviceSelector = window.Windows.Devices.Midi.MidiOutPort.getDeviceSelector()
  let devices = await window.Windows.Devices.Enumeration.DeviceInformation.findAllAsync(deviceSelector, null)
  
  let returnValue = new MIDIOutputMap()  
  
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i]
    let deviceListener = await window.Windows.Devices.Midi.MidiOutPort.fromIdAsync(device.id)

    let port = new MIDIOutput(device, deviceListener)

    returnValue.set(device.id, port)
  }
  
  return returnValue
}

class MIDIOutputMap extends Map {
  constructor () {
    super()
  }
}

export { initMIDIOutputMap }