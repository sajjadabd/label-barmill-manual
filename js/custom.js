let form = document.getElementById("form");
let tableContainer = document.getElementById("tableBody");
let formIsHidden = false;


let numberOfRowsEachPage = 16;
let table = [];
let tableData = [];



form.addEventListener('submit' , (e) => {
	e.preventDefault();
	
	let data = []
	
	for(let i=0;i<form.elements.length;i++) {
		if( !isNaN(form.elements[i].value) && form.elements[i].value.trim() != '' ) {
			console.log('----' , form.elements[i].value);
			data.push(form.elements[i].value);
		}
	}
	
	tableData.push(data);
	
	if( table.length % 16 == 0 ) {
		
	}
	
	updateTable();
	//data = data.join('-')
	//console.log(data);
});


document.addEventListener('keyup' , (e) => {
	if ( e.key == 'Escape' ) {
		if ( formIsHidden == false ) {
			form.style.display = 'none';
		} else {
			form.style.display = 'flex';
		}
		formIsHidden = !formIsHidden;		
	}
}); 



let updateTable = () => {
	let tableContent = ``;
	let open = false;
	let start ;
	let end ;
	for(let i=0;i<tableData.length;i++) {
		
		if( open == false) {
			tableContent += `<div class="col">`;
			open = !open;
			start = i;
		}
		
		if(typeof tableData[i] == 'string') {
			
		} else {
			tableData[i] = tableData[i].join('-')
		}
		
		
		tableContent += `<div class="cell">${tableData[i]}</div>`;
		
		
		if( open == true && (start+10) == i  ) {
			tableContent += `</div>`;
			open = !open;
		}
		
		
	}
	
	
	
	tableContainer.innerHTML = tableContent;
}


