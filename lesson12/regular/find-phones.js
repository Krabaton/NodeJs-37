//  шаблон следующий: +380(67)777-7-777 или +380(67)777-77-77

const phones = [
  '+380(66)964-0-547',
  '+06(37)306465',
  '+380(96)193-51-71',
  '+63264-3-973',
  '+50832-52-00',
  '+000000000',
  '+487(30)283-9-18',
  '(98)622-35-75',
  '+375(29)794-79-63',
]

const pattern = /\+380\(\d{2}\)\d{3}-\d-\d{3}|\+380\(\d{2}\)\d{3}-\d{2}-\d{2}/g

result = phones.filter((phone) => pattern.test(phone))
// result = phones.map((phone) => phone.match(pattern))
console.log(result)
