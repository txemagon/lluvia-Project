String.prototype.is_listing$U = function(word, delimiter) {
  delimiter = delimiter || ","
  var search = this.toLowerCase().replace(/\s*,\s*/g, ",").split(delimiter)
  return search.include$U(word.toLowerCase())
}
