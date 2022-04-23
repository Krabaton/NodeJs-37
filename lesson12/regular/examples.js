string = `Нильс Бор родился в семье профессора физиологии Копенгагенского университета Христиана Бора (1858—1911), 
         дважды становившегося кандидатом на Нобелевскую премию по физиологии и медицине[10], и Эллен Адлер 
         (1860—1930), дочери влиятельного и весьма состоятельного еврейского банкира и парламентария-либерала Давида 
         Баруха Адлера (дат. David Baruch Adler; 1826—1878) и Дженни Рафаэль (1830—1902) из британской еврейской 
         банкирской династии Raphael Raphael & sons[en][11]. Родители Бора поженились в 1881 году.`

// Найти все цифры
let pattern = /\d/gi
let result = string.match(pattern)
// console.log(result)

// Найти все числа
pattern = /\d+/gi
result = string.match(pattern)
// console.log(result)

// Найти все года
pattern = /\d{4}/gi
result = string.match(pattern)
// console.log(result)

// Найти все слова с заглавной буквы
pattern = /[А-Я]{1}[А-Яа-я]+/gm
result = string.match(pattern)
// console.log(result)

// Найти все слова
pattern = /[А-Яа-я]+/gim
result = string.match(pattern)
// console.log(result)

// Найти слово начала предложения
pattern = /^[А-Я]{1}[А-Яа-я]+/gm
result = string.match(pattern)
// console.log(result)

// Найт слово в конце предложения
pattern = /[А-Яа-я]+[\.\?\!]?$/g
result = string.match(pattern)
// console.log(result)

// Найти первые две буквы каждого слова
pattern = /\s[А-Яа-я]{2}|^[А-Яа-я]{2}/g
result = string.match(pattern)
// console.log(result)

// Найти периоды лет
pattern = /\d{4}—\d{4}/gm
result = string.match(pattern)
console.log(result)
