module.exports = (temp, data) => {
	let output = temp.replace(/{%PROJECT_NAME%}/g, data.projectName);
	output = output.replace(/{%LINK%}/g, data.link);
	output = output.replace(/{%DES%}/g, data.des);
	return output;
};
