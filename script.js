const dob = document.querySelector("#dob");
const message = document.querySelector("#message");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  message.style.display = "none";
  if (!dob.value) {
    message.style.display = "block";
    message.textContent = "Enter your birthday date first.";
  } else {
    const dateObj = convertDateToStringObj(dob.value);
    const palindromFound = isPalindromeDateFormatPresent(dateObj);

    message.style.display = "block";

    if (palindromFound) {
      message.textContent = "Your birthday date is palindrome.";
    } else {
      const nextPalindromeDate = getNextPalindromeDate(dateObj);
      message.textContent =
        "The next palindrome date is on " +
        nextPalindromeDate.nextDate +
        ", which is in " +
        nextPalindromeDate.gap +
        " days.";
    }
  }
});

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseString(str);
}

function convertDateToStringObj(date) {
  const arr = date.split("-");

  //   const day = Number(arr[2]) < 10 ? String("0" + arr[2]) : String(arr[2]);
  //   const month = Number(arr[1]) < 10 ? String("0" + arr[1]) : String(arr[1]);
  //   const year = String(arr[0]);

  return {
    day: arr[2],
    month: arr[1],
    year: arr[0],
  };
}

function generateDateVariations(dobObj) {
  var ddmmyyyy = dobObj.day + dobObj.month + dobObj.year;
  var mmddyyyy = dobObj.month + dobObj.day + dobObj.year;
  var yyyymmdd = dobObj.year + dobObj.month + dobObj.day;
  var ddmmyy = dobObj.day + dobObj.month + dobObj.year.slice(-2);
  var mmddyy = dobObj.month + dobObj.day + dobObj.year.slice(-2);
  var yyddmm = dobObj.year.slice(-2) + dobObj.day + dobObj.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function isPalindromeDateFormatPresent(dobData) {
  var palindromList = generateDateVariations(dobData);

  var found = false;

  for (var i = 0; i < palindromList.length; i++) {
    if (isPalindrome(palindromList[i])) {
      found = true;
      break;
    }
  }

  return found;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function getNextDate(dateObj) {
  var day =
    Number(dateObj.day) + 1 < 10
      ? "0" + (Number(dateObj.day) + 1)
      : String(Number(dateObj.day) + 1);

  var month = dateObj.month;
  var year = dateObj.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (Number(day) > 29) {
        day = "01";
        month = "03";
      }
    } else {
      if (day > 28) {
        day = "01";
        month = "03";
      }
    }
  } else {
    if (Number(day) > daysInMonth[Number(month - 1)]) {
      day = "01";
      month = String(Number(month) + 1);
    }
  }

  if (Number(month) > 12) {
    month = "01";
    year = String(Number(year) + 1);
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(dateObj) {
  var nextDateObj = getNextDate(dateObj);
  var daysApart = 1;

  while (!isPalindromeDateFormatPresent(nextDateObj)) {
    nextDateObj = getNextDate(nextDateObj);
    daysApart++;
  }

  return {
    nextDate:
      nextDateObj.day + "-" + nextDateObj.month + "-" + nextDateObj.year,
    gap: daysApart,
  };
}
