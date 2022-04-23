text_url =
  'The main search site in the world is https://www.google.com The main social network for people in the world is https://www.facebook.com But programmers have their own social network http://github.com There they share their code. some url to check https://www..facebook.com www.facebook.com https://www.app.facebook.com My site: https://krabaton.info'

const pattern = /https?:\/\/\w{3}\.?(?:\w+\.)+\w{2,5}/gm
console.log(text_url.match(pattern))
