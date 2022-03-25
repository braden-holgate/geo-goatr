index = {
  na: 'North America',
  sa: 'Africa',
  eu: 'Europe',
  sas: 'Asia',
  oce: 'Oceania',
}
function guess(form, goat, res) {
  console.log(res.text)
  // const success = document.getElementsByClassName('success')
  // const failure = document.getElementsByClassName('failure')
  if (index[form.goats] == goat.location) {
    // console.log(success)
  }
  return
}

module.exports = guess
