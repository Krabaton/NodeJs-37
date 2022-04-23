const text =
  'Ima.Fool@iana.org Ima.Fool@iana.o Fool1@iana.org first_last@iana.org first.middle.last@iana.or a@test.com abc111@test.com.net'

let pattern = /[A-Za-z]{1}[\w\.]+@(\w+\.)+\w{2,3}/g
let result = text.match(pattern)
// console.log(result)

// Prefix
pattern = /[\w.]+@{1}/g
result = text.match(pattern)
// console.log(result)

//Suffix
pattern = /@(\w+\.)+\w{2,3}/g
result = text.match(pattern).map((email) => email.replace('@', ''))
console.log(result)
