let table = document.getElementById("tableBody");

let start = 0;
let end = 3;

// get input from alert

//let month = prompt("Enter current month");
//let day = prompt("Enter current day");
//let howManyPage = prompt("How many page do you want to print?");

let month = 1;
let day = 23;
let howManyPage = 5;
let hmp = howManyPage;


// end = 21;
// end = 21*2;
// end = 21*3;


let total = []

let eachDeep = []

let eachColumn = [];

let numberOfRowsEachPage = 16;
let norep = numberOfRowsEachPage;

//let numberOfColumnsEachPage = prompt("How many columns do you want to see?");

let colsInput = document.getElementById("colsInput");

let numberOfColumnsEachPage = 4;
let nocep = numberOfColumnsEachPage;




let dayInput = document.getElementById("dayInput");
let monthInput = document.getElementById("monthInput");
let pagesInput = document.getElementById("pagesInput");
let year = document.getElementById("year");
let numberTo = document.getElementById("numberTo");
let numberFromInput = document.getElementById('numberFrom');
let numberFrom = 1; // default starting number is 1


let changeNumberTo = () => {
	numberTo.innerText = ( howManyPage * (numberOfRowsEachPage*numberOfColumnsEachPage) ) + numberFrom - 1 ;
}

let changePages = () => {
	
	hmp = parseInt(pagesInput.value);
	numberFrom = parseInt(numberFromInput.value)
	
	if( hmp >= 15 ) {
		pagesInput.value = 15;
		hmp = 15;
	} else if( hmp <= 1 ) {
		pagesInput.value = 1;
		hmp = 1;
	}
	
	if( numberFrom <= 1 ) {
		numberFromInput.value = 1;
		numberFrom = 1
	}
	
	console.log(hmp);
	howManyPage = hmp;
	changeNumberTo();
	
}








colsInput.addEventListener('change' , (e) => {
	changeColumn(e.target.value);
	changeColShow()
});

colsInput.addEventListener('keyup' , (e) => {
	changeColumn(e.target.value);
	changeColShow()
});


let changeColumn = (value) => {
	numberOfColumnsEachPage = Number(value);
    nocep = numberOfColumnsEachPage;
}

let pageForCol = document.getElementById("pageForCol");
let pageForColContent = ``;

let changeColShow = () => {
	pageForColContent = ``;
	
	if( numberOfColumnsEachPage > 5 ) {
		colsInput.value = 5;
		//changeColShow()
		changeColumn(5)
	} else if ( numberOfColumnsEachPage < 2 ) {
		colsInput.value = 2;
		//changeColShow()
		changeColumn(2)
	}
	
	for(let i=0;i<5;i++) {
		pageForColContent += `<div class="rowForCol">`
		for(let j=0;j<numberOfColumnsEachPage;j++) {
			pageForColContent += `
				<span></span>
			`
		}
		pageForColContent += `</div>`
	}
	

	pageForCol.innerHTML = pageForColContent ;
	changePages();
}

changeColShow();





let pageForNumbers = document.getElementById("pageForNumbers");
let pageForNumbersContent = ``;

let changeNumbersShow = () => {
	
	pageForNumbersContent = ``;
	
	for(let i=0;i<howManyPage;i++) {
		pageForNumbersContent += `<span class="eachpage" style="left:${i*5}px"></span>`;
	}
	
	pageForNumbers.innerHTML = pageForNumbersContent;
}

changeNumbersShow()


numberFromInput.addEventListener('change' , (e) => {
	changePages();
});


numberFromInput.addEventListener('keyup' , (e) => {
	changePages();
});



pagesInput.addEventListener('change' , (e) => {
	changePages();
	changeNumbersShow();
});


pagesInput.addEventListener('keyup' , (e) => {
	changePages();
	changeNumbersShow();
});







let dateObj = new Date();
let m = dateObj.getUTCMonth() + 1; //months from 1-12
let d = dateObj.getUTCDate();
let y = dateObj.getUTCFullYear();

newdate = y + "/" + m + "/" + d;



let persianYear = [
{ index : 1 , text : 'فروردین' } , 
{ index : 2 , text : 'اردیبهشت' } , 
{ index : 3 , text : 'خرداد' } , 
{ index : 4 , text : 'تیر' } , 
{ index : 5 , text : 'مرداد' } , 
{ index : 6 , text : 'شهریور' } , 
{ index : 7 , text : 'مهر' } , 
{ index : 8 , text : 'آبان' } , 
{ index : 9 , text : 'آذر' } , 
{ index : 10 , text : 'دی' } , 
{ index : 11 , text : 'بهمن' } , 
{ index : 12 , text : 'اسفند' } , 
]



let today = document.getElementById("today");
//console.log(today);
//today.innerHTML = newdate;

let dateContent = 'تاریخ امروز : '

let date = moment(newdate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

dateContent += date;

console.log(date);

let splitedDate = date.split('/');
//console.log(parseInt(splitedDate[1]));
dayInput.value = parseInt(splitedDate[2]);
monthInput.value = parseInt(splitedDate[1]);


today.innerText = dateContent;
year.innerText = parseInt(splitedDate[0]);



let form = document.getElementById('form');



changeNumberTo();


form.addEventListener('submit' , (e) => {
	
	document.body.style.backgroundColor = 'white';
	
	e.preventDefault();
	
	day = dayInput.value;
	month = monthInput.value;
	howManyPage = pagesInput.value;
	hmp = howManyPage;
	
	numberFrom = parseInt(numberFromInput.value);
	
	if( nocep > 4 ) {
		document.body.style.margin = '0 20px 0 0';
		document.body.style.backgroundColor = 'white';
	}
	
	//console.log(numberFrom);
	
	console.log({
		day ,
		month ,
		howManyPage
	});
	
	calculateMatrix();
	printMatrix();
});




let calculateMatrix = () => {
	for(let j=0;j<nocep;j++) {
	  for(let i=0;i<norep;i++) {
		for(let k=0;k<=hmp;k++){
		  eachDeep.push( numberFrom + k + (i) * hmp + (j * norep * hmp) );
		}
		eachColumn.push(eachDeep);
		eachDeep = [];
	  }
	  total.push(eachColumn);
	  eachColumn = [];
	}
}



// for(let j=0;j<howManyPage;j++){
//   for(let i=0;i<norep;i++) {
//     if(j==0) {
//       eachPage.push([
//         ( (norep * i)+i ) * howManyPage + j + 1 , 
//         norep*1+i  ,
//         norep*2+i  
//       ]);
//     } else {
//       eachPage.push([
//         i + total[j-1][norep-1][2] , // add with the last elemtn of last total index
//         norep*1+i + total[j-1][norep-1][2]  ,
//         norep*2+i + total[j-1][norep-1][2] 
//       ]);
//     }
//   }
//   total.push(eachPage);
//   eachPage = [];
// }


console.log(total);


let printMatrix = () => {
	
	document.getElementById('formContainer').innerHTML = '';
	
	let content = `` ;
	//console.log(`start processing at ${start}`);


	for(let deep=0;deep<howManyPage;deep++){
	  for(let row=0;row<norep;row++) {
		content += `<tr>`;
		for(let column=0;column<nocep;column++) {
			if( deep == howManyPage-1 && row == norep-1 ) { // you are in last column
				if ( howManyPage > 5 && nocep > 4 ) {
					content += `<td class="lastRow fifthColSmall">${month}-${day}-${total[column][row][deep]}</td>`;
				} else {
					content += `<td class="lastRow normalCol">${month}-${day}-${total[column][row][deep]}</td>`;
				}
			} else {
				if ( howManyPage > 5 && nocep > 4 ) {
					content += `<td class="fifthColSmall">${month}-${day}-${total[column][row][deep]}</td>`;
				} else {
					content += `<td class="normalCol">${month}-${day}-${total[column][row][deep]}</td>`;
				}
			}
		  
		  //content += `<td>${month}-&nbsp&nbsp&nbsp-${total[column][row][deep]}</td>`;
		}
		content += `</tr>`;
	  }
	}

	table.innerHTML = content;
}


// total.forEach(element => {
//   element.forEach(e => {
//     content += `<tr>`;
//     e.forEach( value => {
//       //console.log(value);
//       content += `<td>${month}-${day}-${value}</td>`;
//     });
//     content += `</tr>`;
//   });
// });

// for(let i = start; i <= end; i++){
//   content += `
//   <tr>
//     <td></td>
//     <td></td>
//     <td></td>
//   </tr>
//   `;
// }

// content += `
// <div class="column">
//   <div class="cell">${month}-${day}-${i}</div>
//   <div class="cell">${month}-${day}-${i+1}</div>
//   <div class="cell">${month}-${day}-${i+2}</div>
// </div>
// `;

//console.log(`end processing at ${end}`);

