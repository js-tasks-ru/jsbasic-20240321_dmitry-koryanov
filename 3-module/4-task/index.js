function showSalary(users, age) {
  let userArray = users.filter(user => user.age <= age).map(user => user.name + ', ' + user.balance + '\n');
  let resultString = userArray.reduce((result, current) => result + current, '');
  resultString = resultString.slice(0, resultString.length - 1);
  return resultString;
}
