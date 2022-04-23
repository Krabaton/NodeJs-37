// Rozetka
url_query = '20850=ot-25-mp-do-47-mp;23777=6-6-5;38435=8-gb;41404=16gb'

// Google
url_search = 'q=Cat+and+dog&ie=utf-8&oe=utf-8&aq=t'

const pattern = /&|;/g

console.log(url_query.split(pattern))
console.log(url_search.split(pattern))
