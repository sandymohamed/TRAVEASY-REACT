// check that startDate is not past date 
export const isInTheFuture = (idate) => {
  var today = new Date().getTime()
  idate = new Date(idate).getTime()

  return (today - idate) < 0;
}

//check that endDate is after startDate 
export const isAfterStartDate = (startDate, endDate) => {
  startDate = new Date(startDate).getTime()
  endDate = new Date(endDate).getTime()

  return (startDate - endDate) < 0;
}

//check that endDate is after startDate 
export const checkPeriod = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (Number(diffDays));
}


export const handleValidate = (e, values, setValues, err, setErr, price) => {
  // if (e.target.name === "RoomCount") {
  //   setValues({
  //     ...values,
  //     RoomCount: Number(e.target.value)
  //   })
  //   setErr({
  //     ...err,
  //     RoomCountErr: (((e.target.value <= 0) ? "should receive at least one room" : null)
  //       || ((Number(e.target.value) !== (values.Single + values.Double)) ?
  //         'invalid room count make sure that you insert right values in single and double fields' : null)),
  //     globalErr: (e.target.value === '') ? "This Field is Required" : null
  //   })
  // }
  if (e.target.name === "HRoomCount") {
    setValues({
      ...values,
      RoomCount: Number(e.target.value)
    })
    setErr({
      ...err,
      RoomCountErr: (e.target.value <= 0) ? "should receive at least one room" : null,
      globalErr: (e.target.value === '') ? "This Field is Required" : null
    })
  }

  else if (e.target.name === "AdultCount") {
    setValues({
      ...values,
      AdultCount: Number(e.target.value),
    })
    setErr({
      ...err,
      AdultCountErr: (((e.target.value <= 0) ? "should be at least one Adualt" : null)
        || ((Number(e.target.value) > (values.Single + (values.Double * 2))) ?
          'Adualt count should equal room count , we provide free service for children in double rooms' : null)),

      globalErr: ((e.target.value === '') ? "All Fields Are Required" : null)
    })
  }

  else if (e.target.name === "Child") {
    setValues({
      ...values,
      Child: Number(e.target.value)
    })
    setErr({
      ...err,
      globalErr: ((e.target.value === '') ? "This Field is Required" : null)
    })
  }

  else if (e.target.name === "Single") {
    setValues({
      ...values,
      Single: Number(e.target.value),

    })
    setErr({
      ...err,
      globalErr: ((e.target.value === '') ? "This Field is Required" : null)
    })
  }

  else if (e.target.name === "Double") {
    setValues({
      ...values,
      Double: Number(e.target.value),

    })
    setErr({
      ...err,
      globalErr: ((e.target.value === '') ? "This Field is Required" : null)
    })
  }

  else if (e.target.name === "startDate") {
    setValues({
      ...values,
      startDate: e.target.value,

    })
    setErr({
      ...err,
      startDateErr: (isInTheFuture(e.target.value) === false) ? "This is not a valid date" : null,
      globalErr: (e.target.value === '') ? "This Field is Required" : null
    })
  }

  else if (e.target.name === "endDate") {
    setValues({
      ...values,
      endDate: e.target.value,

    })
    setErr({
      ...err,
      endDateErr: (isAfterStartDate(values.startDate, e.target.value) === false) ? "This is not a valid date end date should be after start date" : null,
      globalErr: (e.target.value === '') ? "This Field is Required" : null
    })
  }

  else if (e.target.name === "Period") {
    setValues({
      ...values,
      Period: Number(e.target.value)
    })
    setErr({
      ...err,
      PeriodErr: (Number(e.target.value) !== (checkPeriod(values.startDate, values.endDate))) ? "invalid number or invalid date" : console.log("e" + e.target.value),
      globalErr: (e.target.value === '') ? "This Field is Required" : null
    })
  }

  else if (e.target.name === "Transport") {
    setValues({
      ...values,
      Transport: e.target.value
    })
    setErr({
      ...err,
      globalErr: (e.target.value === '') ? "This Field is Required" : null
    })
  }

}