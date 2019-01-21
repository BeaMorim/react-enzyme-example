export const replaceAll = (string, replaceVal, newVal) => {
	var index = string.indexOf(replaceVal);
	while (index > -1){
		string = string.replace(replaceVal, newVal);
		index = string.indexOf(replaceVal);
	}
	return string;
};

export const cpfValidator = (cpf) => {
	let sum;
	let remainder;
	let strCPF;
	let notAcceptedCpf = [ 
		'11111111111', 
		'22222222222', 
		'33333333333', 
		'44444444444', 
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999'
	];

	if(cpf) {
		strCPF = cpf.replace(/[^\d]+/g,'');	
	}
	else {
		return false;
	}

	if(strCPF === '' || strCPF.length < 11 || notAcceptedCpf.includes(strCPF)) {
		return false;
	}
	
	sum = 0; 
	for (let i = 0; i < 9; i++) {
		sum += parseInt(strCPF.charAt(i)) * (10 - i);
	}

	remainder = sum * 10 % 11;
   
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}
	if (remainder !== parseInt(strCPF.charAt(9)) ) {
		return false;
	}
   
	sum = 0;
	for (let j = 0; j < 10; j++) {
		sum += parseInt(strCPF.charAt(j)) * (11 - j);
	}

	remainder = sum * 10 % 11;
   
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	} 
	if (remainder !== parseInt(strCPF.charAt(10)) ) {
		return false;
	}

	return true;
};
