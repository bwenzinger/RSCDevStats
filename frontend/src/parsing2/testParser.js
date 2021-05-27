/* eslint-disable indent */
/* eslint-disable no-undef */
var reader = new FileReader()
reader.onload = function (e) {
  fileData = e.target.result
  parse()
}
var fileSeek = 0
var data = {}
var fileData

var setPlayerStatsCallback

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initParse(fileData, setPlayerStats) {
  reader.readAsBinaryString(fileData)
  setPlayerStatsCallback = setPlayerStats
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function parse() {
  // Length of properties section
  var properties_length = readInteger()

  // CRC check
  var crc = readUnknown()

  var test1 = readInteger()
  var test2 = readInteger()
  var test3 = readInteger()

  data["version_number"] = test1 + "." + test2
  data["net_version"] = test3
  data["replay_class"] = readString()
  data["header"] = readProperties()

  console.log(data)
  setPlayerStatsCallback(data.header.PlayerStats)
}

function rawStringToBuffer(str) {
  var idx
  var len = str.length
  var arr = new Array(len)

  for (idx = 0; idx < len; idx++) {
    arr[idx] = str.charCodeAt(idx) & 0xff
  }

  // You may create an ArrayBuffer from a standard array (of values) as follows:
  return new Uint8Array(arr).buffer
}

function getBytes(length) {
  if (length === undefined) {
    length = 4
  }

  var string = fileData.slice(fileSeek, fileSeek + length)
  console.assert(string.length == length, "Slice length does not match.")

  fileSeek += length
  return string
}

function readInteger(length) {
  var string = getBytes(length)
  var buffer_array = rawStringToBuffer(string)

  switch (string.length) {
    case 1:
      return new DataView(buffer_array).getInt8(0, true)
    case 2:
      return new DataView(buffer_array).getInt16(0, true)
    case 4:
    case 8:
      return new DataView(buffer_array).getInt32(0, true)
  }
}

function readFloat(length) {
  var string = getBytes(length)
  var buffer_array = rawStringToBuffer(string)

  switch (string.length) {
    case 4:
      return new DataView(buffer_array).getFloat32(0, true)
    case 8:
      return new DataView(buffer_array).getFloat64(0, true)
  }
}

function readUnknown(length) {
  return getBytes(length)
}

function readString(length) {
  var string_length
  if (length === undefined) {
    string_length = readInteger()
  } else {
    string_length = length
  }

  var string = getBytes(string_length)

  return string.substr(0, string.length - 1)
}

function readProperties() {
  var results = {}

  // eslint-disable-next-line no-constant-condition
  while (1) {
    var property = readProperty()

    if (property) {
      results[property.name] = property.value
    } else {
      return results
    }
  }
}

function readProperty() {
  var property_name = readString()

  if (property_name === "None") {
    return
  }

  var type_name = readString()
  var value

  switch (type_name) {
    case "IntProperty":
      var value_length = readInteger(8)
      value = readInteger(value_length)
      break
    case "StrProperty":
      var unknown = readInteger(8)

      var str_length = readInteger()

      if (str_length < 0) {
        str_length = Math.abs(str_length) * 2
      }

      value = readString(str_length)
      break
    case "ByteProperty":
      var unknown2 = readInteger(8)
      value = {}
      value[readString()] = readString()
      break
    case "QWordProperty":
      // 64 bit int, 8 bytes.
      value_length = readInteger(8)
      value = readInteger(value_length)
      break
    case "BoolProperty":
      var unknown3 = readInteger(8)
      value = Boolean(readInteger(1))
      break
    case "FloatProperty":
      var float_length = readInteger(8)
      value = readFloat(float_length)
      break
    case "NameProperty":
      var unknown4 = readInteger(8)
      value = readString()
      break
    case "ArrayProperty":
      var currentFileSeek = fileSeek

      var length_in_file = readInteger(8)
      var array_length = readInteger()

      value = []

      for (var i = 0; i < array_length; i++) {
        value.push(readProperties())
      }

      console.assert(fileSeek == currentFileSeek + length_in_file + 8)
      break
    default:
      console.error("Unknown type:", type_name.slice(0, 20))
      return
  }

  return {
    name: property_name,
    value: value
  }
}
