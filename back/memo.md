mutation ADDIncome {
  createIncome(createIncomeInput: {
    name: "aa"
    date: "2023-11-25"
    value: 10000
  })
  {
    id
    name
    date
    value
  }
}

  axios({
    url: "http://localhost:4000/graphql",
    method: "POST",
    data: {
      mutation: `
      mutation {
        createIncome(createIncomeInput: {
          name: "${name.value}"
          date: "${date.value}"
          value: ${value.value}
        })
        {
          id
          name
          date
          value
        }
      }`
    },
  })
  .then(function (res) {
    console.log(res);
    isOpen.value = false;
    emit("reload");
  })
  .catch(function (error) {
    console.log(error);
  });