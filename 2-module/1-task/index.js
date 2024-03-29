function sumSalary(salaries) {
  let salarySum = 0;

  for (let key in salaries) {
    let salary = salaries[key];

    if (typeof salary === "number" && !isNaN(salary) && salary !== Infinity && salary !== -Infinity) {
      salarySum = salarySum + salary;
    }
  }

  return salarySum;
}
