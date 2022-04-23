string =
  'Исключить из этой [строки группы] символов, [расположенные между] скобками [, ].'

// Жадный поиск
let pattern = /\[.*\]/g
let result = string.match(pattern)
console.log(result)

// Нежадный поиск
pattern = /\[.*?\]/g
result = string.match(pattern)
console.log(result)

result = string.replace(pattern, '')
console.log(result)
