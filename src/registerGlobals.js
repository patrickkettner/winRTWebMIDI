import { MIDIMessageEvent } from './winrtWebMIDI/MIDIMessageEvent.js'
import { MIDIConnectionEvent } from './winrtWebMIDI/MIDIConnectionEvent.js'

function registerGlobals(global = self) {

    function wireUp(obj) {
        global[obj.name] = function () { throw 'Function expected' }

        if (obj.proto) {
            Object.setPrototypeOf(global[obj.name], obj.proto)
        }

        Object.defineProperty(global[obj.name], 'toString', {
            get: () => `function ${obj.name}() { [native code] }`
        })
    }

    let funcs = [
        { name: 'MIDIAccess', proto: EventTarget },
        { name: 'MIDIPort', proto: EventTarget },
        { name: 'MIDIInput' },
        { name: 'MIDIOutput' },
        { name: 'MIDIInputMap', proto: () => { } },
        { name: 'MIDIOutputMap', proto: () => { } },
    ]

    funcs.forEach(wireUp)


    Object.setPrototypeOf(global.MIDIInput, global.MIDIPort)
    Object.setPrototypeOf(global.MIDIOutput, global.MIDIPort)

    global.MIDIMessageEvent = MIDIMessageEvent
    global.MIDIConnectionEvent = MIDIConnectionEvent
}

export { registerGlobals }